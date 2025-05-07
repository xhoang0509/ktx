import { FC } from "react";
import useCategory, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button } from "@heroui/react";
import { ROUTE_PATHS } from "@constants/route.const";
import CategoryTable from "@features/Category/component/CategoryTable";

const CategoryLayout: FC<Props> = ({ navigate, categories, ...props }) => {
  return (
    <div>
      <AppHeader
        pageTitle="Quản lý danh mục phòng"
        rightMenu={
          <Button
            color="primary"
            onPress={() => navigate("/" + ROUTE_PATHS.ADD_CATEGORY)}
          >
            Thêm danh mục
          </Button>
        }
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
};

const Category: FC<ReceivedProps> = (props) => (
  <CategoryLayout {...useCategory(props)} />
);

export default Category;
