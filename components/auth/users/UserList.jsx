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
      <Table.Cell>
        {user.firstName} {user.lastName}
      </Table.Cell>
      <Table.HeaderCell>
        <Button
          style={{ float: "right" }}
          primary
          size="small"
          onClick={() => setUser(user)}
        >
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
  const [search, setSearch] = useState("");

  return (
    <div className="user-list">
      <div className="ui form">
        <div className="ui field">
          <label>Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            className="ui button mini positive"
            onClick={() => setSearch("")}
          >
            Reset Search
          </button>
        </div>
      </div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
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
          {users
            .filter(
              (u) =>
                u.username.toLowerCase().includes(search.toLowerCase()) ||
                u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
                u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
                u.email?.toLowerCase().includes(search.toLowerCase())
            )
            .map((u) => (
              <UserRow user={u} setUser={setUser}></UserRow>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UserList;
