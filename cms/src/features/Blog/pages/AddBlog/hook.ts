import { BlogActions } from "@features/Blog/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@services/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { addBlogSchema } from "../schemas/AddBlogSchemas";
import { defaultAddBlogForm } from "@features/Blog/services/const";
import { ROUTE_PATHS } from "@constants/route.const";

export type ReceivedProps = Record<string, any>;

const useAddBlog = (props: ReceivedProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAddBlogForm,
    resolver: yupResolver(addBlogSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      BlogActions.addBlog({
        body: { ...data, image: data.image[0] },
        onSuccess: () => {
          reset();
          navigate(`/${ROUTE_PATHS.BLOG}`);
        },
      })
    );
  };

  return {
    ...props,
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    navigate,
    setValue,
  };
};

export type Props = ReturnType<typeof useAddBlog>;

export default useAddBlog;
