import useCXDevice from "../hooks/useCXDevice.js";
import DeviceContext from "../contexts/DeviceContext.js";

export default function DeviceProvider({ children }) {
  
  const device = useCXDevice();
  
  return (
    <DeviceContext.Provider
      value={device}>
      {children}
    </DeviceContext.Provider>
  );
}
