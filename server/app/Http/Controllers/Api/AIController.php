<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AIService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;

class AIController extends Controller
{
    protected AIService $aiService;

    public function __construct(AIService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            "messages" => "required|array|min:1|max:40",
            "messages.*.role" => [
                "required",
                "string",
                Rule::in(["user", "assistant", "system"]),
            ],
            "messages.*.content" => "required|string|max:4000",
        ]);

        try {

            $reply = $this->aiService->reply($validated["messages"]);

            return response()->json([
                "success" => true,
                "data" => $reply,
            ]);

        } catch (Throwable $e) {

            Log::error($e);

            return response()->json([
                "success" => false,
                "error" => $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine(),
                "trace" => app()->environment("local")
                    ? explode("\n", $e->getTraceAsString())
                    : [],
            ], 500);
        }
    }
}