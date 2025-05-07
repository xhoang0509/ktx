import { FC } from "react";
import useAddBlog, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button, SelectItem } from "@heroui/react";
import AppInput from "@components/common/AppInput";
import AppTextarea from "@components/common/AppTextArea";
import AppUploadImage from "@components/common/AppUploadImage";
import AppSwitch from "@components/common/AppSwitch";
import AppSelect from "@components/common/AppSelect";
import { statusBlog } from "@features/Blog/services/const";

const AddBlogLayout: FC<Props> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppHeader
          pageTitle="Cập nhật bài viết"
          rightMenu={
            <Button color="primary" type="submit">
              Lưu
            </Button>
          }
        />
        <div className="p-4 flex-1">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-12 gap-4 col-span-3">
              <div className="col-span-12">
                <div className="mb-2">Tiêu đề bài viết</div>
                <AppInput control={control} name="title" />
                <div className="text-danger text-xs mt-1">
                  {errors.title?.message}
                </div>
              </div>
              <div className="col-span-12">
                <div className="mb-2">Nội dung</div>
                <AppTextarea control={control} name="content" minRows={40} />
                <div className="text-danger text-xs mt-1">
                  {errors.content?.message}
                </div>
              </div>
            </div>

            <div className="col-span-1 relative">
              <div className="bg-white rounded-2xl p-4 shadow-md sticky top-[82px] flex flex-col gap-4">
                <div>
                  <div className="mb-2">Ảnh</div>
                  <AppUploadImage control={control} name="image" maxItems={1} />
                  <div className="text-danger text-xs mt-1">
                    {errors.image?.message}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="mb-2">Hoạt động</div>
                  <AppSelect control={control} name="status" size="md">
                    {statusBlog.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </AppSelect>
                  <div className="text-danger text-xs mt-1">
                    {errors.status?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const AddBlog: FC<ReceivedProps> = (props) => (
  <AddBlogLayout {...useAddBlog(props)} />
);

export default AddBlog;
