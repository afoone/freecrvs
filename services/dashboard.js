import { ObjectId } from "mongodb";

import { connectToDatabase } from "../util/mongodb";

export const getByGender = async () => {
  const { db } = await connectToDatabase();

  return await db
    .collection("vaccination")
    .aggregate([{ $group: { _id: "$gender", count: { $sum: 1 } } }])
    .toArray();
};

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


export const getTotalDosesByTypeAndDay = async () => {
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
        $project: {
            newdate: { $substr: [{ $ifNull: [ "$vaccination.date", "$vaccination.firstDoseDate" ] }, 0, 10 ]},
            nameOfTheVaccine: "$vaccination.nameOfTheVaccine"
        }
    },
         
           {
        $group: {
          _id: {date:"$newdate", nameOfTheVaccine: "$nameOfTheVaccine"},
          count: {
            $sum: 1,
          },
        },
      },

      
    ])
    .toArray();
};
