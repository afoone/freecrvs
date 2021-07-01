import { getSecondDoseByPreexistingConditions } from "../../../../services/dashboard";
export default async (req, res) => {
  const results = await getSecondDoseByPreexistingConditions();

  res.json(results.map(
    i => (
      {
        key: i._id.value,
        value: i.count
      }
    )
  ));
};

