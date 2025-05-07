import { FC } from "react";
import useBlog, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button } from "@heroui/react";
import { ROUTE_PATHS } from "@constants/route.const";
import { SearchForm } from "@components/SearchInput";
import BlogTable from "@features/Blog/component/BlogTable";

const BlogLayout: FC<Props> = ({
  navigate,
  blogs,
  onSearch,
  setSearch,
  search,
}) => {
  return (
    <div>
      <AppHeader
        pageTitle="Quản lý thông báo"
        rightMenu={
          <Button
            color="primary"
            onPress={() => navigate("/" + ROUTE_PATHS.ADD_BLOG)}
          >
            Thêm thông báo
          </Button>
        }
      />
      <SearchForm
        onSearch={onSearch}
        onChangeInput={setSearch}
        valueInput={search}
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <BlogTable blogs={blogs} />
      </div>
    </div>
  );
};

const Blog: FC<ReceivedProps> = (props) => <BlogLayout {...useBlog(props)} />;

export default Blog;
