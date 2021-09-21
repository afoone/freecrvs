import { getByNamesAndBirthDate } from "../../../services/immunization";

export default async (req, res) => {
  const { firstName, lastName, birthDate } = req.query;
  const patient = await getByNamesAndBirthDate(firstName, lastName, birthDate);
  res.json(patient);
};
