import React, { useEffect, useState } from "react";
import AuthHOC from "../../../components/auth/AuthHOC";
import PieChart from "../../../components/charts/PieChart";
import DataTable from "../../../components/charts/DataTable";
import StackedAreaChart from "../../../components/charts/StackedAreaChart";
import { getSession } from "next-auth/client";
import {
  getAllVaccines,
  getChartData,
} from "../../../components/charts/cumulativeData";
import {
  getTotalDosesByType,
  getTotalDosesByTypeAndDay,
} from "../../../services/dashboard";

const Dashboard = ({
  totalVaccinesByDate = [],
  totalVaccines = [],
  differentVaccines = [],
}) => {
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
        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          <StackedAreaChart
            data={totalVaccinesByDate}
            differentVaccines={differentVaccines}
          />
        </div>
      </div>
    </AuthHOC>
  );
};

export async function getStaticProps(context) {
  const totalVaccinesByDate = await getTotalDosesByType();
  const differentVaccines = getAllVaccines(totalVaccinesByDate);
  const formattedTotalVaccinesByDate = getChartData(totalVaccinesByDate);
  const totalVaccines = await getTotalDosesByTypeAndDay();

  return {
    props: {
      totalVaccinesByDate: formattedTotalVaccinesByDate,
      totalVaccines: totalVaccines.map((i) => ({
        name: i._id,
        value: i.count,
      })),
      differentVaccines,
    },
    revalidate: 3600 * 24,
  };
}

export default Dashboard;
