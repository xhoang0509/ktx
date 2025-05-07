import { BlogType } from "./dto";

export const statusBlog = [
  { key: "active", label: "Hoạt động" },
  { key: "inactive", label: "Không hoạt động" },
];

export const defaultAddBlogForm: BlogType = {
  title: "",
  content: "",
  image: [],
  status: statusBlog[0].key,
};
export const defaultPagination = {
  page: 1,
  limit: 99,
};
