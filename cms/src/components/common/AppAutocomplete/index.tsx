import { Autocomplete, AutocompleteProps } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type WithControl<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

type WithoutControl = {
  control?: never;
  name?: never;
};

type AppAutocompleteProps<T extends Record<string, any>> = AutocompleteProps &
  (WithControl<T> | WithoutControl);

const AppAutocomplete = <T extends Record<string, any>>({
  control,
  name,
  children,
  ...rest
}: AppAutocompleteProps<T>) => {
  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <Autocomplete
            selectedKey={value}
            onSelectionChange={onChange}
            {...rest}
          >
            {children}
          </Autocomplete>
        );
      }}
    />
  ) : (
    <Autocomplete {...rest}>{children}</Autocomplete>
  );
};

export default AppAutocomplete;
