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
      console.log(patient);
      res.json(patient);
      break;

    default:
      const patients = await get(id);
      console.log("patients", patients);
      res.json(patients);
      break;
  }

  //   if (req.method === "PUT") {
  //     // Process a POST request
  //     const patient = await db
  //       .collection("patients")
  //       .update({ _id: id }, req.body);
  //     res.status(200).json(patient);
  //   } else {
  //     // Handle any other HTTP method
  //     console.log("retrieving id", id);
  //     const patient = await db.collection("patients").findOne({ _id: id });

  //     res.json(patient);
  //   }
};
