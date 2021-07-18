import React, { useEffect, useState } from "react";
import axios from "axios";
import Duplicates from "../components/duplicates/Duplicates";
import AuthHOC from "../components/auth/AuthHOC";

const duplicates = () => {
  const [editingUser, setEditingUser] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);
 
  return (
    <div>
      <AuthHOC>
        <div>
          <Duplicates/>
        </div>
      </AuthHOC>
    </div>
  );
};

export default duplicates;
