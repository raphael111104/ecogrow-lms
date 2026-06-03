import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAssistantReply,
  getAssistantFallbackReply,
  hasIncompleteFinishReason,
} from "./ecogrow-assistant.ts";

test("buildAssistantReply joins Gemini text parts and reports a complete response", () => {
  const result = buildAssistantReply({
    candidates: [
      {
        finishReason: "STOP",
        content: {
          parts: [{ text: "Paragraf satu." }, { text: "Paragraf dua." }],
        },
      },
    ],
  });

  assert.deepEqual(result, {
    reply: "Paragraf satu.\nParagraf dua.",
    finishReason: "STOP",
    isIncomplete: false,
  });
});

test("buildAssistantReply marks MAX_TOKENS responses as incomplete", () => {
  const result = buildAssistantReply({
    candidates: [
      {
        finishReason: "MAX_TOKENS",
        content: {
          parts: [{ text: "Jawaban yang berhenti di tengah kalimat" }],
        },
      },
    ],
  });

  assert.equal(result.reply, "Jawaban yang berhenti di tengah kalimat");
  assert.equal(result.finishReason, "MAX_TOKENS");
  assert.equal(result.isIncomplete, true);
});

test("hasIncompleteFinishReason catches token and length based stops", () => {
  assert.equal(hasIncompleteFinishReason("MAX_TOKENS"), true);
  assert.equal(hasIncompleteFinishReason("STOP"), false);
  assert.equal(hasIncompleteFinishReason(undefined), false);
});

test("getAssistantFallbackReply answers EcoGrow topics locally", () => {
  const reply = getAssistantFallbackReply([
    { role: "user", content: "Apa itu EcoMission dan jurnal siswa?" },
  ]);

  assert.match(reply, /EcoMission/);
  assert.match(reply, /feedback dari guru/);
});

test("getAssistantFallbackReply keeps unrelated topics out of scope", () => {
  const reply = getAssistantFallbackReply([
    { role: "user", content: "Berapa harga tiket konser hari ini?" },
  ]);

  assert.match(reply, /hanya bisa membantu seputar EcoGrow Learning/);
});
