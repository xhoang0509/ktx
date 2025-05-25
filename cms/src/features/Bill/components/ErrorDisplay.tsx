import { Alert, Button, Card, CardBody } from "@heroui/react";

interface ErrorDisplayProps {
    error: string;
    onRetry?: () => void;
    retryText?: string;
    showRetry?: boolean;
}

export default function ErrorDisplay({ 
    error, 
    onRetry, 
    retryText = "Thử lại", 
    showRetry = true 
}: ErrorDisplayProps) {
    return (
        <Card className="max-w-md mx-auto">
            <CardBody className="text-center">
                <Alert color="danger" title="Có lỗi xảy ra" className="mb-4">
                    {error}
                </Alert>
                {showRetry && onRetry && (
                    <Button 
                        color="primary" 
                        onPress={onRetry}
                    >
                        {retryText}
                    </Button>
                )}
            </CardBody>
        </Card>
    );
} 