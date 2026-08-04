<?php

namespace App\Services;

use App\Models\Medicine;
use App\Models\Pharmacy;
use Illuminate\Support\Facades\Http;
use Exception;

class AIService
{
    public function reply(array $messages): array
    {
        /*
        |--------------------------------------------------------------------------
        | Last User Message
        |--------------------------------------------------------------------------
        */

        $lastUserMessage = "";

        foreach (array_reverse($messages) as $message) {

            if (($message["role"] ?? "") === "user") {

                $lastUserMessage = strtolower(trim($message["content"]));
                break;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Search Keywords
        |--------------------------------------------------------------------------
        */

        $keywords = preg_split('/\s+/', $lastUserMessage);

        /*
        |--------------------------------------------------------------------------
        | Find Relevant Medicines
        |--------------------------------------------------------------------------
        */

        $medicineList = Medicine::query()

            ->where(function ($query) use ($keywords) {

                foreach ($keywords as $word) {

                    if (strlen($word) < 3) {
                        continue;
                    }

                    $query->orWhere("name", "ILIKE", "%{$word}%")
                        ->orWhere("generic_name", "ILIKE", "%{$word}%")
                        ->orWhere("indications", "ILIKE", "%{$word}%")
                        ->orWhere("symptoms", "ILIKE", "%{$word}%");
                }
            })

            ->select(
                "name",
                "generic_name",
                "strength",
                "indications",
                "symptoms"
            )

            ->limit(5)

            ->get();

        /*
        |--------------------------------------------------------------------------
        | Fallback Medicines
        |--------------------------------------------------------------------------
        */

        if ($medicineList->isEmpty()) {

            $medicineList = Medicine::select(
                "name",
                "generic_name",
                "strength",
                "indications",
                "symptoms"
            )
            ->limit(5)
            ->get();
        }

        /*
        |--------------------------------------------------------------------------
        | Build Medicine Context
        |--------------------------------------------------------------------------
        */

        $medicineContext = "";

        foreach ($medicineList as $medicine) {

            $medicineContext .=
                "- {$medicine->name} ({$medicine->generic_name})\n" .
                "Symptoms: {$medicine->symptoms}\n" .
                "Used For: {$medicine->indications}\n" .
                "Strength: {$medicine->strength}\n\n";
        }

        /*
        |--------------------------------------------------------------------------
        | Conversation Memory
        |--------------------------------------------------------------------------
        */

        $conversation = "";

        $recentMessages = array_slice($messages, -6);

        foreach ($recentMessages as $message) {

            if (($message["role"] ?? "") === "system") {
                continue;
            }

            $role = $message["role"] === "assistant"
                ? "Assistant"
                : "User";

            $conversation .= "{$role}: {$message["content"]}\n";
        }

        $conversation = trim($conversation);
        /*
|--------------------------------------------------------------------------
| AI Prompt
|--------------------------------------------------------------------------
*/

$prompt = <<<PROMPT
You are AI Medicine Finder Assistant.

You are a helpful healthcare assistant.

You are NOT a doctor.

Conversation:

$conversation

Available Medicines:

$medicineContext

Current User Question:

$lastUserMessage

Instructions:

- Remember the conversation.
- If the user asks follow-up questions like:
  - "What should I do?"
  - "Can I take medicine?"
  - "Will I recover?"
  answer using the previous conversation.

- Recommend ONLY medicines listed above.
- Never invent medicine names.
- Explain:
  1. Possible condition
  2. Recommended medicines
  3. Self-care advice
  4. When to visit a doctor

- Keep the answer under 150 words.
- Use Markdown.
- Use headings.
- Use bullet points.

End with:

⚠️ This information is not a substitute for professional medical advice.
PROMPT;

/*
|--------------------------------------------------------------------------
| Ask Ollama
|--------------------------------------------------------------------------
*/

$response = Http::timeout(60)
    ->post("http://127.0.0.1:11434/api/generate", [

        "model" => "llama3.2:3b",

        "prompt" => $prompt,

        "stream" => false,

        "options" => [

            // Fast response
            "temperature" => 0.2,

            // Smaller context window
            "num_ctx" => 2048,

            // Short answers
            "num_predict" => 80,

            "top_p" => 0.8,

            "repeat_penalty" => 1.1,

            // Use all CPU cores
            "num_thread" => 5
        ]
    ]);

if (!$response->successful()) {

    throw new Exception("Unable to connect to Ollama.");
}

$answer = trim(
    $response->json("response")
    ?? "Sorry, I couldn't generate a response."
);
        /*
        |--------------------------------------------------------------------------
        | Find Matching Medicines (Frontend Cards)
        |--------------------------------------------------------------------------
        */

        $medicines = Medicine::query()
            ->where(function ($query) use ($keywords) {

                foreach ($keywords as $word) {

                    if (strlen($word) < 3) {
                        continue;
                    }

                    $query->orWhere("name", "ILIKE", "%{$word}%")
                        ->orWhere("generic_name", "ILIKE", "%{$word}%")
                        ->orWhere("description", "ILIKE", "%{$word}%")
                        ->orWhere("indications", "ILIKE", "%{$word}%")
                        ->orWhere("symptoms", "ILIKE", "%{$word}%");
                }
            })
            ->limit(6)
            ->get();

        /*
        |--------------------------------------------------------------------------
        | Fallback Medicines
        |--------------------------------------------------------------------------
        */

        if ($medicines->isEmpty()) {

            $medicines = Medicine::select(
                "id",
                "name",
                "generic_name",
                "strength",
                "form",
                "price",
                "stock"
            )
            ->limit(6)
            ->get();
        }

        /*
        |--------------------------------------------------------------------------
        | Nearby Pharmacies
        |--------------------------------------------------------------------------
        */

        $pharmacies = Pharmacy::query()
            ->where("status", "approved")
            ->select(
                "id",
                "name",
                "address",
                "phone",
                "status"
            )
            ->limit(6)
            ->get();

        /*
        |--------------------------------------------------------------------------
        | Return Response
        |--------------------------------------------------------------------------
        */

        return [
            "answer" => $answer,
            "medicines" => $medicines,
            "pharmacies" => $pharmacies,
        ];
    }
}