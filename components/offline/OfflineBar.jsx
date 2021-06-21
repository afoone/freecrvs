import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Menu } from "semantic-ui-react";
import axios from "axios";
import { synchronizeImmunizations as synchronizeImmunizationsThunk } from "../../redux/immunizationSlice";

const OfflineBar = () => {
  const dispatch = useDispatch();

  const synchronizeImmunizations = () => {
    axios
      .get("/api/patients/ping")
      .then(() => {
        setOffline(false);
      })
      .catch(() => setOffline(true));
  };

  const [offline, setOffline] = useState(false);

  const [currentInterval, setCurrentInterval] = useState(null);

  useEffect(() => {
    if (currentInterval) clearInterval(currentInterval);
    setCurrentInterval(
      setInterval(() => {
        dispatch(synchronizeImmunizationsThunk());
      }, 10000)
    );
    return () => {
      if (currentInterval) clearInterval(currentInterval);
    };
  }, []);

  return (
    <Menu color={offline ? "grey" : "green"} inverted widths={4} attached="top">
      {offline
        ? "You're offline. Data will sync when you're back online."
        : "You're online! Data is being synced."}
    </Menu>
  );
};

export default OfflineBar;
