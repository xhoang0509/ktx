import { SwitchProps, Switch } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type WithControl<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

type WithoutControl = {
  control?: never;
  name?: never;
};

type AppSwitchProps<T extends Record<string, any>> = SwitchProps &
  (WithControl<T> | WithoutControl);

const AppSwitch = <T extends Record<string, any>>({
  control,
  name,
  ...rest
}: AppSwitchProps<T>) => {
  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return <Switch isSelected={value} onValueChange={onChange} {...rest} />;
      }}
    />
  ) : (
    <Switch {...rest} />
  );
};

export default AppSwitch;
