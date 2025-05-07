import { Providers } from "./providers";
import AppRouter from "./routes";
import "./global.css";

function App() {
  return (
    <>
      <Providers>
        <AppRouter />
      </Providers>
    </>
  );
}

export default App;
