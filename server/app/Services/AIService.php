<?php

namespace App\Services;

use App\Models\Medicine;

class AIService
{
    public function reply(string $message): array
    {
        $message = strtolower($message);

        if (
            str_contains($message, "fever") ||
            str_contains($message, "headache")
        ) {

            $medicines = Medicine::where(
                "symptoms",
                "ILIKE",
                "%fever%"
            )->orWhere(
                "name",
                "ILIKE",
                "%Paracetamol%"
            )->get();

            return [

                "success" => true,

                "answer" =>

                "You may have a fever. Stay hydrated and consult a doctor if symptoms continue.",

                "medicines" => $medicines

            ];
        }

        return [

            "success" => true,

            "answer" =>

            "Sorry, I couldn't understand your symptoms.",

            "medicines" => []

        ];
    }
}