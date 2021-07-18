import { ObjectId } from "mongodb";

import { connectToDatabase } from "../util/mongodb";

export const getDuplicatesForNIN = async () => {
  console.log("connectind db")
  const { db } = await connectToDatabase();
  
  const duplicates = await db
    .collection("vaccination")
    .aggregate([
      { $match: { NIN: { $exists: true, $not: { $size: 0 } } } },
      {
        $group: {
          _id: "$NIN",
          count: { $sum: 1 },
          documents: { $push: "$$ROOT" },
        },
      },
      { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
      { $project: { nin: "$_id", _id: "$count", documents: "$documents" } },
    ], { allowDiskUse: true })
    .toArray();
  console.log("duplicates", duplicates);
  return duplicates.filter((i) => i.nin && i.nin.length > 5);
};

export const mergeDuplicates = async (duplicates) => {
  const { db } = await connectToDatabase();
  if (!duplicates || !duplicates.length) {
    return [];
  }
  duplicates.forEach((e, index) => {
    if (index) {
      db.collection("vaccination").deleteOne({ _id: new ObjectId(e._id) });
    }
  });
};
