import { useBatteryStatus } from "@nikadev/use-battery-status";
import { useEffect } from "react";

export function FaviconBattery() {
  const { level, charging } = useBatteryStatus();

  useEffect(() => {
    const favicon = (document.querySelector("link[rel='icon']") as HTMLLinkElement) || document.createElement("link");
    favicon.rel = "icon";

    const emoji =
      charging ? "⚡️" :
      level > 0.8 ? "🔋" :
      level > 0.1 ? "🪫" :
      "❌";

    favicon.href = "data:image/svg+xml," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text y="0.9em" font-size="90">${emoji}</text>
      </svg>
    `);

    document.head.appendChild(favicon);
  }, [level, charging]);

  return null;
}