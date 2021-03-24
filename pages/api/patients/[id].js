import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const { id } = req.query

    if (req.method === 'PUT') {
        // Process a POST request
        const patient = await db.collection("patients").update({ _id: id }, req.body)
        res.status(200).json(patient)

    } else {
        // Handle any other HTTP method
        const patient = await db
            .collection("patients")
            .findOne({ _id: id });

        res.json(patient);
    }

};