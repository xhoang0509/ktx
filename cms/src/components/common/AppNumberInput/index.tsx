import { Input, NumberInputProps, NumberInput } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type WithControl<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

type WithoutControl = {
  control?: never;
  name?: never;
};

type AppNumberInputProps<T extends FieldValues> = NumberInputProps &
  (WithControl<T> | WithoutControl);

const AppNumberInput = <T extends FieldValues>({
  control,
  name,
  ...rest
}: AppNumberInputProps<T>) => {
  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return <NumberInput value={value} onValueChange={onChange} {...rest} />;
      }}
    />
  ) : (
    <NumberInput {...rest} />
  );
};

export default AppNumberInput;
