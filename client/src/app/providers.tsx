import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Provider store={store}>{children}</Provider>
    </HeroUIProvider>
  );
}
