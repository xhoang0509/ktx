import { FC, useCallback, useMemo } from "react";
import useOrderTable, { Props, ReceivedProps } from "./hook";
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { formatVND } from "@utils/fomart.util";
import {
  CheckCircleIcon,
  EyeIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import { orderStatus } from "@features/Order/services/const";

const OrderTableLayout: FC<Props> = ({
  columns,
  updateOrderStatus,
  navigateEditOrder,
  orders,
  pagination,
  onChangePagination,
}) => {
  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof any];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            color={orderStatus[item.status].color as any}
            size="sm"
            variant="bordered"
          >
            {orderStatus[item.status].label}
          </Chip>
        );
      case "totalPrice":
        return <div>{formatVND(item.totalPrice)}</div>;
      case "createdAt":
        return (
          <div>{moment(item.createdAt).format("HH:mm:ss DD-MM-YYYY")}</div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip content="Xem">
              <span
                onClick={() => navigateEditOrder(item._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon className="size-4 text-secondary" />
              </span>
            </Tooltip>

            {item.status == "pending" && (
              <>
                <Tooltip content="Huỷ">
                  <span
                    onClick={() => updateOrderStatus(item._id, "cancelled")}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <XCircleIcon className="size-4 text-danger" />
                  </span>
                </Tooltip>
                <Tooltip content="xác nhận">
                  <span
                    onClick={() => {
                      updateOrderStatus(item._id, "shipping");
                    }}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <CheckCircleIcon className="size-4 text-success" />
                  </span>
                </Tooltip>
              </>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const renderPagination = useMemo(() => {
    return (
      pagination?.totalPages > 1 && (
        <div className="flex w-full justify-center">
          <Pagination
            isDisabled={!onChangePagination}
            showControls={!!onChangePagination}
            page={pagination?.page}
            total={pagination?.totalPages}
            onChange={(page) => onChangePagination?.(page)}
          />
        </div>
      )
    );
  }, [pagination, onChangePagination]);

  const renderTable = useMemo(() => {
    return (
      <Table
        classNames={{
          wrapper: "shadow-none",
        }}
        isStriped
        aria-label="category table"
        bottomContent={renderPagination}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.align as any}
              width={column.width as any}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={
            orders?.length
              ? orders?.map((item: any, index: number) => ({
                  ...item,
                  indexNumber: index + 1,
                }))
              : []
          }
        >
          {(item: any) => (
            <TableRow key={item?._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }, [orders, columns, renderCell]);

  return <div>{renderTable}</div>;
};

const OrderTable: FC<ReceivedProps> = (props) => (
  <OrderTableLayout {...useOrderTable(props)} />
);

export default OrderTable;
