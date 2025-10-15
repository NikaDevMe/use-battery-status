import './App.css';
import { useBatteryStatus } from "@nikadev/use-battery-status";
import { FaviconBattery } from './components/favicon-battery/favicon-battery';
import { Battery } from './components/battery/battery';
import { useState } from 'react';

function App() {
  const { charging, chargingTime, dischargingTime, level, isSupported, isLoading } = useBatteryStatus();
  const [show, setShow] = useState(true);

  if(!isSupported) {
    return (
      <p>Battery Status API is not supported on this browser.</p>
    )
  }

  if(isLoading) {
    return (
      <p>Loading Battery data...</p>
    )
  }

  return (
    <>
        <h1>Battery Status API</h1>
        <title>useBatteryStatus</title>
        <FaviconBattery/>
        <button type="button" onClick={() => setShow(prev => !prev )}>Show / Hide</button>
        
        {show && <Battery/>}
        <br/>
        <section>
          <p>
            <span>charging:</span>
            <span>{charging ? 'Yes' : 'No'}</span>
          </p>

          <p>
            <span>chargingTime:</span>
            <span>{chargingTime}{chargingTime !== Infinity ? 's' : null}</span>
          </p>

          <p>
            <span>dischargingTime:</span>
            <span>{dischargingTime}{dischargingTime !== Infinity ? 's' : null}</span>
          </p>

          <p>
            <span>level:</span>
            <span>{level * 100}%</span>
          </p>
        </section>
    </>
  )
}

export default App
