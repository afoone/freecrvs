import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "semantic-ui-react";

const UserList = ({ setUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="user-list">
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>
              <Button primary size="small" onClick={() => setUser({})}>
                New
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((u) => (
            <Table.Row key={u._id}>
              <Table.Cell>{u.username}</Table.Cell>
              <Table.Cell>{u.role}</Table.Cell>
              <Table.Cell>{u.email}</Table.Cell>
              <Table.HeaderCell>
                <Button primary size="small" onClick={()=>setUser(u)}>
                  Edit
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UserList;
