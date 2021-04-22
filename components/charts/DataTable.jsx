import React from "react";
import { Table } from "semantic-ui-react";

const DataTable = ({ title, data }) => {
  
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={2}>{title}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((i) => (
            <Table.Row key={i.name}>
              <Table.Cell>{i.name || "Unknown"}</Table.Cell>
              <Table.Cell>{i.value}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
