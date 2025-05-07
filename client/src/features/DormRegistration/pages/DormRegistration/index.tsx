import { FC } from "react";
import useDormRegistration, { Props, ReceivedProps } from "./hook";

const DormRegistrationLayout: FC<Props> = ({ ...props }) => {
  return <div>DormRegistration</div>;
};

const DormRegistration: FC<ReceivedProps> = (props) => (
  <DormRegistrationLayout {...useDormRegistration(props)} />
);

export default DormRegistration;
