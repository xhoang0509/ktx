import { FC } from "react";
import useProduct, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button } from "@heroui/react";
import { ROUTE_PATHS } from "@constants/route.const";
import ProductTable from "@features/Product/component/ProductTable";
import { SearchForm } from "@components/SearchInput";

const ProductLayout: FC<Props> = ({
  navigate,
  products,
  onSearch,
  setSearch,
  search,
  pagination,
  onChangePagination,
}) => {
  return (
    <div>
      <AppHeader
        pageTitle="Quản lý phòng"
        rightMenu={
          <Button
            color="primary"
            onPress={() => navigate("/" + ROUTE_PATHS.ADD_PRODUCT)}
          >
            Thêm phòng
          </Button>
        }
      />
      <SearchForm
        onSearch={onSearch}
        onChangeInput={setSearch}
        valueInput={search}
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <ProductTable
          products={products}
          pagination={pagination}
          onChangePagination={onChangePagination}
        />
      </div>
    </div>
  );
};

const Product: FC<ReceivedProps> = (props) => (
  <ProductLayout {...useProduct(props)} />
);

export default Product;
