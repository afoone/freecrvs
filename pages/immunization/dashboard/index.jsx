import React, { useEffect, useState } from "react";
import AuthHOC from "../../../components/auth/AuthHOC";
import axios from "axios";
import PieChart from "../../../components/charts/PieChart";
import DataTable from "../../../components/charts/DataTable";
import StackedAreaChart from "../../../components/charts/StackedAreaChart";

const Dashboard = () => {
  const [totalVaccines, setTotalVaccines] = useState([]);
  const [totalVaccinesByDate, setTotalVaccinesByDate] = useState([]);

  useEffect(() => {
    axios
      .get("/api/patients/dashboard/total")
      .then((res) =>
        setTotalVaccines(res.data.map((i) => ({ name: i._id, value: i.count })))
      );
    axios.get("/api/patients/dashboard/totalByDay").then((res) =>
      setTotalVaccinesByDate(
        res.data
        // res.data.map((i) => ({
        //   name: i._id.nameOfTheVaccine,
        //   date: i._id.date,
        //   value: i.count,
        // }))
      )
    );
  }, []);

  return (
    <AuthHOC>
      <h1>The Gambia COVID-19 Vaccination Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridTemplateRows: "auto 30rem auto auto",
          gap: "1rem",
        }}
      >
        <DataTable title="Total doses administered" data={totalVaccines} />
        <PieChart data={totalVaccines}></PieChart>
        {/* <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          <StackedAreaChart data={totalVaccinesByDate} />
        </div> */}
      </div>
    </AuthHOC>
  );
};

export default Dashboard;
