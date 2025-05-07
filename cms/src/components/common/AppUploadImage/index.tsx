import UploadImage, { UploadImageProps } from "@components/UploadImage";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

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
  ...rest
}: AppUploadImageProps<T>) => {
  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <UploadImage
            {...rest}
            imagesValue={value}
            onChangeImagesValue={onChange}
          />
        );
      }}
    />
  ) : (
    <UploadImage {...rest} />
  );
};

export default AppUploadImage;
