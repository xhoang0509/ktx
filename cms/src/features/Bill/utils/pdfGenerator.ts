import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export const generatePDF = async (elementId: string): Promise<void> => {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element with ID "${elementId}" not found`);
        }

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        pdf.save("hop-dong-thue-cho-o.pdf");
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    }
};
