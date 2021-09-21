import { ObjectId } from "mongodb";
import duplicates from "../pages/api/patients/duplicates";
import { update } from "./immunization";

import { connectToDatabase } from "../util/mongodb";

export const getDuplicatesForNIN = async () => {
  const { db } = await connectToDatabase();

  const duplicates = await db
    .collection("vaccination")
    .aggregate(
      [
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
      ],
      { allowDiskUse: true }
    )
    .toArray();
  return duplicates.filter((i) => i.nin && i.nin.length > 5);
};

export const getDuplicatesForBirthDateAndName = async () => {
  const { db } = await connectToDatabase();

  const duplicates = await db
    .collection("vaccination")
    .aggregate(
      [
        {
          $group: {
            _id: {
              dateOfBirth: "$dateOfBirth",
              firstName: "$firstName",
              lastName: "$lastName",
            },
            count: { $sum: 1 },
            documents: { $push: "$$ROOT" },
          },
        },
        { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
        {
          $project: {
            nameAndDate: "$_id",
            _id: "$count",
            documents: "$documents",
          },
        },
      ],
      { allowDiskUse: true }
    )
    .toArray();
  return duplicates;
};

export const mergeVaccinations = (acc, curr) => {
  const newOnes = [];
  if (!curr) return [];
  curr.forEach((i) => {
    if (
      !acc.filter((d) => d.firstDoseDate === i.firstDoseDate).length &&
      !newOnes.filter((n) => n.firstDoseDate === i.firstDoseDate).length
    ) {
      newOnes.push(i);
    }
  });
  return [...acc, ...newOnes];
};

export const createMergedObject = (duplicates) => {
  if (!duplicates.length) return {};
  const newObject = duplicates[0];
  newObject.firstName = duplicates.reduce((acc, curr) => {
    return curr.firstName ? curr.firstName : acc;
  }, undefined);
  newObject.lastName = duplicates.reduce((acc, curr) => {
    return curr.lastName ? curr.lastName : acc;
  }, undefined);
  newObject.middleName = duplicates.reduce((acc, curr) => {
    return curr.middleName ? curr.middleName : acc;
  }, undefined);
  newObject.dateOfBirth = duplicates.reduce((acc, curr) => {
    return curr.dateOfBirth ? curr.dateOfBirth : acc;
  }, undefined);
  newObject.vaccination = duplicates
    .map((i) => i.vaccination)
    .reduce(mergeVaccinations, []);
  return newObject;
};

export const mergeDuplicates = async (duplicates) => {
  const { db } = await connectToDatabase();
  if (!duplicates || !duplicates.length) {
    return [];
  }
  update(duplicates[0]._id, createMergedObject(duplicates));

  duplicates.forEach((e, index) => {
    if (index) {
      db.collection("vaccination").deleteOne({ _id: new ObjectId(e._id) });
    }
  });
};

export const isDuplicate = (object1, object2) => {
  //console.log("duplicates", object1, object2);
  if (object1.nin || object2.nin) return object1.nin === object2.nin;
  return (
    object1.firstName === object2.firstName &&
    object1.lastName === object2.lastName &&
    (!object1.dateOfBirth ||
      !object2.dateOfBirth ||
      object1.dateOfBirth === object2.dateOfBirth)
  );
};
