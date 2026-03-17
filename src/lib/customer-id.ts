/**
 * Generates a unique guest customer ID prefixed with `tg_` for Telegram users.
 */
export function generateCustomerId(): string {
  const random = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now().toString(36);
  return `tg_${random}${timestamp}`;
}
