import React, { useEffect, useState } from "react";
import AuthHOC from "../../../components/auth/AuthHOC";
import axios from "axios";
import PieChart from "../../../components/charts/PieChart";
import DataTable from "../../../components/charts/DataTable";

const Dashboard = () => {
  const [totalVaccines, setTotalVaccines] = useState([]);

  useEffect(() => {
    axios
      .get("/api/patients/dashboard/total")
      .then((res) =>
        setTotalVaccines(res.data.map((i) => ({ name: i._id, value: i.count })))
      );
  }, []);

  return (
    <AuthHOC>
      <h1>The Gambia COVID-19 Vaccination Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        <DataTable title="Total doses administered" data={totalVaccines} />
        <PieChart data={totalVaccines}></PieChart>
      </div>
    </AuthHOC>
  );
};

export default Dashboard;
