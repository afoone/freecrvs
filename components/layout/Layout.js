import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import OfflineBar from "../offline/OfflineBar";
import Logout from "../auth/Logout";
import AuthHOC from "../auth/AuthHOC";

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState("home");
  const router = useRouter();

  // useEffect(() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     "serviceWorker" in navigator &&
  //     window.workbox !== undefined
  //   ) {
  //     console.log("workbox activating reload");
  //     const wb = window.workbox;
  //     // add event listeners to handle any of PWA lifecycle event
  //     // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
  //     wb.addEventListener("installed", (event) => {
  //       console.log(`Event ${event.type} is triggered.`);
  //       console.log(event);
  //     });

  //     wb.addEventListener("controlling", (event) => {
  //       console.log(`Event ${event.type} is triggered.`);
  //       console.log(event);
  //     });

  //     wb.addEventListener("activated", (event) => {
  //       console.log(`Event ${event.type} is triggered.`);
  //       console.log(event);
  //     });

  //     // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
  //     // NOTE: MUST set skipWaiting to false in next.config.js pwa object
  //     // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
  //     const promptNewVersionAvailable = (event) => {
  //       // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
  //       // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
  //       // You may want to customize the UI prompt accordingly.
  //       if (
  //         confirm(
  //           "A newer version of this web app is available, reload to update?"
  //         )
  //       ) {
  //         wb.addEventListener("controlling", (event) => {
  //           window.location.reload();
  //         });

  //         // Send a message to the waiting service worker, instructing it to activate.
  //         wb.messageSW({ type: "SKIP_WAITING" });
  //       } else {
  //         console.log(
  //           "User rejected to reload the web app, keep using old verion. New verion will be automatically load when user open the app next time."
  //         );
  //       }
  //     };

  //     wb.addEventListener("waiting", promptNewVersionAvailable);
  //     wb.addEventListener("externalwaiting", promptNewVersionAvailable);

  //     // ISSUE - this is not working as expected, why?
  //     // I could only make message event listenser work when I manually add this listenser into sw.js file
  //     wb.addEventListener("message", (event) => {
  //       console.log(`Event ${event.type} is triggered.`);
  //       console.log(event);
  //     });


  //     // never forget to call register as auto register is turned off in next.config.js
  //     wb.register();
  //   }
  // }, []);

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
          <Menu.Item header>
            <span>The Gambia CRVS <small>1.2.1</small></span>
          </Menu.Item>
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
