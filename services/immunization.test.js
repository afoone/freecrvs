import { getByNamesAndBirthDate } from "./immunization";

test("get by names and birthdate", async () => {
  const result = await getByNamesAndBirthDate("LAMIN", "DRAMMEH", "1975-06-11");
  expect(result).toBeTruthy()
});

