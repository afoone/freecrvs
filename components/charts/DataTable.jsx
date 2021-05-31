import React from "react";
import { Table } from "semantic-ui-react";

const DataTable = ({ title, data, totals }) => {
  // Grouping unkowns
  const dataGrouped = [
    ...data.filter((i) => i.name),
    {
      value: data
        .filter((i) => !i.name)
        .reduce((acc, curr) => acc + curr.value, 0),
    },
  ];

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
        {dataGrouped
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((i) => (
            <Table.Row key={i.name}>
              <Table.Cell>{i.name || "Unknown"}</Table.Cell>
              <Table.Cell>{i.value}</Table.Cell>
            </Table.Row>
          ))}
        {totals && (
          <Table.Row positive>
            <Table.Cell>Totals</Table.Cell>
            <Table.Cell>
              {dataGrouped.reduce((acc, curr) => acc + curr.value, 0)}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
