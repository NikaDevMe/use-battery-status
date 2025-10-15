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

// This empty export makes this file a module
export {}