import { useBatteryStatus } from "@nikadev/use-battery-status";
import './battery.css';

export function Battery() {
    const { level, charging } = useBatteryStatus();
    return (
        <div className="battery-status" data-battery={charging ? 'charging' : 'discharging'}>
            <span className="level">{level * 100}%</span>
            <div className="battery">
                <ChargingInfo/>
                <progress className="battery-progress" value={level * 100} max="100"></progress>
            </div>
            <BatteryText />
        </div>
    );
}

function ChargingInfo() {
    const { charging } = useBatteryStatus();
    return (
        <span className="charging-icon">
            {charging ? '⚡️' : ''}
        </span>
    );
}

function BatteryText() {
    const { charging, chargingTime, dischargingTime } = useBatteryStatus();

    if(charging) {
        return <span>Charging time: {chargingTime === Infinity ? 'is calculating...' : chargingTime + ' seconds'}</span>;
    } else {
        return <span>Discharging time: {dischargingTime === Infinity ? 'is calculating...' : dischargingTime + ' seconds'}</span>;
    }
}