import React, { useEffect, useState } from "react";
import AuthHOC from "../../components/auth/AuthHOC";
import UserForm from "../../components/auth/users/UserForm";
import UserList from "../../components/auth/users/UserList";
import axios from "axios";
import Duplicates from "../../components/duplicates/Duplicates";

const users = () => {
  const [editingUser, setEditingUser] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);
 
  return (
    <div>
      <AuthHOC>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            columnGap: "1rem",
          }}
        >
          <UserList setUser={setEditingUser} users={users} />
          {editingUser && (
            <UserForm
              setUser={setEditingUser}
              user={editingUser}
              addUserToList={(u) =>
                setUsers([u, ...users.filter((i) => i._id !== u._id)])
              }
            ></UserForm>
          )}
        </div>
        <hr></hr>
        <div>
          <Duplicates/>
          
        </div>
      </AuthHOC>
    </div>
  );
};

export default users;
