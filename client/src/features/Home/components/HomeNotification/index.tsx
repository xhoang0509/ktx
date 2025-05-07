import { FC } from "react";
import useHomeNotification, { Props, ReceivedProps } from "./hook";
import HomeLabel from "../HomeLabel";

const HomeNotificationLayout: FC<Props> = ({ ...props }) => {
  return (
    <div>
      <HomeLabel label="Thông báo mới" />
      <div>Danh sách thông báo trống!</div>
    </div>
  );
};

const HomeNotification: FC<ReceivedProps> = (props) => (
  <HomeNotificationLayout {...useHomeNotification(props)} />
);

export default HomeNotification;
