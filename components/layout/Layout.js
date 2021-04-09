import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Container, Header } from "semantic-ui-react";

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="layout">
      <Container>
        <Menu color="blue" inverted widths={3} attached='top'>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="messages"
            active={activeItem === "messages"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="friends"
            active={activeItem === "friends"}
            onClick={handleItemClick}
          />
        </Menu>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
