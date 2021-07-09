import React, { useEffect, useState } from "react";
import {
  preexistingConditions,
  priorityGroups,
} from "../../../components/extraData/multiselect";

import axios from "axios";
import { regions } from "../../../components/extraData/regions";

import { Label } from "semantic-ui-react";
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
  getAllRegionsNames,
  convertRegionNames,
  getAllVaccines,
  getChartData,
} from "../../../components/charts/cumulativeData";
import {
  getTotalDosesByType,
  getTotalDosesByTypeAndDay,
  getTotalDosesByRegionAndDay,
  getFirstDoseVaccinated,
  getFullyVaccinated,
} from "../../../services/dashboard";
import { use } from "ast-types";

const Dashboard = ({
  totalVaccinesByDate = [],
  totalVaccinesByRegion = [],
  totalVaccines = [],
  differentVaccines = [],
  differentRegions = [],
  vaccinatedTotals = {},
  date = "",
}) => {
  const lastUpdated = new Date(date);
  const [totalByPriorityGroups, setTotalByPriorityGroups] = useState([]);
  const [totalByPreexistingConditions, setTotalByPreexistingConditions] =
    useState([]);
  const [totalByAge, setTotalByAge] = useState([]);
  const [fullyByPreexistingConditions, setFullyByPreexistingConditions] =
    useState([]);
  const [fullyByPriorityGroups, setFullyByPriorityGroups] = useState([]);
  useEffect(() => {
    axios.get(`/api/patients/dashboard/totalByPriorityGroups`).then((res) => {
      setTotalByPriorityGroups(res.data);
    });
    axios
      .get(`/api/patients/dashboard/totalByPreexistingConditions`)
      .then((res) => {
        setTotalByPreexistingConditions(res.data);
      });
    axios.get(`/api/patients/dashboard/totalByAge`).then((res) => {
      setTotalByAge(res.data);
    });
    axios
      .get(`/api/patients/dashboard/fullyByPreexistingConditions`)
      .then((res) => {
        setFullyByPreexistingConditions(res.data);
      });
    axios.get(`/api/patients/dashboard/fullyByPriorityGroups`).then((res) => {
      setFullyByPriorityGroups(res.data);
    });
  }, []);

  return (
    <AuthHOC>
      <h1>The Gambia COVID-19 Vaccination Dashboard</h1>
      <h3>Last updated: {lastUpdated.toLocaleString()}</h3>
      {/* <h3>
        Fully Vaccinated: {vaccinatedTotals.fully}. Partial:{" "}
        {vaccinatedTotals.partial}
      </h3> */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridTemplateRows:
            "auto auto auto auto auto auto auto 30rem 30rem auto auto",
          gap: "1rem",
        }}
      >
        <Label
          color="teal"
          tag
          size="huge"
          class="ui header"
          style={{
            gridColumn: "1/3",
            display: "flex",
            justifyContent: "center",
          }}
        >
          First Dose Vaccinated
        </Label>

        <DataTable
          title="First Dose Vaccinated By Region"
          data={vaccinatedTotals.partial.map((i) => ({
            name: i.id,
            value: i.count,
          }))}
          config={[
            {
              field: "name",
              header: "Region's Name",
            },
            {
              field: "value",
              header: "Vaccinated People",
            },
          ]}
          totals
        />
        <DataTable
          title="Age Range"
          data={totalByAge.map((i) => ({
            name: i.key,
            value: i.value,
          }))}
          config={[
            {
              field: "name",
              header: "Age",
            },
            {
              field: "value",
              header: "Vaccinated",
            },
          ]}
        />
        <DataTable
          title="Priority Groups"
          data={totalByPriorityGroups.map((i) => ({
            name: i.key,
            value: i.value,
          }))}
          config={[
            {
              field: "name",
              header: "Name",
            },
            {
              field: "value",
              header: "Value",
            },
          ]}
        />
        <DataTable
          title="Preexisting conditions"
          data={totalByPreexistingConditions.map((i) => ({
            name: i.key,
            value: i.value,
          }))}
        />
        <Label
          color="green"
          tag
          size="huge"
          class="ui header"
          style={{
            gridColumn: "1/3",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Fully Vaccinated
        </Label>
        <DataTable
          title="Fully Vaccinated By Region"
          data={vaccinatedTotals.fully.map((i) => {
            const totalP = regions.filter((region) => region.id === i._id)[0]
              ? regions.filter((region) => region.id === i._id)[0].population
              : 0;
            return {
              name: i.id,
              value: i.count,
              totalPopulation: totalP,
              percentage:
                totalP && Math.ceil((100 * 100 * i.count) / totalP) / 100 + "%",
            };
          })}
          config={[
            {
              field: "name",
              header: "Region's Name",
            },
            {
              field: "totalPopulation",
              header: "Total Population",
            },
            {
              field: "value",
              header: "Vaccinated People",
            },
            {
              field: "percentage",
              header: "Percentage of Vaccinated People",
            },
          ]}
        />
        <DataTable
          title="Priority Groups"
          data={fullyByPriorityGroups.map((i) => ({
            name: i.key,
            value: i.value,
          }))}
          config={[
            {
              field: "name",
              header: "Name",
            },
            {
              field: "value",
              header: "Value",
            },
          ]}
        />
        <DataTable
          title="Preexisting conditions"
          data={fullyByPreexistingConditions.map((i) => ({
            name: i.key,
            value: i.value,
          }))}
        />
        <Label
          size="huge"
          class="ui header"
          style={{
            gridColumn: "1/3",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Total doses
        </Label>
        <DataTable title="Total doses administered" data={totalVaccines} />
        <PieChart data={totalVaccines}></PieChart>
        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          <Label
            size="huge"
            class="ui header"
            style={{
              marginTop: "10%",
              gridColumn: "1/3",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Total vaccines by date
          </Label>

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
  const differentRegions = getAllRegionsNames();

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
        new Date()
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
  const vaccinatedTotals = {
    fully: await getFullyVaccinated(),
    partial: await getFirstDoseVaccinated(),
  };

  console.log("vaccinatedTotals", vaccinatedTotals);

  return {
    props: {
      totalVaccinesByRegion: convertRegionNames(formattedTotalVaccinesByRegion),
      totalVaccinesByDate: formattedTotalVaccinesByDate,
      differentRegions,
      totalVaccines: totalVaccines.map((i) => ({
        name: i._id,
        value: i.count,
      })),
      differentVaccines,
      date: cache.get("date").toISOString(),
      vaccinatedTotals,
    },
  };
}

export default Dashboard;
