export type BotStep =
  | "awaiting_name"
  | "awaiting_passengers"
  | "awaiting_date"
  | "awaiting_route"
  | "awaiting_confirm"
  | "done";

export type QuoteDraft = {
  name?: string;
  passengers?: number;
  date?: string;
  origin?: string;
  destination?: string;
  roundTrip?: boolean;
};

export type ConversationState = {
  phone: string;
  step: BotStep;
  draft: QuoteDraft;
  updatedAt: number;
};

export type IncomingWhatsAppMessage = {
  from: string;
  text: string;
  messageId?: string;
};
