import { useMemo } from "react";
import useMediaQueries from "./useMediaQueries.js";
import DEVICE_QUERIES from "../constants/DEVICE_QUERIES.js";

export default function useCXDevice() {
  const device = useMediaQueries(DEVICE_QUERIES);

  const value = useMemo(() => {
    let breakpoint = "desktop";

    if (device.isMobile) breakpoint = "mobile";
    else if (device.isTablet) breakpoint = "tablet";
    else if (device.isLaptop) breakpoint = "laptop";

    return {
      ...device,
      breakpoint,
      isTouch: device.isMobile || device.isTablet,
      isLargeScreen: device.isLaptop || device.isDesktop
    };
  }, [device]);
  
  return value;
}

