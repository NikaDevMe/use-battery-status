import './App.css';
import { useBatteryStatus } from "../src/index";

function App() {
  const { charging, chargingTime, dischargingTime, level, isSupported } = useBatteryStatus();

  return (
    <>
        <h1>Battery Status API</h1>
        {isSupported ? (
          <dl>
            <dd>charging:</dd>
            <dt>{charging}</dt>

            <dd>chargingTime:</dd>
            <dt>{chargingTime}</dt>

            <dd>dischargingTime:</dd>
            <dt>{dischargingTime}</dt>

            <dd>level:</dd>
            <dt>{level}</dt>
          </dl>
        ) : (
          <p>Battery Status API is not supported on this browser.</p>
        )}
    </>
  )
}

export default App
