import { Providers } from "./providers";
import AppRouter from "./routes";
import "./global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

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
