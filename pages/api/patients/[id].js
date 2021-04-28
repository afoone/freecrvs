import {
  add,
  list,
  deleteImmunization,
  update,
  get,
} from "../../../services/immunization";

export default async (req, res) => {
  //   const { db } = await connectToDatabase();
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      const patient = await update(id, req.body);
      res.json(patient);
      break;

    default:
      const patientResponse = await get(id);
      res.json(patientResponse);
      break;
  }
};
