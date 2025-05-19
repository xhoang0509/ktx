import { FC } from "react";

const AppImage: FC<any> = ({ src, ...props }) => {
    const checkingBase64 = (src: string) => {
        return src.startsWith("data:image/");
    };

    const isFileName = (src: string) => {
        return src.startsWith("/");
    };

    const handleImageSource = (src: string) => {
        if (!src) return null;
        if (checkingBase64(src)) {
            if (src.includes("base64,")) {
                return src.substring(src.lastIndexOf("data:image"));
            }
        }

        if (isFileName(src)) {
            return import.meta.env.VITE_API_URL_WITHOUT_VERSION + src;
        }

        return src;
    };

    return <img src={handleImageSource(src)} {...props} />;
};

export default AppImage;
