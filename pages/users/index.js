import React, { useState } from "react";
import AuthHOC from "../../components/auth/AuthHOC";
import UserForm from "../../components/auth/users/UserForm";
import UserList from "../../components/auth/users/UserList";

const users = () => {
  const [editingUser, setEditingUser] = useState(null);

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
          <UserList setUser={setEditingUser} />
          {editingUser && (
            <UserForm setUser={setEditingUser} user={editingUser}></UserForm>
          )}
        </div>
      </AuthHOC>
    </div>
  );
};

export default users;
