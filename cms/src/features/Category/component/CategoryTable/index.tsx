import { FC, useCallback, useMemo } from "react";
import useCategoryTable, { Props, ReceivedProps } from "./hook";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { formatDateTime } from "@utils/fomart.util";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const CategoryTableLayout: FC<Props> = ({
  categories,
  columns,
  deleteCategory,
  navigateEditCategory,
}) => {
  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof any];

    switch (columnKey) {
      case "createdAt":
        return (
          <div className="line-clamp-2">{formatDateTime(item.createdAt)}</div>
        );
      case "updatedAt":
        return (
          <div className="line-clamp-2">{formatDateTime(item.updatedAt)}</div>
        );

      case "isActive":
        return (
          <Chip
            color={item.isActive ? "success" : "danger"}
            size="sm"
            variant="bordered"
          >
            {item.isActive ? "Hoạt động" : "Không hoạt động"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            {/* <Tooltip content="Chi tiết">
              <span
                onClick={() => null}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon className="size-4 text-primary" />
              </span>
            </Tooltip> */}
            <Tooltip content="Sửa">
              <span
                onClick={() => navigateEditCategory(item._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <PencilIcon className="size-4 text-success" />
              </span>
            </Tooltip>
            <Tooltip content="Xoá">
              <span
                onClick={() => deleteCategory(item._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <TrashIcon className="size-4 text-danger" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  //   const setPage = (page: number) => {
  //     dispatch(
  //       EGiftActions.setPagination({
  //         ...pagination,
  //         page,
  //       })
  //     );
  //     dispatch(EGiftActions.getEGifts({ page }));
  //   };

  //   const renderPagination = useMemo(() => {
  //     return (
  //       pagination?.totalPages > 1 && (
  //         <div className="flex w-full justify-center">
  //           <Pagination
  //             showControls
  //             page={pagination?.page}
  //             total={pagination?.totalPages}
  //             onChange={(page) => setPage(page)}
  //           />
  //         </div>
  //       )
  //     );
  //   }, [pagination, setPage]);

  const renderTable = useMemo(() => {
    return (
      <Table
        classNames={{
          wrapper: "shadow-none",
        }}
        isStriped
        aria-label="category table"
        // bottomContent={renderPagination}
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
          items={categories.map((item: any, index: number) => ({
            ...item,
            indexNumber: index + 1,
          }))}
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
  }, [categories, columns, renderCell]);

  return <div>{renderTable}</div>;
};

const CategoryTable: FC<ReceivedProps> = (props) => (
  <CategoryTableLayout {...useCategoryTable(props)} />
);

export default CategoryTable;
