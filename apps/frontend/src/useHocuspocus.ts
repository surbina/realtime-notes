import { HocuspocusProvider } from "@hocuspocus/provider";
import { useState, useEffect } from "react";
import { API_URL } from "./constants";

interface UseHocuspocusProps {
  name: string;
}

interface UseHocuspocus {
  instance: HocuspocusProvider | undefined;
  isConnected: boolean;
}

export function useHocuspocus({ name }: UseHocuspocusProps): UseHocuspocus {
  const [instance, setInstance] = useState<HocuspocusProvider | undefined>(
    undefined
  );
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newInstance = new HocuspocusProvider({
      url: API_URL,
      name: name as string,
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
      connect: false,
    });
    newInstance.connect();

    // Hacky solution: allows the Editor component to unmount and remount the Slate editor creating a fresh new state
    setTimeout(() => {
      setInstance(newInstance);
    });

    return () => {
      setInstance(undefined);
      newInstance.destroy();
    };
  }, [name]);

  return {
    instance,
    isConnected,
  };
}
