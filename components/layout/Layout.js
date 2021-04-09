import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import OfflineBar from "../offline/OfflineBar";

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
        router.push("/dashboard/");
        break;
      case "profile":
        router.push("/profile/");
        break;
      default:
        break;
    }
  };

  return (
    <div className="layout">
      <OfflineBar></OfflineBar>
      <Container>
        <Menu color="blue" inverted widths={4} attached="top">
          <Menu.Item header>The Gambia CRVS</Menu.Item>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="dashboard"
            active={activeItem === "dashboard"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={handleItemClick}
          />
        </Menu>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
