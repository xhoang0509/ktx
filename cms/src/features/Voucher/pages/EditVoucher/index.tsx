import { FC } from "react";
import useEditVoucher, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button } from "@heroui/react";
import AppInput from "@components/common/AppInput";
import AppNumberInput from "@components/common/AppNumberInput";
import AppSwitch from "@components/common/AppSwitch";
import AppDatePicker from "@components/common/AppDatePicker";
import { Controller } from "react-hook-form";

const EditVoucherLayout: FC<Props> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  setValue,
}) => {
  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppHeader
          pageTitle="Thêm mới voucher"
          rightMenu={
            <Button color="primary" type="submit">
              Lưu
            </Button>
          }
        />
        <div className="p-4 flex-1">
          <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <div className="mb-2">Tên voucher</div>
              <AppInput control={control} name="name" />
              <div className="text-danger text-xs mt-1">
                {errors.name?.message}
              </div>
            </div>
            <div className="col-span-6">
              <div className="mb-2">code</div>
              <AppInput control={control} name="code" readOnly />
              <div className="text-danger text-xs mt-1">
                {errors.code?.message}
              </div>
            </div>
            <div className="col-span-6">
              <div className="mb-2">Giá trị giảm</div>
              <Controller
                control={control}
                name="isPercentage"
                render={({ field: { value, onChange } }) => {
                  return (
                    <AppNumberInput
                      hideStepper
                      control={control}
                      name="discount"
                      size="sm"
                      minValue={0}
                      maxValue={value ? 1 : 999999}
                      formatOptions={{
                        style: value ? "percent" : "currency",
                        ...(value ? {} : { currency: "VND" }),
                      }}
                      endContent={
                        <Button
                          isIconOnly
                          size="sm"
                          color="primary"
                          onPress={() => {
                            onChange(!value);
                            setValue("discount", value ? 1000 : 0.01);
                          }}
                        >
                          {value ? "%" : "VND"}
                        </Button>
                      }
                    />
                  );
                }}
              />
              <div className="text-danger text-xs mt-1">
                {errors.discount?.message}
              </div>
            </div>
            <div className="col-span-6">
              <div className="mb-2">Giá trị thoả mãn</div>
              <AppNumberInput
                step={1000}
                control={control}
                name="minOrderValue"
                size="sm"
                minValue={0}
                maxValue={999999999999}
                formatOptions={{ style: "currency", currency: "VND" }}
              />
              <div className="text-danger text-xs mt-1">
                {errors.minOrderValue?.message}
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
              <div className="mb-2">Ngày hết hạn</div>
              <AppDatePicker control={control} name="expiryDate" />
              <div className="text-danger text-xs mt-1">
                {errors.expiryDate?.message}
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

const EditVoucher: FC<ReceivedProps> = (props) => (
  <EditVoucherLayout {...useEditVoucher(props)} />
);

export default EditVoucher;
