import React from "react";
import AuthHOC from "../../../components/auth/AuthHOC";
import PieChart from "../../../components/charts/PieChart";
import DataTable from "../../../components/charts/DataTable";
import StackedAreaChart from "../../../components/charts/StackedAreaChart";
import cache from "memory-cache";
import {
  regionStrategy,
  vaccineStrategy,
} from "../../../components/charts/strategies";
import {
  getAllRegions,
  getAllVaccines,
  getChartData,
} from "../../../components/charts/cumulativeData";
import {
  getTotalDosesByType,
  getTotalDosesByTypeAndDay,
  getTotalDosesByRegionAndDay,
} from "../../../services/dashboard";

const Dashboard = ({
  totalVaccinesByDate = [],
  totalVaccinesByRegion = [],
  totalVaccines = [],
  differentVaccines = [],
  differentRegions = [],
  date = "",
}) => {
  const lastUpdated = new Date(date);

  console.log(
    "total vaccines by region",
    totalVaccinesByRegion,
    "different regions",
    differentRegions
  );
  return (
    <AuthHOC>
      <h1>The Gambia COVID-19 Vaccination Dashboard</h1>
      <h3>Last updated: {lastUpdated.toLocaleString()}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridTemplateRows: "auto auto 30rem 30rem auto auto",
          gap: "1rem",
        }}
      >
        <h1 class="ui header" style={{ gridColumn: "1/3" }}>
          Total doses
        </h1>
        <DataTable title="Total doses administered" data={totalVaccines} />
        <PieChart data={totalVaccines}></PieChart>
        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          <h1 class="ui header" style={{ gridColumn: "1/3" }}>
            Total vaccines by date
          </h1>

          <StackedAreaChart
            data={totalVaccinesByDate}
            differentVaccines={differentVaccines}
          />
          <StackedAreaChart
            data={totalVaccinesByRegion}
            differentVaccines={differentRegions}
          />
        </div>
      </div>
    </AuthHOC>
  );
};

export async function getServerSideProps() {
  if (!cache.get("date")) cache.put("date", new Date(), 1000 * 3600 * 24);
  if (!cache.get("totalVaccinesByDate"))
    cache.put(
      "totalVaccinesByDate",
      await getTotalDosesByTypeAndDay(),
      1000 * 3600 * 24
    );
  if (!cache.get("totalVaccinesByRegion"))
    cache.put(
      "totalVaccinesByRegion",
      await getTotalDosesByRegionAndDay(),
      1000 * 3600 * 24
    );
  const totalVaccinesByDate = cache.get("totalVaccinesByDate"); //await getTotalDosesByTypeAndDay();
  const totalVaccinesByRegion = cache.get("totalVaccinesByRegion");

  console.log("total vaccines by region is...", totalVaccinesByRegion);

  const differentVaccines = getAllVaccines(totalVaccinesByDate);
  const differentRegions = getAllRegions();

  if (!cache.get("formattedTotalVaccinesByDate"))
    cache.put(
      "formattedTotalVaccinesByDate",
      await getChartData(
        totalVaccinesByDate,
        vaccineStrategy,
        new Date("2021-02-01"),
        new Date()
      ),
      1000 * 3600 * 24
    );
  if (!cache.get("formattedTotalVaccinesByRegion"))
    cache.put(
      "formattedTotalVaccinesByRegion",
      await getChartData(
        totalVaccinesByRegion,
        regionStrategy,
        new Date("2021-02-01"),
        new Date(),
      ),
      1000 * 3600 * 24
    );
  const formattedTotalVaccinesByDate = cache.get(
    "formattedTotalVaccinesByDate"
  );
  const formattedTotalVaccinesByRegion = cache.get(
    "formattedTotalVaccinesByRegion"
  );
  const totalVaccines = await getTotalDosesByType();

  return {
    props: {
      totalVaccinesByRegion: formattedTotalVaccinesByRegion,
      totalVaccinesByDate: formattedTotalVaccinesByDate,
      differentRegions,
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
