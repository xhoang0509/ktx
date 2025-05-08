import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { store } from "@services/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider  toastProps={{
        timeout: 3000,
      }}/>
      <Provider store={store}>{children}</Provider>
    </HeroUIProvider>
  );
}
