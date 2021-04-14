import { ObjectId } from "mongodb";
import { connectToDatabase } from "../util/mongodb";

export const getByGender = async () => {
  const { db } = await connectToDatabase();

  return await db
    .collection("vaccination")
    .aggregate([{ $group: { _id: "$gender", count: { $sum: 1 } } }])
    .toArray();
};

// db.getCollection('vaccination').aggregate([
//     {$unwind: "$vaccination"},
//     {$match:
//         {
//              "$or": [
//                 {"vaccination.firstDoseDate": {$ne: null}},
//                 {"vaccination.date": {$ne: null}},
//                ]
//          }
//     },
//     {
//         $group: {
//             _id: "$vaccination.nameOfTheVaccine",
//             count: {
//                 $sum: 1
//             }
//         }
//     }
//     ])
export const getTotalDosesByType = async () => {
  const { db } = await connectToDatabase();
  return await db
    .collection("vaccination")
    .aggregate([
      { $unwind: "$vaccination" },
      {
        $match: {
          $or: [
            { "vaccination.firstDoseDate": { $ne: null } },
            { "vaccination.date": { $ne: null } },
          ],
        },
      },
      {
        $group: {
          _id: "$vaccination.nameOfTheVaccine",
          count: {
            $sum: 1,
          },
        },
      },
    ])
    .toArray();
};
