import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
       <ToastContainer />
      <Provider store={store}>{children}</Provider>
    </HeroUIProvider>
  );
}
