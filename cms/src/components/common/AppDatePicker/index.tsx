import { DatePicker, DatePickerProps } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import moment from "moment";
import { parseDate } from "@internationalized/date";
import { useEffect } from "react";

type WithControl<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

type WithoutControl = {
  control?: never;
  name?: never;
};

type AppDatePickerProps<T extends FieldValues> = DatePickerProps &
  (WithControl<T> | WithoutControl);

const AppDatePicker = <T extends FieldValues>({
  control,
  name,
  ...rest
}: AppDatePickerProps<T>) => {
  const handleValue = (value: string) => {
    return parseDate(!value ? moment().format("YYYY-MM-DD") : value);
  };

  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <DatePicker
            value={!value ? null : handleValue(value)}
            onChange={(e) => e && onChange(e.toString())}
            {...rest}
          />
        );
      }}
    />
  ) : (
    <DatePicker {...rest} />
  );
};

export default AppDatePicker;
