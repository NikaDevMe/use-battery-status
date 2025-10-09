import { useEffect, useRef, useState } from "react";

interface BatteryStatus {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

// Shared singleton instance
let batteryManager: BatteryManager | null = null;

async function getBatteryManager() {
  if (!navigator.getBattery) {
    console.warn("Battery Status API is not supported on this browser.");
    return null;
  }

  if (!batteryManager) {
    batteryManager = await navigator.getBattery();
  }

  return batteryManager;
}

export function useBatteryStatus() {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    charging: false,
    level: 0,
    chargingTime: Infinity,
    dischargingTime: Infinity
  });
  const initialized = useRef(false);

  useEffect(() => {
    let battery: BatteryManager | null = null;

    async function initialize() {
      battery = await getBatteryManager();
      if (!battery) return;

      // Initial state
      setBatteryStatus({
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      });

      const handleChange = () =>
        setBatteryStatus({
          charging: battery!.charging,
          level: battery!.level,
          chargingTime: battery!.chargingTime,
          dischargingTime: battery!.dischargingTime
        });

      battery.addEventListener("chargingchange", handleChange);
      battery.addEventListener("levelchange", handleChange);
      battery.addEventListener("chargingtimechange", handleChange);
      battery.addEventListener("dischargingtimechange", handleChange);

      return () => {
        if(!battery) return;
        battery.removeEventListener("chargingchange", handleChange);
        battery.removeEventListener("levelchange", handleChange);
        battery.removeEventListener("chargingtimechange", handleChange);
        battery.removeEventListener("dischargingtimechange", handleChange);
      };
    }

    if (!initialized.current) {
      initialize();
      initialized.current = true;
    }
  }, []);

  return {
    ...batteryStatus,
    isSupported: !!navigator.getBattery
  };
}