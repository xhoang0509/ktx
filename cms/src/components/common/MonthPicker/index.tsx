import { Select, SelectItem } from "@heroui/react";

interface PropsType {
  value: { month: number; year: number };
  onChange: (query: { month: number; year: number }) => void;
}

function MonthPicker({ value, onChange }: PropsType) {
  const currentYear = new Date().getFullYear();

  const years: Array<any> = Array.from({ length: 100 }, (_, i) => {
    return { label: (currentYear - i).toString(), value: currentYear - i };
  });

  const months = Array.from({ length: 12 }, (_, i) => {
    return { label: `Tháng ${i + 1}`, value: i + 1 };
  });

  return (
    <div className="w-full grid grid-cols-12 gap-2">
      <Select
        size="sm"
        aria-label="year_list"
        onChange={(e) => onChange({ ...value, month: Number(e.target.value) })}
        className="col-span-6"
        selectedKeys={[value.month.toString()]}
      >
        {months.map((month) => (
          <SelectItem key={month?.value}>{month.label}</SelectItem>
        ))}
      </Select>
      {years && (
        <Select
          size="sm"
          aria-label="year_list"
          className="col-span-6"
          selectedKeys={[value.year.toString()]}
          onChange={(e) => onChange({ ...value, year: Number(e.target.value) })}
        >
          {years?.map((year: any) => {
            return <SelectItem key={year?.value}>{year?.label}</SelectItem>;
          })}
        </Select>
      )}
    </div>
  );
}

export default MonthPicker;
