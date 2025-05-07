import AppImage from "@components/AppImage";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { FC, useEffect, useRef, useState } from "react";

export type UploadImageProps = {
  maxItems?: number;
  imagesValue?: string[];
  onChangeImagesValue?: (data: string[]) => void;
};

const UploadImage: FC<UploadImageProps> = ({
  maxItems = 5,
  imagesValue = [],
  onChangeImagesValue,
}) => {
  const [images, setImages] = useState<string[]>(imagesValue);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(imagesValue);
  }, [imagesValue]);

  const onChangeFiles = (value: string[]) => {
    setImages(value);
    onChangeImagesValue?.(value);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await convertToBase64(file);

      const handleValue = (data: string[]) => {
        if (editIndex !== null) {
          const newImages = [...data];
          newImages[editIndex] = base64Image;
          return newImages;
        } else if (data.length < maxItems) {
          return [...data, base64Image];
        }
        return data;
      };

      const handledValue = handleValue(images);
      onChangeFiles(handledValue);

      setEditIndex(null);
      fileInputRef.current!.value = "";
    }
  };

  const handleButtonClick = (index: number) => {
    setEditIndex(index);
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    onChangeFiles([...images.filter((_, i) => i !== index)]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderItem = (index: number, image: string) => {
    return image ? (
      <div className="relative">
        <AppImage
          src={image}
          alt="Preview"
          className="w-full object-cover rounded-2xl aspect-square cursor-pointer shadow-md"
          onClick={() => handleButtonClick(index)}
        />
        <div
          onClick={() => handleRemove(index)}
          className="bg-red-600 absolute top-2 right-2 p-1 rounded-full hover:shadow-2xl cursor-pointer hover:opacity-80"
        >
          <TrashIcon className="size-6 text-gray-100" />
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        multiple
      />
      <div className="grid grid-cols-2 gap-4 w-full">
        {images.map((image, index) => {
          return index === 0 ? (
            <div className="col-span-2" key={index}>
              {renderItem(index, image)}
            </div>
          ) : (
            <div className="col-span-1" key={index}>
              {renderItem(index, image)}
            </div>
          );
        })}
        {images.length < maxItems && (
          <div className={`col-span-${images.length === 0 ? "2" : "1"}`}>
            <div
              onClick={() => handleButtonClick(images.length)}
              className="w-full aspect-square bg-slate-100 rounded-2xl relative cursor-pointer select-none shadow-inner"
            >
              <div className="absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 bg-white aspect-square flex justify-center items-center p-2 rounded-full shadow-lg">
                <PlusIcon className="size-8" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <Button onPress={handleButtonClick}>Tải ảnh lên</Button> */}
    </div>
  );
};

export default UploadImage;
