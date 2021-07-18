import { mergeDuplicates } from "../../../../services/duplicates";
import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  // const { db } = await connectToDatabase();
  const session = await getSession({ req });
  // const token = await jwt.getToken({ req, secret });

  // if (!session) {
  //   res.status(401).json({ msg: "unauthorized" });
  // } else {
  switch (req.method) {
    case "POST":
      const { _count, _getpagesoffset } = req.query;
      const patientsToMerge = req.body
      console.log(patientsToMerge)
      const results = await mergeDuplicates(patientsToMerge);
      console.log(results);
      res.json(results);
      break;
    default:
      res.json({ msg: "Method not allowed" });
  }
  // }
};
