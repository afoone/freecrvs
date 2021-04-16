import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import OfflineBar from "../offline/OfflineBar";
import Logout from "../auth/Logout";
import AuthHOC from "../auth/AuthHOC";

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState("home");
  const router = useRouter();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    switch (name) {
      case "home":
        router.push("/immunization/");
        break;
      case "dashboard":
        router.push("/immunization/dashboard/");
        break;
      case "users":
        router.push("/users/");
        break;
      default:
        break;
    }
  };

  return (
    <div className="layout">
      <OfflineBar></OfflineBar>
      <Container>
        <Menu attached="top">
          <Menu.Item header>The Gambia CRVS</Menu.Item>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
          <AuthHOC admin>
            <Menu.Item
              name="dashboard"
              active={activeItem === "dashboard"}
              onClick={handleItemClick}
            />
          </AuthHOC>
          <AuthHOC admin>
            <Menu.Item
              name="users"
              active={activeItem === "users"}
              onClick={handleItemClick}
            />
          </AuthHOC>
          <Menu.Menu position="right">
            <Logout></Logout>
          </Menu.Menu>
        </Menu>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
