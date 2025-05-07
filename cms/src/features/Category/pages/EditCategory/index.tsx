import { FC } from "react";
import useEditCategory, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { AutocompleteItem, Button } from "@heroui/react";
import AppInput from "@components/common/AppInput";
import AppTextarea from "@components/common/AppTextArea";
import AppSwitch from "@components/common/AppSwitch";
import AppAutocomplete from "@components/common/AppAutocomplete";

const EditCategoryLayout: FC<Props> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  categories,
  id,
}) => {
  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppHeader
          pageTitle="Thêm danh mục phòng"
          rightMenu={
            <Button color="primary" type="submit">
              Lưu
            </Button>
          }
        />
        <div className="p-4 flex-1">
          <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <div className="mb-2">Tên danh mục</div>
              <AppInput control={control} name="name" type="text" />
              <div className="text-danger text-xs mt-1">
                {/* {errors.name?.message} */}
              </div>
            </div>
            <div className="col-span-6 row-span-3">
              <div className="mb-2">Mô tả</div>
              <AppTextarea control={control} name="description" minRows={10} />
              <div className="text-danger text-xs mt-1">
                {/* {errors.description?.message} */}
              </div>
            </div>
            <div className="col-span-6">
              <div className="mb-2">Danh mục cha</div>
              <AppAutocomplete
                control={control}
                name="parentId"
                disabledKeys={[id as string]}
              >
                {categories.map((item) => (
                  <AutocompleteItem key={item._id}>
                    {item.name}
                  </AutocompleteItem>
                ))}
              </AppAutocomplete>
              <div className="text-danger text-xs mt-1">
                {errors.parentId?.message}
              </div>
            </div>
            <div className="col-span-6">
              <div className="mb-2">Hoạt động</div>
              <AppSwitch control={control} name="isActive" size="sm" />
              <div className="text-danger text-xs mt-1">
                {errors.isActive?.message}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const EditCategory: FC<ReceivedProps> = (props) => (
  <EditCategoryLayout {...useEditCategory(props)} />
);

export default EditCategory;
