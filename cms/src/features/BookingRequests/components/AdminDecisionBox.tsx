import { useState } from "react";
import { BookingRequestStatus } from "../types";
import { Button, Textarea } from "@heroui/react";

interface AdminDecisionBoxProps {
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  initialNotes?: string;
}

const AdminDecisionBox = ({ onApprove, onReject, initialNotes = "" }: AdminDecisionBoxProps) => {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md col-span-4">
      <h3 className="text-lg font-medium mb-4">Quyết định của Admin</h3>
      <div className="mb-4">
        <Textarea 
          placeholder="Nhập ghi chú xử lý yêu cầu..." 
          className="w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <Button
          color="success"
          className="flex-1"
          onClick={() => onApprove(notes)}
        >
          Duyệt
        </Button>
        <Button
          color="danger"
          className="flex-1"
          onClick={() => onReject(notes)}
        >
          Từ chối
        </Button>
      </div>
    </div>
  );
};

export default AdminDecisionBox; 