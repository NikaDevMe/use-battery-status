import { useSyncExternalStore } from "react";

declare global {
  interface BatteryManager {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
  }

  interface Navigator {
    getBattery(): Promise<BatteryManager>;
  }
}

// battery status object
const isSupported = typeof navigator !== 'undefined' && 'getBattery' in navigator;
let batteryManager: BatteryManager | null = null;

// last known battery state
let lastKnownBatteryState = {
  isLoading: true,
  isSupported,
  level: 0,
  charging: false,
  chargingTime: Infinity,
  dischargingTime: Infinity,
};

function updateBatteryState(b: BatteryManager) {
  lastKnownBatteryState = {
    isLoading: false,
    isSupported,
    level: b.level,
    charging: b.charging,
    chargingTime: b.chargingTime,
    dischargingTime: b.dischargingTime,
  };
}

async function getBatteryManager() {
  if(!batteryManager) {
    batteryManager = await navigator.getBattery();
  }

  return batteryManager;
}

function subscribeBattery(callback: () => void) {
  let cleanup: (() => void) | undefined;

  async function initialize() {
    const battery = await getBatteryManager();
    // init data immediately
    updateBatteryState(battery);
    callback(); // ✅ tell React the snapshot changed

    function handleChange() {
      updateBatteryState(battery);
      callback(); // ✅ tell React the snapshot changed
    }

    battery.addEventListener("levelchange", handleChange);
    battery.addEventListener("chargingchange", handleChange);
    battery.addEventListener("chargingtimechange", handleChange);
    battery.addEventListener("dischargingtimechange", handleChange);

    cleanup = () => {
      battery.removeEventListener("levelchange", handleChange);
      battery.removeEventListener("chargingchange", handleChange);
      battery.removeEventListener("chargingtimechange", handleChange);
      battery.removeEventListener("dischargingtimechange", handleChange);
    };
  }

  initialize();

  // Return a cleanup function that's safe to call at any time
  return () => {
    if (cleanup) {
      cleanup();
    }
  };
}

function getBatterySnapshot() {
  return lastKnownBatteryState;
}

export function useBatteryStatus() {
  return useSyncExternalStore(subscribeBattery, getBatterySnapshot);
}