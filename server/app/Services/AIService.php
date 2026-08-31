<?php

namespace App\Services;

use App\Models\Medicine;
use App\Models\Pharmacy;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class AIService
{
    /**
     * Generate an AI reply based on conversation messages.
     *
     * @param array<int, array{role:string, content:string}> $messages
     * @param float|null $userLat
     * @param float|null $userLng
     * @return array{
     *     answer:string,
     *     medicines:Collection,
     *     pharmacies:Collection
     * }
     *
     * @throws Exception
     */
    public function reply(
        array $messages,
        ?float $userLat = null,
        ?float $userLng = null
    ): array {
        $lastUserMessage = $this->extractLastUserMessage($messages);

        $keywords = $this->extractKeywords($lastUserMessage);

        /*
        |--------------------------------------------------------------------------
        | Search medicines
        |--------------------------------------------------------------------------
        */

        $contextMedicines = $this->searchMedicines(
            $keywords,
            5,
            [
                'name',
                'generic_name',
                'strength',
                'indications',
                'symptoms',
            ]
        );

        $medicineContext = $this->buildMedicineContext(
            $contextMedicines
        );

        /*
        |--------------------------------------------------------------------------
        | Conversation history
        |--------------------------------------------------------------------------
        */

        $conversation = $this->buildConversationHistory(
            $messages
        );

        /*
        |--------------------------------------------------------------------------
        | Build AI prompt
        |--------------------------------------------------------------------------
        */

        $prompt = $this->buildPrompt(
            $conversation,
            $medicineContext,
            $lastUserMessage
        );

        /*
        |--------------------------------------------------------------------------
        | Ask Ollama
        |--------------------------------------------------------------------------
        */

        $answer = $this->askOllama($prompt);

        /*
        |--------------------------------------------------------------------------
        | Full medicine records for frontend
        |--------------------------------------------------------------------------
        */

        $medicines = $this->searchMedicines(
            $keywords,
            6
        );

        /*
        |--------------------------------------------------------------------------
        | Nearby pharmacies
        |--------------------------------------------------------------------------
        */

        $pharmacies = $this->getNearbyPharmacies(
            $userLat,
            $userLng
        );

        return [
            'answer' => $answer,
            'medicines' => $medicines,
            'pharmacies' => $pharmacies,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Nearby Pharmacies
    |--------------------------------------------------------------------------
    */

    /**
     * Fetch approved pharmacies.
     *
     * If latitude and longitude are available,
     * pharmacies are sorted by distance.
     */
    private function getNearbyPharmacies(
        ?float $userLat,
        ?float $userLng,
        int $limit = 6
    ): Collection {
        $query = Pharmacy::query()
            ->where('status', 'approved')
            ->select([
                'id',
                'name',
                'address',
                'phone',
                'status',
                'latitude',
                'longitude',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Calculate distance using Haversine formula
        |--------------------------------------------------------------------------
        */

        if ($userLat !== null && $userLng !== null) {
            $haversine = '
                (
                    6371 * acos(
                        cos(radians(?))
                        * cos(radians(latitude))
                        * cos(radians(longitude) - radians(?))
                        + sin(radians(?))
                        * sin(radians(latitude))
                    )
                )
            ';

            $query
                ->selectRaw(
                    "{$haversine} AS distance",
                    [
                        $userLat,
                        $userLng,
                        $userLat,
                    ]
                )
                ->orderBy('distance');
        } else {
            /*
            |--------------------------------------------------------------------------
            | No user location
            |--------------------------------------------------------------------------
            */

            $query->latest();
        }

        return $query
            ->limit($limit)
            ->get()
            ->map(function ($pharmacy) {

                /*
                |--------------------------------------------------------------------------
                | Frontend open status
                |--------------------------------------------------------------------------
                */

                $pharmacy->open = true;

                /*
                |--------------------------------------------------------------------------
                | Format distance
                |--------------------------------------------------------------------------
                */

                if (
                    isset($pharmacy->distance)
                    && is_numeric($pharmacy->distance)
                ) {
                    $km = round(
                        (float) $pharmacy->distance,
                        1
                    );

                    $pharmacy->distance = $km < 1
                        ? round($km * 1000) . ' m'
                        : $km . ' km';
                } else {
                    $pharmacy->distance = 'Nearby';
                }

                return $pharmacy;
            });
    }

    /*
    |--------------------------------------------------------------------------
    | Extract Last User Message
    |--------------------------------------------------------------------------
    */

    private function extractLastUserMessage(
        array $messages
    ): string {
        foreach (array_reverse($messages) as $message) {

            if (
                ($message['role'] ?? '') === 'user'
            ) {
                return trim(
                    $message['content'] ?? ''
                );
            }
        }

        return '';
    }

    /*
    |--------------------------------------------------------------------------
    | Extract Keywords
    |--------------------------------------------------------------------------
    */

    /**
     * @return string[]
     */
    private function extractKeywords(
        string $message
    ): array {
        $words = preg_split(
            '/\s+/',
            strtolower($message),
            -1,
            PREG_SPLIT_NO_EMPTY
        ) ?: [];

        /*
        |--------------------------------------------------------------------------
        | Remove punctuation
        |--------------------------------------------------------------------------
        */

        $words = array_map(
            function (string $word): string {
                return trim(
                    $word,
                    " \t\n\r\0\x0B.,!?;:\"'()[]{}"
                );
            },
            $words
        );

        /*
        |--------------------------------------------------------------------------
        | Remove very short words
        |--------------------------------------------------------------------------
        */

        $words = array_filter(
            $words,
            function (string $word): bool {
                return mb_strlen($word) >= 3;
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Remove common words
        |--------------------------------------------------------------------------
        */

        $stopWords = [
            'the',
            'and',
            'for',
            'with',
            'have',
            'has',
            'had',
            'this',
            'that',
            'what',
            'when',
            'where',
            'which',
            'can',
            'could',
            'should',
            'would',
            'from',
            'about',
            'please',
            'tell',
            'give',
            'some',
            'medicine',
            'medicines',
        ];

        $words = array_filter(
            $words,
            function (string $word) use ($stopWords): bool {
                return !in_array(
                    $word,
                    $stopWords,
                    true
                );
            }
        );

        return array_values(
            array_unique($words)
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Search Medicines
    |--------------------------------------------------------------------------
    */

    private function searchMedicines(
        array $keywords,
        int $limit = 6,
        ?array $columns = null
    ): Collection {
        $query = Medicine::query();

        /*
        |--------------------------------------------------------------------------
        | Select columns
        |--------------------------------------------------------------------------
        */

        if ($columns !== null) {
            $query->select($columns);
        }

        /*
        |--------------------------------------------------------------------------
        | Search database
        |--------------------------------------------------------------------------
        */

        if (!empty($keywords)) {

            $query->where(function ($q) use ($keywords) {

                foreach ($keywords as $word) {

                    $q
                        ->orWhere(
                            'name',
                            'ILIKE',
                            "%{$word}%"
                        )
                        ->orWhere(
                            'generic_name',
                            'ILIKE',
                            "%{$word}%"
                        )
                        ->orWhere(
                            'description',
                            'ILIKE',
                            "%{$word}%"
                        )
                        ->orWhere(
                            'indications',
                            'ILIKE',
                            "%{$word}%"
                        )
                        ->orWhere(
                            'symptoms',
                            'ILIKE',
                            "%{$word}%"
                        );
                }
            });
        }

        $results = $query
            ->limit($limit)
            ->get();

        /*
        |--------------------------------------------------------------------------
        | Fallback
        |--------------------------------------------------------------------------
        */

        if ($results->isEmpty()) {

            $fallback = Medicine::query();

            if ($columns !== null) {
                $fallback->select($columns);
            }

            $results = $fallback
                ->limit($limit)
                ->get();
        }

        return $results;
    }

    /*
    |--------------------------------------------------------------------------
    | Build Medicine Context
    |--------------------------------------------------------------------------
        */

    private function buildMedicineContext(
        Collection $medicines
    ): string {
        if ($medicines->isEmpty()) {
            return 'No specific medicines were found in the database.';
        }

        $context = '';

        foreach ($medicines as $medicine) {

            $context .=
                "- Medicine: {$medicine->name}\n" .
                "- Generic name: {$medicine->generic_name}\n" .
                "- Symptoms: {$medicine->symptoms}\n" .
                "- Used for: {$medicine->indications}\n" .
                "- Strength: {$medicine->strength}\n\n";
        }

        return trim($context);
    }

    /*
    |--------------------------------------------------------------------------
    | Conversation History
    |--------------------------------------------------------------------------
    */

    private function buildConversationHistory(
        array $messages,
        int $limit = 8
    ): string {
        $recentMessages = array_slice(
            $messages,
            -$limit
        );

        $lines = [];

        foreach ($recentMessages as $message) {

            $role = $message['role'] ?? '';

            /*
            |--------------------------------------------------------------------------
            | Don't send system prompt again
            |--------------------------------------------------------------------------
            */

            if ($role === 'system') {
                continue;
            }

            $label = $role === 'assistant'
                ? 'Assistant'
                : 'User';

            $content = trim(
                $message['content'] ?? ''
            );

            if ($content !== '') {
                $lines[] =
                    "{$label}: {$content}";
            }
        }

        return implode(
            "\n",
            $lines
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Build Prompt
    |--------------------------------------------------------------------------
    */

    private function buildPrompt(
        string $conversation,
        string $medicineContext,
        string $userQuestion
    ): string {
        return <<<PROMPT
You are AI Medicine Finder Assistant.

You are a helpful healthcare information assistant.

You are NOT a doctor.
Never claim to diagnose a patient.
Never claim to prescribe medicine.

CONVERSATION HISTORY:

{$conversation}

MEDICINES AVAILABLE IN OUR DATABASE:

{$medicineContext}

CURRENT USER QUESTION:

{$userQuestion}

IMPORTANT RULES:

1. Remember the conversation history.
2. Use previous messages when answering follow-up questions.
3. Recommend medicines ONLY from the database list above.
4. Never invent a medicine that is not in the database.
5. If no suitable medicine exists in the database, say that clearly.
6. Do not invent dosage information.
7. Do not diagnose serious medical conditions.
8. Give general healthcare information.
9. Tell the user when professional medical attention is needed.
10. Keep the answer concise.
11. Use Markdown.
12. Use these sections when appropriate:

### Possible causes
### Medicines
### Self-care
### When to see a doctor

Keep the answer under 150 words.

End the response with:

⚠️ This information is not a substitute for professional medical advice.

PROMPT;
    }

    /*
    |--------------------------------------------------------------------------
    | Ollama
    |--------------------------------------------------------------------------
    */

    private function askOllama(
        string $prompt
    ): string {
        try {

            $response = Http::timeout(120)
                ->acceptJson()
                ->post(
                    'http://127.0.0.1:11434/api/generate',
                    [
                        'model' => 'llama3.2:3b',

                        'prompt' => $prompt,

                        'stream' => false,

                        'options' => [
                            'temperature' => 0.2,
                            'num_ctx' => 2048,
                            'num_predict' => 180,
                            'top_p' => 0.8,
                            'repeat_penalty' => 1.1,
                        ],
                    ]
                );

            /*
            |--------------------------------------------------------------------------
            | Check HTTP response
            |--------------------------------------------------------------------------
            */

            if (!$response->successful()) {

                throw new Exception(
                    'Ollama returned HTTP ' .
                    $response->status() .
                    ': ' .
                    $response->body()
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Get AI response
            |--------------------------------------------------------------------------
            */

            $answer = trim(
                $response->json('response') ?? ''
            );

            if ($answer === '') {

                throw new Exception(
                    'Ollama returned an empty response.'
                );
            }

            return $answer;

        } catch (\Throwable $e) {

            /*
            |--------------------------------------------------------------------------
            | Log detailed error
            |--------------------------------------------------------------------------
            */

            logger()->error(
                'Ollama connection failed',
                [
                    'message' => $e->getMessage(),
                ]
            );

            throw new Exception(
                'Unable to connect to Ollama: ' .
                $e->getMessage()
            );
        }
    }
}