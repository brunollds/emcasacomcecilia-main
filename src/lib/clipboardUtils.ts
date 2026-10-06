/**
 * Copy text to clipboard with fallback for older browsers.
 * First tries navigator.clipboard API; if that fails, uses textarea + execCommand fallback.
 * @param text - The text to copy
 * @param trigger - The element that asked for the copy, so the fallback also works inside a modal dialog
 * @returns Promise that resolves to true if copy succeeded, false otherwise
 */
export async function copyTextWithFallback(text: string, trigger?: Element): Promise<boolean> {
  // Try modern clipboard API first
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback: use textarea + execCommand for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    // Read-only so focusing it doesn't open the on-screen keyboard
    textarea.readOnly = true;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';

    // An open modal dialog makes the rest of the page inert, and an inert textarea can't be
    // selected, so it goes into the trigger's dialog instead of the body.
    const container = trigger?.closest('dialog[open]') ?? document.body;
    // Selecting moves focus to the textarea, so it goes back where it was afterwards.
    const previousFocus = document.activeElement;
    container.appendChild(textarea);

    try {
      textarea.select();
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      textarea.remove();
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    }
  }
}
