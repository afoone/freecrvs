import {
  add,
  list,
  deleteImmunization,
  update,
  get,
} from "../../../services/immunization";

export default async (req, res) => {
  // const { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      const patient = await add(req.body);
      console.log(patient);
      res.json(patient);
      break;

    default:
      const patients = await list();
      console.log("patients", patients);
      res.json(patients);
      break;
  }
};
