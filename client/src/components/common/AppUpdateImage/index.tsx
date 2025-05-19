import { Control, Controller, FieldValues, Path } from "react-hook-form";
import UploadImage, { UploadImageProps } from "../UploadImage";

type WithControl<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
};

type WithoutControl = {
    control?: never;
    name?: never;
};

type AppUploadImageProps<T extends FieldValues> = Omit<
    UploadImageProps,
    "imagesValue" | "onChangeImagesValue"
> &
    (WithControl<T> | WithoutControl);

const AppUploadImage = <T extends FieldValues>({
    control,
    name,
    maxItems =5,
    ...rest
}: AppUploadImageProps<T>) => {
    return !!control && !!name ? (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => {
                return <UploadImage {...rest} imagesValue={value} onChangeImagesValue={onChange} maxItems={maxItems}/>;
            }}
        />
    ) : (
        <UploadImage {...rest} />
    );
};

export default AppUploadImage;
