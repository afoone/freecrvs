import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "semantic-ui-react";
import Skeleton from "react-loading-skeleton";

const UserRow = ({ user, setUser }) => {
  return (
    <Table.Row key={user._id}>
      <Table.Cell>{user.username}</Table.Cell>
      <Table.Cell>{user.role}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.HeaderCell>
        <Button style={{ float: "right" }} primary size="small" onClick={() => setUser(user)}>
          Edit
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  );
};

const UserRowSkeleton = () => {
  return (
    <Table.Row>
      <Table.Cell>
        <Skeleton />
      </Table.Cell>
      <Table.Cell>
        <Skeleton />
      </Table.Cell>
      <Table.Cell>
        <Skeleton />
      </Table.Cell>
      <Table.HeaderCell>
        <Button disabled size="small" style={{ float: "right" }}>
          Edit
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  );
};

const UserList = ({ setUser, users }) => {
  return (
    <div className="user-list">
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>
              <Button
                primary
                size="small"
                onClick={() => setUser({})}
                style={{ float: "right" }}
              >
                Create User
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(!users || users.length < 1) &&
            Array.from({ length: 15 }).map(() => <UserRowSkeleton />)}
          {users.map((u) => (
            <UserRow user={u} setUser={setUser}></UserRow>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UserList;
