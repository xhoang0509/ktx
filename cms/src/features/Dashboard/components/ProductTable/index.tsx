import { FC, useCallback, useMemo } from "react";
import useProductTable, { Props, ReceivedProps } from "./hook";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { formatVND } from "@utils/fomart.util";
import AppImage from "@components/AppImage";

const ProductTableLayout: FC<Props> = ({ products, columns }) => {
  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof any];

    switch (columnKey) {
      case "images":
        return (
          <AppImage
            src={item.images[0]}
            alt="Product"
            className="w-[50px] aspect-square object-cover"
          />
        );
      case "status":
        return (
          <Chip
            color={item.status === "active" ? "success" : "danger"}
            size="sm"
            variant="bordered"
          >
            {item.status === "active" ? "Hoạt động" : "Không hoạt động"}
          </Chip>
        );

      case "price":
        return (
          <div className="flex flex-col">
            <p>{formatVND(item.price)}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const renderTable = useMemo(() => {
    return (
      <Table
        classNames={{
          wrapper: "shadow-none",
        }}
        isStriped
        aria-label="category table"
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
          items={products?.map((item: any, index: number) => ({
            ...item,
            indexNumber: index + 1,
          }))}
        >
          {(item: any) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }, [products, columns, renderCell]);

  return <div>{renderTable}</div>;
};

const ProductTable: FC<ReceivedProps> = (props) => (
  <ProductTableLayout {...useProductTable(props)} />
);

export default ProductTable;
