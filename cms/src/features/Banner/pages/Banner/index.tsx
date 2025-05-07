import { FC } from "react";
import useBanner, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button } from "@heroui/react";

const BannerLayout: FC<Props> = ({ ...props }) => {
  return (
    <div>
      <AppHeader
        pageTitle="Quản lý banner"
        rightMenu={<Button color="primary">Thêm banner</Button>}
      />
    </div>
  );
};

const Banner: FC<ReceivedProps> = (props) => (
  <BannerLayout {...useBanner(props)} />
);

export default Banner;
