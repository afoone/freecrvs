import { connectToDatabase } from "../util/mongodb";
import { regions } from "../components/extraData/regions";

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
            { "vaccination.nameOfTheVaccine": { $ne: null } },
            { "vaccination.dateOfNextVisit": { $ne: null } },
            { "vaccination.vaccinatorFullName": { $ne: null } },
            { "vaccination.expiryDate": { $ne: null } },
            { "vaccination.batchNumber": { $ne: null } },
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

export const getFirstDoseByAge = async () => {
  const { db } = await connectToDatabase();
  return await db
    .collection("vaccination")
    .aggregate([
      {
        $group: {
          _id: "$age",
          count: {
            $sum: 1,
          },
        },
      },
    ])
    .toArray();
};

export const getFirstDoseByPreexistingConditions = async () => {
  const { db } = await connectToDatabase();
  return await db
    .collection("vaccination")
    .aggregate([
      {
        $unwind: "$preexistingConditions",
      },

      {
        $match: {
          "preexistingConditions.value": { $ne: "None" },
        },
      },

      {
        $group: {
          _id: { value: "$preexistingConditions.value" },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();
};

export const getFirstDoseByPriorityGroups = async () => {
  const { db } = await connectToDatabase();
  return await db
    .collection("vaccination")
    .aggregate([
      {
        $unwind: "$priorityGroups",
      },
      {
        $group: {
          _id: { value: "$priorityGroups.value" },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();
};

export const getSecondDoseByPreexistingConditions = async () => {
  const { db } = await connectToDatabase();
  return await db
    .collection("vaccination")
    .aggregate([
      { $match: { "vaccination.1.nameOfTheVaccine": { $exists: true } } },
      {
        $unwind: "$preexistingConditions",
      },

      {
        $match: {
          "preexistingConditions.value": { $ne: "None" },
        },
      },

      {
        $group: {
          _id: { value: "$preexistingConditions.value" },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();
};

export const getSecondDoseByPriorityGroups = async () => {
  const { db } = await connectToDatabase();
  return await db
    .collection("vaccination")
    .aggregate([
      { $match: { "vaccination.1.nameOfTheVaccine": { $exists: true } } },
      {
        $unwind: "$priorityGroups",
      },
      {
        $group: {
          _id: { value: "$priorityGroups.value" },
          count: { $sum: 1 },
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
          newdate: {
            $substr: [
              { $ifNull: ["$vaccination.date", "$vaccination.firstDoseDate"] },
              0,
              10,
            ],
          },
          nameOfTheVaccine: "$vaccination.nameOfTheVaccine",
        },
      },

      {
        $group: {
          _id: { date: "$newdate", nameOfTheVaccine: "$nameOfTheVaccine" },
          count: {
            $sum: 1,
          },
        },
      },
    ])
    .toArray();
};

export const getTotalDosesByRegionAndDay = async () => {
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
             { "vaccination.nameOfTheVaccine": { $ne: null } },
             { "vaccination.dateOfNextVisit": { $ne: null } },
             { "vaccination.vaccinatorFullName": { $ne: null } },
             { "vaccination.expiryDate": { $ne: null } },
             { "vaccination.batchNumber": { $ne: null } },
          ],
        },
      },
      {
        $project: {
          newdate: {
            $substr: [
              { $ifNull: ["$vaccination.date", "$vaccination.firstDoseDate"] },
              0,
              10,
            ],
          },
          region: "$vaccination.placeofVaccination.province",
        },
      },
      {
        $group: {
          _id: { date: "$newdate", region: "$region" },
          count: {
            $sum: 1,
          },
        },
      },
    ])
    .toArray();
};

export const getFullyVaccinated = async () => {
  const { db } = await connectToDatabase();
  const byRegion = await db
    .collection("vaccination")
    .aggregate([
      { $match: { $or:[{"vaccination.1.nameOfTheVaccine": { $exists: true } },{"vaccination.0.nameOfTheVaccine": "Jhonson&Jhonson - Jansen"}]}},
      { $group: { _id: "$address.province", count: { $sum: 1 } } },
    ])
    .toArray();
  return byRegion.map((i) => ({
    ...i,
    _id: !i._id ? "" : i._id,
    id: regions.filter((e) => e.id === i._id)[0]?.name || "",
  }));
};

export const getFirstDoseVaccinated = async () => {
  const { db } = await connectToDatabase();
  const byRegion = await db
    .collection("vaccination")
    .aggregate([
      { $match: { "vaccination.0.nameOfTheVaccine": { $exists: true } } },
      { $group: { _id: "$address.province", count: { $sum: 1 } } },
    ])
    .toArray();
  return byRegion.map((i) => ({
    ...i,
    _id: !i._id ? "" : i._id,
    id: regions.filter((e) => e.id === i._id)[0]?.name || "",
  }));
};
