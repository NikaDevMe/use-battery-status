# use-battery-status

A React hook for accessing battery status information using the [Web Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API).

## Installation

```bash
npm install @nikadev/use-battery-status --save
# or
yarn add @nikadev/use-battery-status
```

## Usage

```tsx
import { useBatteryStatus } from '@nikadev/use-battery-status';

function App() {
  const { 
    isSupported,
    level,
    charging,
    chargingTime,
    dischargingTime
  } = useBatteryStatus();

  if (!isSupported) {
    return <div>Battery API is not supported in your browser</div>;
  }

  return (
    <div>
      <p>Battery Level: {level * 100}%</p>
      <p>Charging: {charging ? 'Yes' : 'No'}</p>
      <p>Time until charged: {chargingTime} seconds</p>
      <p>Time until empty: {dischargingTime} seconds</p>
    </div>
  );
}
```

## API

The `useBatteryStatus` hook returns an object with the following properties:

- `isSupported` (boolean): Indicates if the Battery API is supported in the current browser
- `level` (number): Current battery level between 0 and 1
- `charging` (boolean): Whether the device is currently charging
- `chargingTime` (number): Seconds remaining until battery is fully charged
- `dischargingTime` (number): Seconds remaining until battery is empty

## Browser Support

The Battery Status API is supported in most modern browsers. Check [Can I Use](https://caniuse.com/battery-status) for detailed browser support information.

## Example

Check out the [example](./example) directory in this repository for a complete working demo of the hook in action. To run the example:

```bash
# Clone the repository
git clone https://github.com/NikaDevMe/use-battery-status.git

# Navigate to example directory
cd use-battery-status/example

# Install dependencies
npm install

# Start the development server
npm run dev
```

## License

MIT © [Felix Jordan](https://github.com/NikaDevMe)# @nikadev/use-battery-status
