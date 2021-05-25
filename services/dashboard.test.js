
import { getFullyVaccinated, getFirstDoseVaccinated } from "./dashboard";






test("get fully vaccinated", async () => {
  const fully = await getFullyVaccinated();
  console.log("fully vaccinated", fully);
  expect(fully).toBeTruthy();
});

test("get partial vaccinated", async () => {
    const fully = await getFirstDoseVaccinated();
    console.log("partial vaccinated", fully);
    expect(fully).toBeTruthy();
  });
