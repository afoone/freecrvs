import React from "react";
import { Table } from "semantic-ui-react";

const defaultConfig = [
  {
    field: "name",
    header: "Name",
  },
  {
    field: "value",
    header: "Value",
  },
];

const DataTable = ({ title, data, totals, config = defaultConfig }) => {
  // Grouping unkowns
  const dataGrouped = [
    ...data.filter((i) => i.name),
    {
      value: data
        .filter((i) => !i.name)
        .reduce((acc, curr) => acc + curr.value, 0),
    },
  ].filter(
    e => e.value
  )

  return (
    <Table color="blue" celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={config.length}>{title}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          {config.map((i) => (
            <Table.HeaderCell>{i.header}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {dataGrouped
          .sort((a, b) => (a.name?.match(/\w*/g).join("") > b.name?.match(/\w*/g).join("") ? 1 : -1))
          .map((i) => (
            <Table.Row key={i.name}>
              {config.map((element) => (
                <Table.Cell>{i[element.field] || "Unknown"}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        {totals && (
          <Table.Row positive>
            <Table.Cell>Totals</Table.Cell>
            {config
              .filter((i) => i.field !== "name")
              .map((element) => (
                <Table.Cell>
                  {dataGrouped.reduce((acc, curr) => acc + curr[element.field], 0)}
                </Table.Cell>
              ))}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
