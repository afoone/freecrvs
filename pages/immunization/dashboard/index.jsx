import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import AuthHOC from "../../../components/auth/AuthHOC";
import axios from "axios";

const Dashboard = () => {
  const [totalVaccines, setTotalVaccines] = useState([]);

  useEffect(() => {
    axios
      .get("/api/patients/dashboard/total")
      .then((res) => setTotalVaccines(res.data));
  }, []);

  return (
    <AuthHOC>
      <h1>The Gambia COVID-19 Vaccination Dashboard</h1>

      <Table celled>
        <Table.Header>
          <Table.Row  >
            <Table.HeaderCell  >Total vaccines given</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Vaccine</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {totalVaccines.map((i) => (
            <Table.Row>
              <Table.Cell>{i._id || "Unknown"}</Table.Cell>
              <Table.Cell>{i.count}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </AuthHOC>
  );
};

export default Dashboard;
