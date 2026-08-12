import type { ConversationState } from "./types";

const store = new Map<string, ConversationState>();
const TTL_MS = 1000 * 60 * 60 * 12;

function purgeExpired(now = Date.now()) {
  for (const [phone, state] of store.entries()) {
    if (now - state.updatedAt > TTL_MS) {
      store.delete(phone);
    }
  }
}

export function getConversation(phone: string): ConversationState | undefined {
  purgeExpired();
  return store.get(phone);
}

export function saveConversation(state: ConversationState): void {
  purgeExpired();
  store.set(state.phone, { ...state, updatedAt: Date.now() });
}

export function resetConversation(phone: string): ConversationState {
  const state: ConversationState = {
    phone,
    step: "awaiting_name",
    draft: {},
    updatedAt: Date.now(),
  };
  store.set(phone, state);
  return state;
}

export function clearConversation(phone: string): void {
  store.delete(phone);
}
