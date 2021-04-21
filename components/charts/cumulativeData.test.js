import {
  getChartData,
  createChartData,
  getAllVaccines,
  getCumulativeData,
  getDataFromAVaccineSortedByDate,
  interpolate,
  sortByDate,
} from "./cumulativeData";

const data1 = [
  { _id: { date: "2021-04-13", nameOfTheVaccine: "NovaVax" }, count: 1 },
  { _id: { date: "2021-04-12", nameOfTheVaccine: "Otra" }, count: 5 },
  { _id: { date: "2021-04-14", nameOfTheVaccine: "Otra" }, count: 5 },
  { _id: { date: "2021-04-05", nameOfTheVaccine: "Moderna" }, count: 1 },
  { _id: { date: "2021-04-06", nameOfTheVaccine: "Moderna" }, count: 2 },
];

const dataWhitBlank = [
  { _id: { date: "2021-04-13", nameOfTheVaccine: "NovaVax" }, count: 1 },
  { _id: { date: "2021-04-13", nameOfTheVaccine: "" }, count: 5 },
  { _id: { date: "2021-04-14", nameOfTheVaccine: "" }, count: 5 },
  { _id: { date: "2021-04-05", nameOfTheVaccine: "Moderna" }, count: 1 },
];

describe("get all the chart data", () => {
  test("should generate data without blanks", () => {
    expect(getChartData(data1)).toEqual([
      {
        name: "2021-04-05",
        Moderna: 1,
      },
      {
        name: "2021-04-06",
        Moderna: 3,
      },
      {
        name: "2021-04-07",
        Moderna: 3,
      },
      {
        name: "2021-04-08",
        Moderna: 3,
      },
      {
        name: "2021-04-09",
        Moderna: 3,
      },
      {
        name: "2021-04-10",
        Moderna: 3,
      },
      {
        name: "2021-04-11",
        Moderna: 3,
      },
      {
        name: "2021-04-12",
        Moderna: 3,
        Otra: 5,
      },
      {
        name: "2021-04-13",
        Moderna: 3,
        Otra: 5,
        NovaVax: 1,
      },
      {
        name: "2021-04-14",
        Moderna: 3,
        Otra: 10,
        NovaVax: 1,
      },
    ]);
  });

  test("should generate data with blanks", () => {});
});

describe("calculate accumulated data", () => {
  test("should calculate", () => {
    expect(getCumulativeData(data1)).toContainEqual({
      date: "2021-04-05",
      nameOfTheVaccine: "Moderna",
      count: 1,
    });
    expect(getCumulativeData(data1)).toContainEqual({
      date: "2021-04-06",
      nameOfTheVaccine: "Moderna",
      count: 3,
    });
    expect(getCumulativeData(data1)).toContainEqual({
      date: "2021-04-14",
      nameOfTheVaccine: "Otra",
      count: 10,
    });
  });
  test("should interpolate", () => {
    expect(getCumulativeData(data1)).toContainEqual({
      date: "2021-04-13",
      nameOfTheVaccine: "Otra",
      count: 5,
    });
  });
});

test("should interpolate work", () => {
  expect(
    interpolate(
      [
        { date: "2021-04-03", nameOfTheVaccine: "Moderna", count: 1 },
        { date: "2021-04-06", nameOfTheVaccine: "Moderna", count: 3 },
      ],
      new Date("2021-04-08T00:00:00.000Z")
    )
  ).toEqual([
    { date: "2021-04-03", nameOfTheVaccine: "Moderna", count: 1 },
    { date: "2021-04-04", nameOfTheVaccine: "Moderna", count: 1 },
    { date: "2021-04-05", nameOfTheVaccine: "Moderna", count: 1 },
    { date: "2021-04-06", nameOfTheVaccine: "Moderna", count: 3 },
    { date: "2021-04-07", nameOfTheVaccine: "Moderna", count: 3 },
    { date: "2021-04-08", nameOfTheVaccine: "Moderna", count: 3 },
  ]);
});

