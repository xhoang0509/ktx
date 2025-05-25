import { Spinner } from "@heroui/react";

interface LoadingSpinnerProps {
    message?: string;
    size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({ 
    message = "Đang tải...", 
    size = "lg" 
}: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <Spinner size={size} />
            <p className="mt-4 text-gray-600 text-center">{message}</p>
        </div>
    );
} 