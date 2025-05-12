import { RadioGroup, Radio, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { UserStatus, userStatusOptions } from "../types";

interface UserStatusSectionProps {
  status: UserStatus;
  onChange: (status: UserStatus) => void;
}

export default function UserStatusSection({ status, onChange }: UserStatusSectionProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="font-semibold text-lg">
        Trạng thái tài khoản
      </CardHeader>
      <Divider />
      <CardBody>
        <RadioGroup
          value={status}
          onValueChange={(value) => onChange(value as UserStatus)}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {userStatusOptions.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      </CardBody>
    </Card>
  );
} 