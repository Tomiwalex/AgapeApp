import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const useHideTabBarOnScroll = () => {
  const [offsetY, setOffsetY] = useState(0);
  const { setTabBarVisible } = useAppContext();

  const handleScroll = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;

    if (currentOffsetY > offsetY + 20) {
      setOffsetY((prev) => currentOffsetY);
      setTabBarVisible(false);
    } else if (offsetY > currentOffsetY) {
      setOffsetY(currentOffsetY);
      setTabBarVisible(true);
    }
  };

  return { handleScroll };
};

export default useHideTabBarOnScroll;
