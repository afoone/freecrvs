import { getFirstDoseByPreexistingConditions } from "../../../../services/dashboard";
export default async (req, res) => {
  const results = await getFirstDoseByPreexistingConditions();

  res.json(results.map(
    i => (
      {
        key: i._id.value,
        value: i.count
      }
    )
  ));
};

