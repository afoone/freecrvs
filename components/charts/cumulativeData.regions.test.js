import {
  getChartData,
  createChartData,
  convertRegionNames,
  getCumulativeData,
  interpolate,
  convertRegionItem,
} from "./cumulativeData";

import {
  getDataFromARegionSortedByDate,
  _sortByDate,
  regionStrategy,
} from "./strategies";

const data1 = [
  {
    _id: { date: "2021-04-13", region: "26404eac-3906-479e-b914-4465596f8536" },
    count: 1,
  },
  {
    _id: { date: "2021-04-12", region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b" },
    count: 5,
  },
  {
    _id: { date: "2021-04-14", region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b" },
    count: 5,
  },
  {
    _id: { date: "2021-04-05", region: "658b1c77-a912-4007-9bf5-25226e20a4af" },
    count: 1,
  },
  {
    _id: { date: "2021-04-06", region: "658b1c77-a912-4007-9bf5-25226e20a4af" },
    count: 2,
  },
];

const dataWhitBlank = [
  {
    _id: { date: "2021-04-13", region: "26404eac-3906-479e-b914-4465596f8536" },
    count: 1,
  },
  { _id: { date: "2021-04-13", region: "" }, count: 5 },
  { _id: { date: "2021-04-14", region: "" }, count: 5 },
  {
    _id: { date: "2021-04-05", region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b" },
    count: 1,
  },
];

describe("convert functions", () => {
  test("can convert one item by region", () => {
    expect(
      convertRegionItem({
        name: "2021-02-03",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
      })
    ).toEqual({
      "Western 2": 3,
      name: "2021-02-03",
      "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
    });
  });

  test("can convert several item by region", () => {
    expect(
      convertRegionNames([
        {
          name: "2021-02-03",
          "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        },
      ])
    ).toContainEqual({
      "Western 2": 3,
      name: "2021-02-03",
      "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
    });
  });

  test("can convert several item by region", () => {
    expect(
      convertRegionNames([
        {
          name: "2021-02-03",
          "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        },
        {
          name: "2021-02-03",
          "658b1c77-a912-4007-9bf5-25226e20a4af": 5,
        },
      ])
    ).toContainEqual({
      "Western 2": 5,
      name: "2021-02-03",
      "658b1c77-a912-4007-9bf5-25226e20a4af": 5,
    });
  });
});

describe("calculate accumulated data", () => {
  test("should calculate", () => {
    expect(getCumulativeData(data1, regionStrategy)).toContainEqual({
      date: "2021-04-05",
      region: "658b1c77-a912-4007-9bf5-25226e20a4af",
      count: 1,
    });
    expect(getCumulativeData(data1, regionStrategy)).toContainEqual({
      date: "2021-04-06",
      region: "658b1c77-a912-4007-9bf5-25226e20a4af",
      count: 3,
    });
    expect(getCumulativeData(data1, regionStrategy)).toContainEqual({
      date: "2021-04-14",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 10,
    });
  });
  test("should interpolate", () => {
    expect(getCumulativeData(data1, regionStrategy)).toContainEqual({
      date: "2021-04-13",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 5,
    });
  });
});

describe("get all the chart data", () => {
  test("should generate data without blanks", () => {
    expect(getChartData(data1, regionStrategy)).toEqual([
      {
        name: "2021-04-05",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 1,
      },
      {
        name: "2021-04-06",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
      },
      {
        name: "2021-04-07",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
      },
      {
        name: "2021-04-08",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
      },
      {
        name: "2021-04-09",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
      },
      {
        name: "2021-04-10",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
      },
      {
        name: "2021-04-11",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
      },
      {
        name: "2021-04-12",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 5,
      },
      {
        name: "2021-04-13",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 5,
        "26404eac-3906-479e-b914-4465596f8536": 1,
      },
      {
        name: "2021-04-14",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 10,
        "26404eac-3906-479e-b914-4465596f8536": 1,
      },
    ]);
  });

  test("should generate data with blanks", () => {});
});

test("should interpolate work", () => {
  expect(
    interpolate(
      [
        {
          date: "2021-04-03",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 1,
        },
        {
          date: "2021-04-06",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 3,
        },
      ],
      new Date("2021-04-08T00:00:00.000Z")
    )
  ).toEqual([
    {
      date: "2021-04-03",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 1,
    },
    {
      date: "2021-04-04",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 1,
    },
    {
      date: "2021-04-05",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 1,
    },
    {
      date: "2021-04-06",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 3,
    },
    {
      date: "2021-04-07",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 3,
    },
    {
      date: "2021-04-08",
      region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
      count: 3,
    },
  ]);
});

test("should create good chart data, one element", () => {
  expect(
    createChartData(
      [
        {
          date: "2021-04-03",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 1,
        },
        {
          date: "2021-04-04",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 1,
        },
        {
          date: "2021-04-05",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 1,
        },
        {
          date: "2021-04-06",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 3,
        },
        {
          date: "2021-04-07",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 3,
        },
        {
          date: "2021-04-08",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          count: 3,
        },
      ],
      new Date("2021-04-03T00:00:00.000Z"),
      new Date("2021-04-08T00:00:00.000Z"),
      regionStrategy
    )
  ).toEqual(
    [
      { name: "2021-04-03", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1 },
      { name: "2021-04-04", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1 },
      { name: "2021-04-05", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1 },
      { name: "2021-04-06", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3 },
      { name: "2021-04-07", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3 },
      { name: "2021-04-08", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3 },
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
          {
            date: "2021-04-03",
            region: "658b1c77-a912-4007-9bf5-25226e20a4af",
            count: 1,
          },
          {
            date: "2021-04-04",
            region: "658b1c77-a912-4007-9bf5-25226e20a4af",
            count: 1,
          },
          {
            date: "2021-04-05",
            region: "658b1c77-a912-4007-9bf5-25226e20a4af",
            count: 1,
          },
          {
            date: "2021-04-06",
            region: "658b1c77-a912-4007-9bf5-25226e20a4af",
            count: 3,
          },
          {
            date: "2021-04-07",
            region: "658b1c77-a912-4007-9bf5-25226e20a4af",
            count: 3,
          },
          {
            date: "2021-04-08",
            region: "658b1c77-a912-4007-9bf5-25226e20a4af",
            count: 3,
          },
          {
            date: "2021-04-03",
            region: "45f5b12d-b5aa-494f-adb8-9e5fbff274e1",
            count: 1,
          },
          {
            date: "2021-04-04",
            region: "45f5b12d-b5aa-494f-adb8-9e5fbff274e1",
            count: 1,
          },
          {
            date: "2021-04-05",
            region: "45f5b12d-b5aa-494f-adb8-9e5fbff274e1",
            count: 1,
          },
          {
            date: "2021-04-06",
            region: "45f5b12d-b5aa-494f-adb8-9e5fbff274e1",
            count: 3,
          },
          {
            date: "2021-04-07",
            region: "45f5b12d-b5aa-494f-adb8-9e5fbff274e1",
            count: 3,
          },
          {
            date: "2021-04-08",
            region: "45f5b12d-b5aa-494f-adb8-9e5fbff274e1",
            count: 3,
          },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z"),
        regionStrategy
      )
    ).toEqual([
      {
        name: "2021-04-03",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 1,
        "45f5b12d-b5aa-494f-adb8-9e5fbff274e1": 1,
      },
      {
        name: "2021-04-04",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 1,
        "45f5b12d-b5aa-494f-adb8-9e5fbff274e1": 1,
      },
      {
        name: "2021-04-05",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 1,
        "45f5b12d-b5aa-494f-adb8-9e5fbff274e1": 1,
      },
      {
        name: "2021-04-06",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        "45f5b12d-b5aa-494f-adb8-9e5fbff274e1": 3,
      },
      {
        name: "2021-04-07",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        "45f5b12d-b5aa-494f-adb8-9e5fbff274e1": 3,
      },
      {
        name: "2021-04-08",
        "658b1c77-a912-4007-9bf5-25226e20a4af": 3,
        "45f5b12d-b5aa-494f-adb8-9e5fbff274e1": 3,
      },
    ]);

    expect(
      createChartData(
        [
          { date: "2021-04-03", region: "Moderna", count: 1 },
          { date: "2021-04-04", region: "Moderna", count: 1 },
          { date: "2021-04-05", region: "Moderna", count: 1 },
          { date: "2021-04-06", region: "Moderna", count: 3 },
          { date: "2021-04-07", region: "Moderna", count: 3 },
          { date: "2021-04-08", region: "Moderna", count: 3 },
          { date: "2021-04-05", region: "Otra", count: 3 },
          { date: "2021-04-06", region: "Otra", count: 7 },
          { date: "2021-04-07", region: "Otra", count: 7 },
          { date: "2021-04-08", region: "Otra", count: 7 },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z"),
        regionStrategy
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
          {
            date: "2021-04-03",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 1,
          },
          {
            date: "2021-04-04",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 1,
          },
          {
            date: "2021-04-05",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 1,
          },
          {
            date: "2021-04-06",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 3,
          },
          {
            date: "2021-04-07",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 3,
          },
          {
            date: "2021-04-08",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 3,
          },
          { date: "2021-04-03", region: "", count: 1 },
          { date: "2021-04-04", region: "", count: 1 },
          { date: "2021-04-05", region: "", count: 1 },
          { date: "2021-04-06", region: "", count: 3 },
          { date: "2021-04-07", region: "", count: 3 },
          { date: "2021-04-08", region: "", count: 3 },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z"),
        regionStrategy
      )
    ).toEqual([
      {
        name: "2021-04-03",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1,
        Unknown: 1,
      },
      {
        name: "2021-04-04",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1,
        Unknown: 1,
      },
      {
        name: "2021-04-05",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1,
        Unknown: 1,
      },
      {
        name: "2021-04-06",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3,
        Unknown: 3,
      },
      {
        name: "2021-04-07",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3,
        Unknown: 3,
      },
      {
        name: "2021-04-08",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3,
        Unknown: 3,
      },
    ]);

    expect(
      createChartData(
        [
          {
            date: "2021-04-03",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 1,
          },
          {
            date: "2021-04-04",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 1,
          },
          {
            date: "2021-04-05",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 1,
          },
          {
            date: "2021-04-06",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 3,
          },
          {
            date: "2021-04-07",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 3,
          },
          {
            date: "2021-04-08",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
            count: 3,
          },
          { date: "2021-04-05", region: "", count: 3 },
          { date: "2021-04-06", region: "", count: 7 },
          { date: "2021-04-07", region: "", count: 7 },
          { date: "2021-04-08", region: "", count: 7 },
        ],
        new Date("2021-04-03T00:00:00.000Z"),
        new Date("2021-04-08T00:00:00.000Z"),
        regionStrategy
      )
    ).toEqual([
      { name: "2021-04-03", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1 },
      { name: "2021-04-04", "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1 },
      {
        name: "2021-04-05",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 1,
        Unknown: 3,
      },
      {
        name: "2021-04-06",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3,
        Unknown: 7,
      },
      {
        name: "2021-04-07",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3,
        Unknown: 7,
      },
      {
        name: "2021-04-08",
        "f8de42cf-b52f-4a7c-b08a-5a36f75d877b": 3,
        Unknown: 7,
      },
    ]);
  });
});

describe("sort by date", () => {
  test("sort by date correctly", () => {
    expect(
      [
        {
          _id: {
            date: "2021-04-13",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 5,
        },
        {
          _id: {
            date: "2021-04-14",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 5,
        },
        {
          _id: {
            date: "2021-04-05",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 1,
        },
        {
          _id: {
            date: "2021-04-06",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 2,
        },
      ].sort(_sortByDate)
    ).toStrictEqual([
      {
        _id: {
          date: "2021-04-05",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
        },
        count: 1,
      },
      {
        _id: {
          date: "2021-04-06",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
        },
        count: 2,
      },
      {
        _id: {
          date: "2021-04-13",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
        },
        count: 5,
      },
      {
        _id: {
          date: "2021-04-14",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
        },
        count: 5,
      },
    ]);
  });
});

describe("get data from a vaccine sorted by date", () => {
  test("should get data from a vaccine and sorted by date", () => {
    const result = getDataFromARegionSortedByDate(
      [
        {
          _id: {
            date: "2021-04-06",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 2,
        },
        { _id: { date: "2021-04-13", region: "Otra" }, count: 5 },
        { _id: { date: "2021-04-14", region: "Otra" }, count: 5 },
        {
          _id: {
            date: "2021-04-05",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 1,
        },
      ],
      "f8de42cf-b52f-4a7c-b08a-5a36f75d877b"
    );
    expect(result).toStrictEqual([
      {
        _id: {
          date: "2021-04-05",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
        },
        count: 1,
      },
      {
        _id: {
          date: "2021-04-06",
          region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
        },
        count: 2,
      },
    ]);
  });
  test("should get data from a vaccine and sorted by date on blanks", () => {
    const result = getDataFromARegionSortedByDate(
      [
        { _id: { date: "2021-04-06", region: "" }, count: 2 },
        {
          _id: {
            date: "2021-04-13",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 5,
        },
        {
          _id: {
            date: "2021-04-14",
            region: "f8de42cf-b52f-4a7c-b08a-5a36f75d877b",
          },
          count: 5,
        },
        { _id: { date: "2021-04-05", region: "" }, count: 1 },
      ],
      "Unknown"
    );
    expect(result).toStrictEqual([
      { _id: { date: "2021-04-05", region: "Unknown" }, count: 1 },
      { _id: { date: "2021-04-06", region: "Unknown" }, count: 2 },
    ]);
  });
});
