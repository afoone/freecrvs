import {
  getFullyVaccinated,
  getFirstDoseVaccinated,
  getTotalDosesByPriorityGroup,
  getTotalDosesByPreexistingConditions,
} from "./dashboard";

test("get fully vaccinated", async () => {
  const fully = await getFullyVaccinated();
  expect(fully).toBeTruthy();
});

test("get partial vaccinated", async () => {
  const fully = await getFirstDoseVaccinated();
  expect(fully).toBeTruthy();
});

test("get vaccinated by priority group", async () => {
  const priority = await getTotalDosesByPriorityGroup();
  expect(priority).toBeTruthy();
});

test("get vaccines by preexisting conditios", async () => {
  const priority = await getTotalDosesByPreexistingConditions();
  expect(priority).toBeTruthy();
});
