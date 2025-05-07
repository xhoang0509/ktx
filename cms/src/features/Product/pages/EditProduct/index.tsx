import { FC } from "react";
import useEditProduct, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button, Chip, SelectItem } from "@heroui/react";
import AppInput from "@components/common/AppInput";
import AppTextarea from "@components/common/AppTextArea";
import AppNumberInput from "@components/common/AppNumberInput";
import AppSelect from "@components/common/AppSelect";
import AppUploadImage from "@components/common/AppUploadImage";

const EditProductLayout: FC<Props> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  categories,
  statusProduct,
}) => {
  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppHeader
          pageTitle="Cập nhật phòng"
          rightMenu={
            <Button color="primary" type="submit">
              Lưu
            </Button>
          }
        />
        <div className="p-4 flex-1">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-12 gap-4 col-span-3">
              <div className="col-span-6">
                <div className="mb-2">Tên phòng</div>
                <AppInput control={control} name="name" />
                <div className="text-danger text-xs mt-1">
                  {/* {errors.name?.message} */}
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">SKU</div>
                <AppInput control={control} name="sku" readOnly />
                <div className="text-danger text-xs mt-1">
                  {errors.sku?.message}
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">Kích cỡ</div>
                <AppInput control={control} name="size" />
                <div className="text-danger text-xs mt-1">
                  {errors.size?.message}
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">Chất liệu</div>
                <AppInput control={control} name="material" />
                <div className="text-danger text-xs mt-1">
                  {errors.material?.message}
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">Số lượng</div>
                <AppNumberInput
                  control={control}
                  name="quantity"
                  size="sm"
                  minValue={0}
                  maxValue={999999}
                  formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
                />
                <div className="text-danger text-xs mt-1">
                  {errors.quantity?.message}
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">Giá</div>
                <AppNumberInput
                  step={1000}
                  control={control}
                  name="price"
                  size="sm"
                  minValue={0}
                  maxValue={999999999999}
                  formatOptions={{ style: "currency", currency: "VND" }}
                />
                <div className="text-danger text-xs mt-1">
                  {errors.price?.message}
                </div>
              </div>
              <div className="col-span-12">
                <div className="mb-2">Danh mục</div>
                <AppSelect
                  control={control}
                  name="categories"
                  isMultiline={true}
                  selectionMode="multiple"
                  renderValue={(items) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip color="primary" key={item.key}>
                            {item.rendered}
                          </Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {categories.map((item) => (
                    <SelectItem key={item._id}>{item.name}</SelectItem>
                  ))}
                </AppSelect>
                <div className="text-danger text-xs mt-1">
                  {errors.categories?.message}
                </div>
              </div>

              <div className="col-span-6">
                <div className="mb-2">Chính sách bảo hành</div>
                <AppTextarea control={control} name="warranty" minRows={10} />
                <div className="text-danger text-xs mt-1">
                  {errors.warranty?.message}
                </div>
              </div>

              <div className="col-span-6">
                <div className="mb-2">Lưu ý giao hàng</div>
                <AppTextarea
                  control={control}
                  name="shippingInfo"
                  minRows={10}
                />
                <div className="text-danger text-xs mt-1">
                  {errors.shippingInfo?.message}
                </div>
              </div>
              <div className="col-span-12">
                <div className="mb-2">Mô tả</div>
                <AppTextarea
                  control={control}
                  name="description"
                  minRows={10}
                />
                <div className="text-danger text-xs mt-1">
                  {/* {errors.description?.message} */}
                </div>
              </div>
            </div>
            <div className="col-span-1 relative">
              <div className="bg-white rounded-2xl p-4 shadow-md sticky top-[82px] flex flex-col gap-4">
                <div>
                  <div className="mb-2">Ảnh</div>
                  <AppUploadImage control={control} name="images" />
                  <div className="text-danger text-xs mt-1">
                    {errors.images?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="mb-2">Hoạt động</div>
                  <AppSelect control={control} name="status" size="md">
                    {statusProduct.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </AppSelect>
                  <div className="text-danger text-xs mt-1">
                    {errors.status?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const EditProduct: FC<ReceivedProps> = (props) => (
  <EditProductLayout {...useEditProduct(props)} />
);

export default EditProduct;
