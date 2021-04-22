import React from "react";
import AuthHOC from "../../../components/auth/AuthHOC";
import PieChart from "../../../components/charts/PieChart";
import DataTable from "../../../components/charts/DataTable";
import StackedAreaChart from "../../../components/charts/StackedAreaChart";
import cache from "memory-cache";
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
  date = "",
}) => {
  const lastUpdated = new Date(date);
  return (
    <AuthHOC>
      <h1>The Gambia COVID-19 Vaccination Dashboard</h1>
      <h3>Last updated: {lastUpdated.toLocaleString()}</h3>
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

export async function getServerSideProps() {
  if (!cache.get("date")) cache.put("date", new Date(), 1000 * 3600 * 24);
  console.log("set date", cache.get("date"));
  if (!cache.get("totalVaccinesByDate"))
    cache.put(
      "totalVaccinesByDate",
      await getTotalDosesByTypeAndDay(),
      1000 * 3600 * 24
    );
  const totalVaccinesByDate = cache.get("totalVaccinesByDate"); //await getTotalDosesByTypeAndDay();
  console.log("get vaccines by date", totalVaccinesByDate);
  const differentVaccines = getAllVaccines(totalVaccinesByDate);
  console.log("different vaccines", differentVaccines);
  if (!cache.get("formattedTotalVaccinesByDate"))
    cache.put(
      "formattedTotalVaccinesByDate",
      await getChartData(
        totalVaccinesByDate,
        new Date("2021-02-01"),
        new Date()
      ),
      1000 * 3600 * 24
    );
  const formattedTotalVaccinesByDate = cache.get(
    "formattedTotalVaccinesByDate"
  );
  const totalVaccines = await getTotalDosesByType();

  return {
    props: {
      totalVaccinesByDate: formattedTotalVaccinesByDate,
      totalVaccines: totalVaccines.map((i) => ({
        name: i._id,
        value: i.count,
      })),
      differentVaccines,
      date: cache.get("date").toISOString(),
    },
  };
}

export default Dashboard;
