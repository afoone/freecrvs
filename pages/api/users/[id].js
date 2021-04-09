import { update, get } from "../../../services/auth";

export default async (req, res) => {
  //   const { db } = await connectToDatabase();
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      const user = await update(id, req.body);
      res.json(user);
      break;

    default:
      const users = await get(id);
      res.json(users);
      break;
  }
};
