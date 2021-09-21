import { ObjectId } from "mongodb";
import { connectToDatabase } from "../util/mongodb";

export const add = async (data) => {
  const { db } = await connectToDatabase();
  const vaccination = typeof data === "string" ? JSON.parse(data) : data;
  const mongoResponse = await db
    .collection("vaccination")
    .insertOne(vaccination);
  console.log("response", mongoResponse);
  return mongoResponse.ops[0];
};

const createQuery = (query) => {
  let newQuery = {};
  Object.keys(query).forEach((i) => {
    if (query[i]) {
      console.log(i, query[i]);
      newQuery[i] = { $regex: query[i], $options: "i" };
    }
  });
  console.log(newQuery);
  return newQuery;
};

export const list = async (offset = 0, maxResults = 10, query) => {
  const { db } = await connectToDatabase();
  console.log("query", query);
  if (offset) {
    offset = parseInt(offset);
  }
  if (maxResults) {
    maxResults = parseInt(maxResults);
  }
  if (offset) {
    return await db
      .collection("vaccination")
      .find(createQuery(query))
      .sort({ $natural: -1 })
      .skip(offset)
      .limit(maxResults)
      .toArray();
  } else {
    return await db
      .collection("vaccination")
      .find(createQuery(query))
      .sort({ $natural: -1 })
      .limit(maxResults)
      .toArray();
  }
};

export const update = async (id, data) => {
  const vaccination = typeof data === "string" ? JSON.parse(data) : data;
  const { db } = await connectToDatabase();
  const _id = new ObjectId(id);
  await db
    .collection("vaccination")
    .updateOne({ _id: _id }, { $set: vaccination });
  const immunizationNew = await db
    .collection("vaccination")
    .findOne({ _id: _id });
  return immunizationNew;
};

export const get = async (id) => {
  const { db } = await connectToDatabase();
  const _id = new ObjectId(id);
  const immunizationNew = await db
    .collection("vaccination")
    .findOne({ _id: _id });
  return immunizationNew;
};

export const getByNamesAndBirthDate = async (
  firstName,
  lastName,
  birthDate
) => {
  const { db } = await connectToDatabase();
  const immunizationNew = await db
    .collection("vaccination")
    .findOne({ firstName, lastName, dateOfBirth: new RegExp(birthDate) });
  return immunizationNew;
};

export const deleteImmunization = async (id) => {
  const { db } = await connectToDatabase();
  const response = await db
    .collection("vaccination")
    .deleteOne({ _id: new ObjectId(id) });
  return response.result;
};
