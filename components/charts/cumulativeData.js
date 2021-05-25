import moment from "moment";
import { regions } from "../extraData/regions";
import { vaccineStrategy } from "./strategies";

export const calculateCumulativeDate = (data) => {
  const dataWithDates = data
    .filter((i) => i._id.date)
    .map((i) => ({ ...i, date: new Date(i._id.date) }));
  const dateMax = dataWithDates.reduce(
    (acc, curr) => (!acc ? curr.date : acc - curr.date > 0 ? acc : curr.date),
    null
  );
  const dateMin = dataWithDates.reduce(
    (acc, curr) => (!acc ? curr.date : acc - curr.date < 0 ? acc : curr.date),
    null
  );

  let cumulativeArray = [];
  let currentDate = new Date(dateMin.getTime());
  do {
    currentDate = moment(currentDate).add(1, "day");

    cumulativeArray.push({ date: currentDate.format("DD-MM-YYYY") });
  } while (currentDate <= dateMax);
  return cumulativeArray;
};

export const getAllVaccines = (data) => {
  const result = new Set();
  data.forEach((element) => {
    result.add(element._id.nameOfTheVaccine || "Unknown");
  });
  return [...result];
};

export const getAllRegions = () => {
  return regions.map((i) => i.id);
};

export const getCumulativeData = (
  data,
  strategy = vaccineStrategy,
  dateMin,
  dateMax
) => {
  const dataWithDates = data
    .filter((i) => i._id.date)
    .map((i) => ({ ...i, date: new Date(i._id.date) }));
  if (!dateMax)
    dateMax = dataWithDates.reduce(
      (acc, curr) => (!acc ? curr.date : acc - curr.date > 0 ? acc : curr.date),
      null
    );
  if (!dateMin)
    dateMin = dataWithDates.reduce(
      (acc, curr) => (!acc ? curr.date : acc - curr.date < 0 ? acc : curr.date),
      null
    );
  const result = [];
  strategy.getAll(data).forEach((i) => {
    const aResultData = strategy.execute(data, i);

    result.push(...interpolate(aResultData, dateMax, dateMin));
  });
  return result;
};

export const createChartData = (data, dateMin, dateMax, strategy) => {
  const result = [];
  let currentDate = moment(dateMin);
  do {
    const element = {
      name: currentDate.format("YYYY-MM-DD"),
    };
    data
      .filter((i) => i.date === currentDate.format("YYYY-MM-DD"))
      .forEach((i) => (element[i[strategy.field] || "Unknown"] = i.count));
    result.push(element);
    currentDate = currentDate.add(1, "day");
  } while (currentDate < moment(dateMax).add(1, "day"));
  return result;
};

export const interpolate = (data, dateMax, dateMin) => {
  const result = [];
  if (!data || data.length < 1) return result;
  let currentDate = moment(dateMin || data[0].date);
  do {
    const vaccineForToday = data.filter(
      (i) => i.date === currentDate.format("YYYY-MM-DD")
    );
    if (!vaccineForToday || vaccineForToday.length < 1) {
      if (result.length > 0) {
        result.push({
          ...result[result.length - 1],
          date: currentDate.format("YYYY-MM-DD"),
        });
      }
    } else {
      result.push(vaccineForToday[0]);
    }
    currentDate = moment(currentDate).add(1, "day");
  } while (currentDate <= dateMax);
  return result;
};

export const getChartData = (
  data,
  strategy = vaccineStrategy,
  dateMin,
  dateMax
) => {
  const dataWithDates = data
    .filter((i) => i._id.date)
    .map((i) => ({ ...i, date: new Date(i._id.date) }));
  if (!dateMax)
    dateMax = dataWithDates.reduce(
      (acc, curr) => (!acc ? curr.date : acc - curr.date > 0 ? acc : curr.date),
      null
    );
  if (!dateMin)
    dateMin = dataWithDates.reduce(
      (acc, curr) => (!acc ? curr.date : acc - curr.date < 0 ? acc : curr.date),
      null
    );
  const cumulativeData = getCumulativeData(data, strategy, dateMin, dateMax);

  return createChartData(cumulativeData, dateMin, dateMax, strategy);
};
