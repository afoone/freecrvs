import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();


  if (req.method === 'POST') {
    // Process a POST request
    const patient = await db.collection("patients").insertOne(req.body)
    res.json(patient.ops[0])

  } else {
    // Handle any other HTTP method
    const patients = await db
      .collection("patients")
      .find({})
      .limit(20)
      .toArray();

    res.json(patients);
  }



};