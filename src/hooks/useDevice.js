import { useContext } from "react";
import DeviceContext from "../contexts/DeviceContext.js";

export default function useDevice() {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error("useDevice must be used inside a DeviceProvider");
  }

  return context;
}
