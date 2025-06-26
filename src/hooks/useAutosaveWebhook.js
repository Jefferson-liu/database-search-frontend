import { useEffect, useRef } from "react";
import { autosaveToWebhook } from "../api/autosave";

export default function useAutosaveWebhook(data, delay = 500) {
  const timeoutRef = useRef();
  const prevDataRef = useRef();

  useEffect(() => {
    // Only send if data actually changed
    if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data)) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        autosaveToWebhook(data);
        prevDataRef.current = data;
      }, delay);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [data, delay]);
} 