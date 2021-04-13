import { add, list } from "../../../services/immunization";
import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";

const secret = process.env.JWT_KEY;

export default async (req, res) => {
  // const { db } = await connectToDatabase();
  const session = await getSession({ req });
  // const token = await jwt.getToken({ req, secret });
  console.log("session", session);
  if (!session) {
    res.status(401).json({ msg: "unauthorized" });
  } else {
    switch (req.method) {
      case "POST":
        const patient = await add(req.body);
        console.log(patient);
        res.json(patient);
        break;

      default:
        const { _count, _getpagesoffset } = req.query;
        const patients = await list(_getpagesoffset, _count);
        res.json(patients);
        break;
    }
  }
};
