import { FC } from "react";

const Container: FC<{ children: any; label: string; col: number }> = ({
    children,
    label,
    col = 1,
}) => {
    return (
        <div className={`p-4 shadow-md rounded-2xl bg-white col-span-${col} h-[500px]`}>
            <div className="text-xl text-primary">{label}</div>
            {children}
        </div>
    );
};

export default Container;
