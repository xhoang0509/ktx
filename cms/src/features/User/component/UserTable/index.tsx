import React, { FC, useCallback, useMemo } from "react";
import useUserTable, { Props, ReceivedProps } from "./hook";
import { formatDateTime } from "@utils/fomart.util";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

const UserTableLayout: FC<Props> = ({
    users, columns
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
                    color={item.isActive ? "danger" : "success"}
                    size="sm"
                    variant="bordered"
                  >
                    {item.isActive ? "Không hoạt động" : "Hoạt động"}
                      </Chip>
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
                aria-label="user table"
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.align as any}
                            width={column.with as any}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    items={users.map((item: any, index: number) => ({
                        ...item,
                        indexNumber: index + 1,
                    }))}
                >
                    {(item: any) => (
                        <TableRow
                            key={item?._id}
                        >
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        )
    }, [users, columns, renderCell])

    return <div>{renderTable}</div>
};

const UserTable: FC<ReceivedProps> = (props) => (
    <UserTableLayout {...useUserTable(props)} />
)

export default UserTable;
