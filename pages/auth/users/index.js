import React, { useState } from "react";
import AuthHOC from "../../../components/auth/AuthHOC";
import UserForm from "../../../components/auth/users/UserForm";
import UserList from "../../../components/auth/users/UserList";

const users = () => {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div>
      <AuthHOC>
        <UserList setUser={setEditingUser} />
        {editingUser && (
          <UserForm setUser={setEditingUser} user={editingUser}></UserForm>
        )}
      </AuthHOC>
    </div>
  );
};

export default users;
