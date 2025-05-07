export type ReceivedProps = {
  products: any[];
};

const useProductTable = (props: ReceivedProps) => {
  const columns = [
    { name: "STT", uid: "indexNumber", align: "center", width: "80px" },
    { name: "ID", uid: "_id" },
    { name: "Ảnh", uid: "images" },
    { name: "Tên", uid: "name" },
    { name: "SKU", uid: "sku" },
    { name: "Đã bán", uid: "sold", align: "center" },
    { name: "Giá", uid: "price" },
    { name: "Kích cỡ", uid: "size" },
    { name: "Trạng thái", uid: "status", align: "center" },
  ];

  return { columns, ...props };
};

export type Props = ReturnType<typeof useProductTable>;

export default useProductTable;
