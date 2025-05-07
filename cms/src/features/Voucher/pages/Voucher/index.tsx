import { FC } from "react";
import useVoucher, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button } from "@heroui/react";
import { ROUTE_PATHS } from "@constants/route.const";
import { SearchForm } from "@components/SearchInput";
import VoucherTable from "@features/Voucher/component/VoucherTable";

const VoucherLayout: FC<Props> = ({
  navigate,
  vouchers,
  onSearch,
  setSearch,
  search,
}) => {
  return (
    <div>
      <AppHeader
        pageTitle="Quản lý yêu cầu"
        rightMenu={
          <Button
            color="primary"
            onPress={() => navigate("/" + ROUTE_PATHS.ADD_VOUCHER)}
          >
            Thêm yêu cầu
          </Button>
        }
      />
      <SearchForm
        onSearch={onSearch}
        onChangeInput={setSearch}
        valueInput={search}
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <VoucherTable vouchers={vouchers} />
      </div>
    </div>
  );
};

const Voucher: FC<ReceivedProps> = (props) => (
  <VoucherLayout {...useVoucher(props)} />
);

export default Voucher;
