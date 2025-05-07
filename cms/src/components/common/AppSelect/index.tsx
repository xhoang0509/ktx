import { Select, SelectProps } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type WithControl<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

type WithoutControl = {
  control?: never;
  name?: never;
};

type AppSelectProps<T extends Record<string, any>> = SelectProps &
  (WithControl<T> | WithoutControl);

const AppSelect = <T extends Record<string, any>>({
  control,
  name,
  children,
  ...rest
}: AppSelectProps<T>) => {
  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handledValue =
          typeof value === "string" ? new Set([value]) : value;
        return (
          <Select
            selectedKeys={handledValue}
            onSelectionChange={(e) => {
              onChange(
                typeof value === "string" ? Array.from(e)[0] : Array.from(e)
              );
            }}
            {...rest}
          >
            {children}
          </Select>
        );
      }}
    />
  ) : (
    <Select {...rest}>{children}</Select>
  );
};

export default AppSelect;
