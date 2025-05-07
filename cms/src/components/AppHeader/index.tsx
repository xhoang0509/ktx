import { FC } from "react";
import useAppHeader, { Props, ReceivedProps } from "./hook";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";

const AppHeaderLayout: FC<Props> = ({ rightMenu, pageTitle }) => {
  return (
    <div className="w-full border-b-1 sticky top-0 z-10">
      <Navbar
        maxWidth="full"
        classNames={{
          // base: ["bg-[#b6eafa]"],
          item: ["data-[active=true]:text-primary"],
        }}
      >
        <NavbarBrand>
          <div className="text-primary font-bold text-lg">{pageTitle}</div>
        </NavbarBrand>
        <NavbarContent justify="end">{rightMenu}</NavbarContent>
      </Navbar>
    </div>
  );
};

const AppHeader: FC<ReceivedProps> = (props) => (
  <AppHeaderLayout {...useAppHeader(props)} />
);

export default AppHeader;
