import moment from "moment";

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

export const getCumulativeData = (data, dateMin, dateMax) => {
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
  getAllVaccines(data).forEach((i) => {
    const aVaccineData = getDataFromAVaccineSortedByDate(data, i).map(
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

    result.push(...interpolate(aVaccineData, dateMax, dateMin));
  });
  return result;
};

export const getDataFromAVaccineSortedByDate = (data, name) => {
  return data
    .map((i) => ({
      ...i,
      _id: { ...i._id, nameOfTheVaccine: i._id.nameOfTheVaccine || "Unknown" },
    }))
    .filter((i) => i._id.nameOfTheVaccine === name)
    .sort(sortByDate);
};

export const createChartData = (data, dateMin, dateMax) => {
  const result = [];
  let currentDate = moment(dateMin);
  do {
    const element = {
      name: currentDate.format("YYYY-MM-DD"),
    };
    data
      .filter((i) => i.date === currentDate.format("YYYY-MM-DD"))
      .forEach((i) => (element[i.nameOfTheVaccine || "Unknown"] = i.count));
    result.push(element);
    currentDate = currentDate.add(1, "day");
  } while (currentDate < moment(dateMax).add(1, "day"));
  return result;
};

export const sortByDate = (a, b) => (a._id.date > b._id.date ? 1 : -1);

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

export const getChartData = (data, dateMin, dateMax) => {
  const dataWithDates = data
    .filter((i) => i._id.date)
    .map((i) => ({ ...i, date: new Date(i._id.date) }));
  console.log("data with dates", dataWithDates);
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
  console.log("datemax y min", dateMax, dateMin);
  const cumulativeData = getCumulativeData(data, dateMin, dateMax);
  console.log("cumulative data =", cumulativeData);

  return createChartData(cumulativeData, dateMin, dateMax);
};
