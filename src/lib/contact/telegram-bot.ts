import "server-only";

/**
 * Minimal Telegram Bot API client used to forward web inquiries to Aljona's
 * chat. Setup for the client: docs/TELEGRAM-SETUP.md.
 *
 * Env: TELEGRAM_BOT_TOKEN (from @BotFather), TELEGRAM_CHAT_ID (Aljona's chat).
 */

export type InlineButton = { text: string; url: string };

export type SendOptions = {
  /** Rows of URL buttons shown under the message. */
  buttons?: InlineButton[][];
  /** Override the target chat (defaults to TELEGRAM_CHAT_ID). */
  chatId?: string;
  /** Request timeout in ms (default 8000). */
  timeoutMs?: number;
};

export type SendResult = { ok: true; messageId: number } | { ok: false; error: string; status?: number };

export function telegramBotConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

/** Escape user-supplied text for Telegram `parse_mode: "HTML"`. */
export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Sends an HTML-formatted message. Never throws; returns a result object. */
export async function sendTelegramMessage(text: string, opts: SendOptions = {}): Promise<SendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = opts.chatId ?? process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, error: "telegram-bot-not-configured" };

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text: text.length > 4096 ? `${text.slice(0, 4080)}\n…` : text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  };
  if (opts.buttons?.length) body.reply_markup = { inline_keyboard: opts.buttons };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 8000);
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as
      | { ok: true; result: { message_id: number } }
      | { ok: false; description?: string }
      | null;
    if (!res.ok || !data?.ok) {
      const description = data && !data.ok ? data.description : undefined;
      return { ok: false, status: res.status, error: description ?? `HTTP ${res.status}` };
    }
    return { ok: true, messageId: data.result.message_id };
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return { ok: false, error: aborted ? "timeout" : err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
