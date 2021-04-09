import React from "react";
import { countries } from "./countries";
import { facilities } from "./facilities";
import { districts } from "./districts";
import { regions as provinces } from "./regions";

const filterLocations = (locationsObject) => {
  const locationsArray = Object.keys(locationsObject).map((k) => ({
    id: locationsObject[k].id,
    name: locationsObject[k].name,
    partOf: locationsObject[k].partOf,
  }));
  provinces = locationsArray.filter((l) => l.partOf === "Location/0");
  districts = locationsArray.filter((l) => l.partOf !== "Location/0");
};

export const getProvincesOptions = () =>
  provinces
    .sort((i, j) => (i.name > j.name ? 1 : -1))
    .map((f) => (
      <option key={f.id} value={f.id}>
        {f.name}
      </option>
    ));

export const getDistrictOptions = (province) =>
  districts
    .filter((d) => d.partOf === `Location/${province}`)
    .sort((i, j) => (i.name > j.name ? 1 : -1))
    .map((f) => (
      <option key={f.id} value={f.id}>
        {f.name}
      </option>
    ));

export const getNationalityOptions = () =>
  countries.map((i) => (
    <option key={i.code} value={i.code}>
      {i.name}
    </option>
  ));

export const getFacilitiesOptions = () => {
  return facilities
    .sort((i, j) => (i.name > j.name ? 1 : -1))
    .map((f) => (
      <option key={f.id} value={f.id}>
        {f.name}
      </option>
    ));
};
