import { getTotalDosesByType } from "../../../../services/dashboard";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  // if (!session) {
  //   res.status(401).json({ msg: "unauthorized" });
  // } else {
    const results = await getTotalDosesByType();
    res.json(results);
  // }
};
