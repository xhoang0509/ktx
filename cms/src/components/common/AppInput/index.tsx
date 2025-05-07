import { Input, InputProps } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type WithControl<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

type WithoutControl = {
  control?: never;
  name?: never;
};

type AppInputProps<T extends FieldValues> = InputProps &
  (WithControl<T> | WithoutControl);

const AppInput = <T extends FieldValues>({
  control,
  name,
  ...rest
}: AppInputProps<T>) => {
  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return <Input value={value} onValueChange={onChange} {...rest} />;
      }}
    />
  ) : (
    <Input {...rest} />
  );
};

export default AppInput;
