import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { store } from "@services/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <Provider store={store}>{children}</Provider>
    </HeroUIProvider>
  );
}
