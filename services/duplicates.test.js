import {
  createMergedObject,
  mergeVaccinations,
  isDuplicate,
} from "./duplicates";

describe("mergeVaccinations", () => {
  test("merge different", () => {
    expect(
      mergeVaccinations([{ firstDoseDate: "A" }], [{ firstDoseDate: "B" }])
    ).toEqual([{ firstDoseDate: "A" }, { firstDoseDate: "B" }]);
  });

  test("merge equal", () => {
    expect(
      mergeVaccinations([{ firstDoseDate: "A" }], [{ firstDoseDate: "A" }])
    ).toEqual([{ firstDoseDate: "A" }]);
  });

  test("merge different with more than one", () => {
    expect(
      mergeVaccinations(
        [{ firstDoseDate: "A" }],
        [{ firstDoseDate: "A" }, { firstDoseDate: "B" }]
      )
    ).toEqual([{ firstDoseDate: "A" }, { firstDoseDate: "B" }]);
  });

  test("merge equal with more than one", () => {
    expect(
      mergeVaccinations(
        [{ firstDoseDate: "A" }, { firstDoseDate: "B" }],
        [{ firstDoseDate: "A" }, { firstDoseDate: "B" }]
      )
    ).toEqual([{ firstDoseDate: "A" }, { firstDoseDate: "B" }]);
  });
});

describe("create merged object", () => {
  test("empty array returns empty object", () => {
    expect(createMergedObject([])).toEqual({});
  });

  test("merge firstName if exists", () => {
    expect(
      createMergedObject([{ firstName: "A" }, { firstName: "A" }]).firstName
    ).toBe("A");
    expect(createMergedObject([{ firstName: "A" }, {}]).firstName).toBe("A");
    expect(createMergedObject([{}, { firstName: "A" }]).firstName).toBe("A");
  });

  test("merge lastName if exists", () => {
    expect(
      createMergedObject([{ lastName: "A" }, { lastName: "A" }]).lastName
    ).toBe("A");
    expect(createMergedObject([{ lastName: "A" }, {}]).lastName).toBe("A");
    expect(createMergedObject([{}, { lastName: "A" }]).lastName).toBe("A");
  });

  test("merge middleName if exists", () => {
    expect(
      createMergedObject([{ middleName: "A" }, { middleName: "A" }]).middleName
    ).toBe("A");
    expect(createMergedObject([{ middleName: "A" }, {}]).middleName).toBe("A");
    expect(createMergedObject([{}, { middleName: "A" }]).middleName).toBe("A");
  });

  test("merge middleName if exists", () => {
    expect(
      createMergedObject([{ middleName: "A" }, { middleName: "A" }]).middleName
    ).toBe("A");
    expect(createMergedObject([{ middleName: "A" }, {}]).middleName).toBe("A");
    expect(createMergedObject([{}, { middleName: "A" }]).middleName).toBe("A");
  });

  test("merge vaccination empty if all are empty", () => {
    expect(
      createMergedObject([{ vaccination: [] }, { vaccination: [] }]).vaccination
    ).toEqual([]);
  });

  test("merge vaccination on same if are equal", () => {
    expect(
      createMergedObject([
        { vaccination: [{ firstDoseDate: "A" }] },
        { vaccination: [{ firstDoseDate: "A" }] },
      ]).vaccination
    ).toEqual([{ firstDoseDate: "A" }]);
  });

  test("merge vaccination if different", () => {
    expect(
      createMergedObject([
        { vaccination: [{ firstDoseDate: "A" }] },
        { vaccination: [{ firstDoseDate: "B" }] },
      ]).vaccination
    ).toEqual([{ firstDoseDate: "A" }, { firstDoseDate: "B" }]);
  });

  test("merge vaccination on same if are equal", () => {
    expect(
      createMergedObject([
        { vaccination: [{ firstDoseDate: "A" }] },
        { vaccination: [{ firstDoseDate: "A" }] },
      ]).vaccination
    ).toEqual([{ firstDoseDate: "A" }]);
  });
});

test("comparison between duplicates", () => {
  expect(isDuplicate({ nin: "A" }, { nin: "A" })).toBe(true);
  expect(isDuplicate({ nin: "B" }, { nin: "A" })).toBe(false);
  expect(isDuplicate({ nin: undefined }, { nin: "A" })).toBe(false);
  expect(isDuplicate({ firstName: "A" , lastName: "B", dateOfBirth: "X"}, { firstName: "A" , lastName: "B", dateOfBirth: "X"})).toBe(true);
  expect(isDuplicate({ firstName: "A" , lastName: "B", dateOfBirth: "Y"}, { firstName: "A" , lastName: "B", dateOfBirth: "X"})).toBe(false);
  expect(isDuplicate({ firstName: "A" , lastName: "B", dateOfBirth: undefined}, { firstName: "A" , lastName: "B", dateOfBirth: "X"})).toBe(true);
});
