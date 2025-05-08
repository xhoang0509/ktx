import { FC } from "react";
import useAddBlog, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { formatVND } from "@utils/fomart.util";
import moment from "moment";
import { ClockIcon } from "@heroicons/react/24/solid";
import { orderStatus } from "@features/Order/services/const";
import AppImage from "@components/AppImage";
import { Button } from "@heroui/react";

const AddBlogLayout: FC<Props> = ({ detailOrder, updateOrderStatus }) => {
  return (
    <div className="h-full flex flex-col">
      <AppHeader
        pageTitle="Chi tiết thiết bị"
        rightMenu={
          <div className="flex items-center gap-2">
            {detailOrder?.status == "pending" && (
              <>
                <Button
                  onPress={() =>
                    updateOrderStatus(detailOrder._id, "cancelled")
                  }
                >
                  Huỷ
                </Button>
                <Button
                  onPress={() => {
                    updateOrderStatus(detailOrder._id, "shipping");
                  }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  Xác nhận thiết bị
                </Button>
              </>
            )}
          </div>
        }
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        {detailOrder && (
          <div
            className="border-2 p-4 flex flex-col gap-2"
            key={detailOrder._id}
          >
            <div className="text-gray-600 text-md flex items-center border-b-2 pb-2 justify-between select-none">
              <div className="flex items-center gap-1">
                <ClockIcon className="size-5" />
                {moment(detailOrder.createdAt).format("HH:mm:ss DD-MM-YYYY")}
              </div>
              <div
                className={`text-${
                  orderStatus[detailOrder.status as string].color
                }`}
              >
                {orderStatus[detailOrder.status as string].label}
              </div>
            </div>
            <div className="border-b-2 pb-2">
              <div className="text-lg">Phòng đã đặt</div>
              <div className="flex flex-col gap-2 px-2">
                {detailOrder?.items?.map(({ productId, quantity }: any) => (
                  <div
                    className="flex items-center gap-4 justify-between"
                    key={productId._id}
                  >
                    <div className="flex items-center gap-4 w-[300px]">
                      <AppImage
                        src={productId.images[0]}
                        className="w-[150px] h-[100px] object-cover rounded-2xl border-1 shadow-md"
                      />
                      <div>{productId.name}</div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <div className="text-start w-[180px]">
                        <span>giá:</span>{" "}
                        <span className="">{formatVND(productId.price)}</span>
                      </div>
                      <div className="mr-[30px] font-semibold">x</div>
                      <div className="text-start w-[160px]">
                        Số lượng:{" "}
                        <span className="text-primary font-semibold">
                          {quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-end w-[200px] font-semibold">
                      Tổng: {formatVND(quantity * productId.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b-2 text-lg pt-2 pb-4 font-semibold text-right">
              Thanh toán: {formatVND(detailOrder.totalPrice)}
            </div>
            <div className="border-b-2 text-lg pt-2 pb-4 text-right">
              Phương thức thanh toán: {detailOrder.paymentMethod}
            </div>
            <div className="border-b-2 text-lg pt-2 pb-4 text-right last:border-none">
              Địa chỉ nhận hàng: {detailOrder.shippingAddress}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EditDevice: FC<ReceivedProps> = (props) => (
  <AddBlogLayout {...useAddBlog(props)} />
);

export default EditDevice;
