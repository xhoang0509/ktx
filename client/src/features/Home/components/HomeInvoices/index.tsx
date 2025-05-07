import { FC } from "react";
import useHomeInvoices, { Props, ReceivedProps } from "./hook";
import HomeLabel from "../HomeLabel";

const HomeInvoicesLayout: FC<Props> = ({ ...props }) => {
  return (
    <div>
      <HomeLabel label="Hoá đơn" />
      <div>Danh sách hoá đơn trống!</div>
    </div>
  );
};

const HomeInvoices: FC<ReceivedProps> = (props) => (
  <HomeInvoicesLayout {...useHomeInvoices(props)} />
);

export default HomeInvoices;
