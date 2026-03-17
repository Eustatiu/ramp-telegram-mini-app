import { useEffect } from 'react';
import { backButton } from '@telegram-apps/sdk-react';

const POST_FORM_STEPS = [
  '[data-step="checkout"]',
  '[data-step="processing"]',
  '[data-step="complete"]',
  '[data-step="error"]',
  '[data-step="confirm"]',
].join(', ');

/**
 * Synchronizes Telegram's native back button with the form's navigation state.
 * Shows the back button when the form advances past the initial step,
 * hides it when on the main form view.
 */
export function useTelegramNavigation(): void {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isPostFormStep = document.querySelector(POST_FORM_STEPS);
      if (isPostFormStep) {
        backButton.show();
      } else {
        backButton.hide();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const handleBack = () => window.history.back();
    backButton.onClick(handleBack);

    return () => {
      observer.disconnect();
      backButton.offClick(handleBack);
      backButton.hide();
    };
  }, []);
}
