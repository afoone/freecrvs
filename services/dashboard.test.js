
import { getFullyVaccinated, getFirstDoseVaccinated } from "./dashboard";


test("get fully vaccinated", async () => {
  const fully = await getFullyVaccinated();
  expect(fully).toBeTruthy();
});

test("get partial vaccinated", async () => {
    const fully = await getFirstDoseVaccinated();
    expect(fully).toBeTruthy();
  });
