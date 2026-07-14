/**
 * Copy text to clipboard with fallback for older browsers.
 * First tries navigator.clipboard API; if that fails, uses textarea + execCommand fallback.
 * @param text - The text to copy
 * @returns Promise that resolves to true if copy succeeded, false otherwise
 */
export async function copyTextWithFallback(text: string): Promise<boolean> {
  // Try modern clipboard API first
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback: use textarea + execCommand for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    try {
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
}
