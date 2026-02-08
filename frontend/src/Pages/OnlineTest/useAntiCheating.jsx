import { useEffect, useRef } from "react";

const useAntiCheat = ({ maxTabSwitch = 3, onCheat }) => {
  const tabSwitchCount = useRef(0);

  useEffect(() => {
    const disableContextMenu = e => e.preventDefault();

    const disableCopyPaste = e => e.preventDefault();

    const handleVisibility = () => {
      if (document.hidden) {
        tabSwitchCount.current += 1;
        if (tabSwitchCount.current >= maxTabSwitch) {
          onCheat("TAB_SWITCH");
        }
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("copy", disableCopyPaste);
    document.addEventListener("paste", disableCopyPaste);
    document.addEventListener("visibilitychange", handleVisibility);
    
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("copy", disableCopyPaste);
      document.removeEventListener("paste", disableCopyPaste);
      document.removeEventListener("visibilitychange", handleVisibility);
      
    };
  }, [maxTabSwitch, onCheat]);
};

export default useAntiCheat;
