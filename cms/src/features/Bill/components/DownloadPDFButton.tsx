import { Button } from "@heroui/react";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { generatePDF } from "../utils/pdfGenerator";

interface DownloadPDFButtonProps {
  targetElementId: string;
}

export default function DownloadPDFButton({ targetElementId }: DownloadPDFButtonProps) {
  const handleDownload = async () => {
    try {
      await generatePDF(targetElementId);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("Không thể tải xuống PDF. Vui lòng thử lại sau.");
    }
  };

  return (
    <Button 
      color="primary" 
      size="lg" 
      onClick={handleDownload}
      startContent={<DocumentArrowDownIcon className="w-5 h-5" />}
      className="font-medium"
    >
      Tải xuống PDF
    </Button>
  );
} 