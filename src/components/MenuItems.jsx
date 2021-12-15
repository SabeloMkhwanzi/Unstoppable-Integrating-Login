import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { Text } from "@chakra-ui/react";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      mode="horizontal"
      style={{
        backgroundColor: "#161853",
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
        color: "#FAEDF0",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/quickstart">
        <NavLink to="/quickstart">
          <Text color="#FAEDF0">Welcome</Text>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/wallet">
        <NavLink to="/wallet">
          <Text color="#FAEDF0">Wallet</Text>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/1inch">
        <NavLink to="/1inch">
          <Text color="#FAEDF0">Dex</Text>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">
          <Text color="#FAEDF0">Balances</Text>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <NavLink to="/erc20transfers">
          <Text color="#FAEDF0">History</Text>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">
          <Text color="#FAEDF0">NFTs</Text>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
