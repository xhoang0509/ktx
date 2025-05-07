import { FC, useCallback, useMemo } from "react";
import useBlogTable, { Props, ReceivedProps } from "./hook";
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
import { formatVND } from "@utils/fomart.util";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import AppImage from "@components/AppImage";
import moment from "moment";

const BlogTableLayout: FC<Props> = ({
  blogs,
  columns,
  deleteBlog,
  navigateEditBlog,
}) => {
  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof any];

    switch (columnKey) {
      case "image":
        return (
          <AppImage
            src={item.image}
            alt="image"
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
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip content="Sửa">
              <span
                onClick={() => navigateEditBlog(item._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <PencilIcon className="size-4 text-success" />
              </span>
            </Tooltip>
            <Tooltip content="Xoá">
              <span
                onClick={() => deleteBlog(item._id)}
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
          items={blogs.map((item: any, index: number) => ({
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
  }, [blogs, columns, renderCell]);

  return <div>{renderTable}</div>;
};

const BlogTable: FC<ReceivedProps> = (props) => (
  <BlogTableLayout {...useBlogTable(props)} />
);

export default BlogTable;
