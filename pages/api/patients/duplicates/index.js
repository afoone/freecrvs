import { getDuplicatesForNIN } from "../../../../services/duplicates";
import { getDuplicatesForBirthDateAndName } from "../../../../services/duplicates";
import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  // const session = await getSession({ req });

  // if (!session) {
  //   res.status(401).json({ msg: "unauthorized" });
  // } else {
  switch (req.method) {
    default:
      const results = await getDuplicatesForNIN();
      //const resultsByDateAndName = await getDuplicatesForBirthDateAndName();
      res.json([...results,]);
      break;
  }
  // }
};
