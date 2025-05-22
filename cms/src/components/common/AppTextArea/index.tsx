import { Textarea, TextAreaProps } from "@heroui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type WithControl<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
};

type WithoutControl = {
    control?: never;
    name?: never;
};

type AppTextareaProps<T extends FieldValues> = TextAreaProps & (WithControl<T> | WithoutControl);

const AppTextarea = <T extends FieldValues>({ control, name, ...rest }: AppTextareaProps<T>) => {
    return !!control && !!name ? (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => {
                return <Textarea value={value} onValueChange={onChange} {...rest} />;
            }}
        />
    ) : (
        <Textarea {...rest} />
    );
};

export default AppTextarea;
