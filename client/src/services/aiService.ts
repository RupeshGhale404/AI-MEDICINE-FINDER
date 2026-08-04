import api from "./api";

import type {
  AIMessage,
  AIResponse,
} from "../types/AI";

export interface AIRequestOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

type AskAIInput =
  | AIRequestOptions
  | AbortSignal
  | undefined;

export class AIRequestError extends Error {
  public readonly status?: number;
  public readonly code?: string;

  constructor(
    message: string,
    status?: number,
    code?: string
  ) {
    super(message);

    this.name = "AIRequestError";
    this.status = status;
    this.code = code;
  }
}

const DEFAULT_TIMEOUT_MS = 180000;

const resolveOptions = (
  input?: AskAIInput
): AIRequestOptions => {
  if (!input) return {};

  if (
    typeof input === "object" &&
    input !== null &&
    "signal" in input
  ) {
    return input as AIRequestOptions;
  }

  return {
    signal: input as AbortSignal,
  };
};

export const askAI = async (
  messages: AIMessage[],
  input?: AskAIInput
): Promise<AIResponse> => {
  const options = resolveOptions(input);

  try {
    const response = await api.post(
      "/ai/chat",
      {
        messages,
      },
      {
        signal: options.signal,
        timeout:
          options.timeoutMs ??
          DEFAULT_TIMEOUT_MS,
      }
    );

    const payload = response.data?.data;

    if (!payload) {
      throw new Error("Invalid AI response.");
    }

    return {
      answer: payload.answer ?? "",
      medicines: payload.medicines ?? [],
      pharmacies: payload.pharmacies ?? [],
    };
  } catch (error: any) {
    console.error(
      "AI ERROR:",
      error.response?.data ?? error
    );

    throw new AIRequestError(
      error.response?.data?.message ??
        error.message ??
        "Unable to contact AI server.",
      error.response?.status,
      error.response?.data?.code
    );
  }
};