test("should create good chart data, one element", () => {
  expect(
    createChartData(
      [
        { date: "2021-04-03", nameOfTheVaccine: "Moderna", count: 1 },
        { date: "2021-04-04", nameOfTheVaccine: "Moderna", count: 1 },
        { date: "2021-04-05", nameOfTheVaccine: "Moderna", count: 1 },
        { date: "2021-04-06", nameOfTheVaccine: "Moderna", count: 3 },
        { date: "2021-04-07", nameOfTheVaccine: "Moderna", count: 3 },
        { date: "2021-04-08", nameOfTheVaccine: "Moderna", count: 3 },
      ],
      new Date("2021-04-03T00:00:00.000Z"),
      new Date("2021-04-08T00:00:00.000Z")
    )
  ).toEqual(
    [
      { name: "2021-04-03", Moderna: 1 },
      { name: "2021-04-04", Moderna: 1 },
      { name: "2021-04-05", Moderna: 1 },
      { name: "2021-04-06", Moderna: 3 },
      { name: "2021-04-07", Moderna: 3 },
      { name: "2021-04-08", Moderna: 3 },
    ],
    new Date("2021-04-03T00:00:00.000Z"),
    new Date("2021-04-08T00:00:00.000Z")
  );
});
describe("full data", () => {
  test("should create good chart data", () => {
    expect(
      createChartData(
        [
          { date: "2021-04-03", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-04", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-05", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-06", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-07", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-08", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-03", nameOfTheVaccine: "Otra", count: 1 },
          { date: "2021-04-04", nameOfTheVaccine: "Otra", count: 1 },
          { date: "2021-04-05", nameOfTheVaccine: "Otra", count: 1 },
          { date: "2021-04-06", nameOfTheVaccine: "Otra", count: 3 },
          { date: "2021-04-07", nameOfTheVaccine: "Otra", count: 3 },
          { date: "2021-04-08", nameOfTheVaccine: "Otra", count: 3 },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z")
      )
    ).toEqual([
      { name: "2021-04-03", Moderna: 1, Otra: 1 },
      { name: "2021-04-04", Moderna: 1, Otra: 1 },
      { name: "2021-04-05", Moderna: 1, Otra: 1 },
      { name: "2021-04-06", Moderna: 3, Otra: 3 },
      { name: "2021-04-07", Moderna: 3, Otra: 3 },
      { name: "2021-04-08", Moderna: 3, Otra: 3 },
    ]);

    expect(
      createChartData(
        [
          { date: "2021-04-03", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-04", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-05", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-06", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-07", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-08", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-05", nameOfTheVaccine: "Otra", count: 3 },
          { date: "2021-04-06", nameOfTheVaccine: "Otra", count: 7 },
          { date: "2021-04-07", nameOfTheVaccine: "Otra", count: 7 },
          { date: "2021-04-08", nameOfTheVaccine: "Otra", count: 7 },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z")
      )
    ).toEqual([
      { name: "2021-04-03", Moderna: 1 },
      { name: "2021-04-04", Moderna: 1 },
      { name: "2021-04-05", Moderna: 1, Otra: 3 },
      { name: "2021-04-06", Moderna: 3, Otra: 7 },
      { name: "2021-04-07", Moderna: 3, Otra: 7 },
      { name: "2021-04-08", Moderna: 3, Otra: 7 },
    ]);
  });
  test("should create good chart data with empty ones", () => {
    expect(
      createChartData(
        [
          { date: "2021-04-03", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-04", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-05", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-06", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-07", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-08", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-03", nameOfTheVaccine: "", count: 1 },
          { date: "2021-04-04", nameOfTheVaccine: "", count: 1 },
          { date: "2021-04-05", nameOfTheVaccine: "", count: 1 },
          { date: "2021-04-06", nameOfTheVaccine: "", count: 3 },
          { date: "2021-04-07", nameOfTheVaccine: "", count: 3 },
          { date: "2021-04-08", nameOfTheVaccine: "", count: 3 },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z")
      )
    ).toEqual([
      { name: "2021-04-03", Moderna: 1, Unknown: 1 },
      { name: "2021-04-04", Moderna: 1, Unknown: 1 },
      { name: "2021-04-05", Moderna: 1, Unknown: 1 },
      { name: "2021-04-06", Moderna: 3, Unknown: 3 },
      { name: "2021-04-07", Moderna: 3, Unknown: 3 },
      { name: "2021-04-08", Moderna: 3, Unknown: 3 },
    ]);

    expect(
      createChartData(
        [
          { date: "2021-04-03", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-04", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-05", nameOfTheVaccine: "Moderna", count: 1 },
          { date: "2021-04-06", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-07", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-08", nameOfTheVaccine: "Moderna", count: 3 },
          { date: "2021-04-05", nameOfTheVaccine: "", count: 3 },
          { date: "2021-04-06", nameOfTheVaccine: "", count: 7 },
          { date: "2021-04-07", nameOfTheVaccine: "", count: 7 },
          { date: "2021-04-08", nameOfTheVaccine: "", count: 7 },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z")
      )
    ).toEqual([
      { name: "2021-04-03", Moderna: 1 },
      { name: "2021-04-04", Moderna: 1 },
      { name: "2021-04-05", Moderna: 1, Unknown: 3 },
      { name: "2021-04-06", Moderna: 3, Unknown: 7 },
      { name: "2021-04-07", Moderna: 3, Unknown: 7 },
      { name: "2021-04-08", Moderna: 3, Unknown: 7 },
    ]);
  });
});

describe("sort by date", () => {
  test("sort by date correctly", () => {
    expect(
      [
        { _id: { date: "2021-04-13", nameOfTheVaccine: "Otra" }, count: 5 },
        { _id: { date: "2021-04-14", nameOfTheVaccine: "Otra" }, count: 5 },
        { _id: { date: "2021-04-05", nameOfTheVaccine: "Moderna" }, count: 1 },
        { _id: { date: "2021-04-06", nameOfTheVaccine: "Moderna" }, count: 2 },
      ].sort(sortByDate)
    ).toStrictEqual([
      { _id: { date: "2021-04-05", nameOfTheVaccine: "Moderna" }, count: 1 },
      { _id: { date: "2021-04-06", nameOfTheVaccine: "Moderna" }, count: 2 },
      { _id: { date: "2021-04-13", nameOfTheVaccine: "Otra" }, count: 5 },
      { _id: { date: "2021-04-14", nameOfTheVaccine: "Otra" }, count: 5 },
    ]);
  });
});

describe("get all vaccines", () => {
  test("get array with all vaccines", () => {
    const result = getAllVaccines(data1);
    expect(result).toContain("NovaVax");
    expect(result).toContain("Otra");
    expect(result).toContain("Moderna");
    expect(result.length).toBe(3);
  });
  test("get array with all vaccines and Unknown if not exists", () => {
    const result = getAllVaccines(dataWhitBlank);
    expect(result).toContain("NovaVax");
    expect(result).toContain("Unknown");
    expect(result).toContain("Moderna");
    expect(result.length).toBe(3);
  });
});

describe("get data from a vaccine sorted by date", () => {
  test("should get data from a vaccine and sorted by date", () => {
    const result = getDataFromAVaccineSortedByDate(
      [
        { _id: { date: "2021-04-06", nameOfTheVaccine: "Moderna" }, count: 2 },
        { _id: { date: "2021-04-13", nameOfTheVaccine: "Otra" }, count: 5 },
        { _id: { date: "2021-04-14", nameOfTheVaccine: "Otra" }, count: 5 },
        { _id: { date: "2021-04-05", nameOfTheVaccine: "Moderna" }, count: 1 },
      ],
      "Moderna"
    );
    expect(result).toStrictEqual([
      { _id: { date: "2021-04-05", nameOfTheVaccine: "Moderna" }, count: 1 },
      { _id: { date: "2021-04-06", nameOfTheVaccine: "Moderna" }, count: 2 },
    ]);
  });
  test("should get data from a vaccine and sorted by date on blanks", () => {
    const result = getDataFromAVaccineSortedByDate(
      [
        { _id: { date: "2021-04-06", nameOfTheVaccine: "" }, count: 2 },
        { _id: { date: "2021-04-13", nameOfTheVaccine: "Otra" }, count: 5 },
        { _id: { date: "2021-04-14", nameOfTheVaccine: "Otra" }, count: 5 },
        { _id: { date: "2021-04-05", nameOfTheVaccine: "" }, count: 1 },
      ],
      "Unknown"
    );
    expect(result).toStrictEqual([
      { _id: { date: "2021-04-05", nameOfTheVaccine: "Unknown" }, count: 1 },
      { _id: { date: "2021-04-06", nameOfTheVaccine: "Unknown" }, count: 2 },
    ]);
  });
})


