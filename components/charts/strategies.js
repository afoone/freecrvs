import { getAllRegions, getAllVaccines } from "./cumulativeData";

export const vaccineStrategy = {
  field: "nameOfTheVaccine",
  getAll: (data)=>getAllVaccines(data),
  execute: (data, i) => {
    return getDataFromAVaccineSortedByDate(data, i).map(
      (element, index, arr) => {
        return {
          date: element._id.date,
          nameOfTheVaccine: i,
          count: arr
            .slice(0, index)
            .reduce((acc, curr) => acc + curr.count, element.count),
        };
      }
    );
  },
};

export const getDataFromAVaccineSortedByDate = (data, name) => {
  return data
    .map((i) => ({
      ...i,
      _id: { ...i._id, nameOfTheVaccine: i._id.nameOfTheVaccine || "Unknown" },
    }))
    .filter((i) => i._id.nameOfTheVaccine === name)
    .sort(_sortByDate);
};

export const regionStrategy = {
  field: "region",
  getAll: ()=> getAllRegions(),
  execute: (data, i) => {
    return getDataFromARegionSortedByDate(data, i).map(
      (element, index, arr) => {
        return {
          date: element._id.date,
          region: i,
          count: arr
            .slice(0, index)
            .reduce((acc, curr) => acc + curr.count, element.count),
        };
      }
    );
  },
};

export const getDataFromARegionSortedByDate = (data, name) => {
  return data
    .map((i) => ({
      ...i,
      _id: { ...i._id, region: i._id.region || "Unknown" },
    }))
    .filter((i) => i._id.region === name)
    .sort(_sortByDate);
};

export const _sortByDate = (a, b) => (a._id.date > b._id.date ? 1 : -1);
