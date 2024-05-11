// Detects the browser and returns a string indicating the browser type
export function detectBrowser(): string {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent;

    // Edge Chromium detection
    if (userAgent.includes("Edg/")) {
      return "edge-chromium";
    }
    // Chrome detection (which should exclude Edge Chromium)
    else if (userAgent.includes("Chrome") && !userAgent.includes("Edg/")) {
      return "chrome";
    }
    // Safari detection (which should exclude Chrome and Edge Chromium)
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Edg/")) {
      return "safari";
    }
  }
  return ""; // Return '' if browser is not detected or if running in a non-browser environment
}
