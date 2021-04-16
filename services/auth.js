import { connectToDatabase } from "../util/mongodb";
import { ObjectId } from "mongodb";
const crypto = require("crypto");
const hashingSecret = "912ec803b2ce49e4a541068d495ab570";

export const add = async (data) => {
  const { db } = await connectToDatabase();
  const user = typeof data === "string" ? JSON.parse(data) : data;
  const hashedUser = { ...user, password: passwordHash(user.password) };
  const mongoResponse = await db.collection("users").insertOne(hashedUser);
  return mongoResponse.ops[0];
};

export const list = async (offset = 0, maxResults = 10) => {
  const { db } = await connectToDatabase();
  if (offset) {
    return await db
      .collection("users")
      .find({})
      .skip(offset)
      .limit(maxResults)
      .toArray();
  } else {
    return await db.collection("users").find({}).limit(maxResults).toArray();
  }
};

export const update = async (id, data) => {
  const user = typeof data === "string" ? JSON.parse(data) : data;
  const { db } = await connectToDatabase();
  const _id = new ObjectId(id);
  const hashedUser = { ...user, password: passwordHash(user.password) };
  await db.collection("users").updateOne({ _id: _id }, { $set: hashedUser });
  const userNew = await db.collection("users").findOne({ _id: _id });
  return userNew;
};

export const get = async (id) => {
  const { db } = await connectToDatabase();
  const _id = new ObjectId(id);
  const userNew = await db.collection("users").findOne({ _id: _id });
  return userNew;
};

export const deleteUser = async (id) => {
  const { db } = await connectToDatabase();
  const response = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  return response.result;
};

export const checkUser = async (username, password) => {
  console.log("entrando a chequear", username, password);
  console.log("query", { username: username });
  const { db } = await connectToDatabase();
  let user;
  try {
    user = await db.collection("users").findOne({ username: username });
    console.log(user);
  } catch (error) {
    console.error(error);
  }
  console.log("user retrieved", user);
  if (passwordHash(password) === user.password || passwordHash(password) === user.passwordHash) {
    return user;
  } else {
    return null;
  }
};

export const passwordHash = (password) => {
  return crypto
    .createHmac("sha256", hashingSecret)
    .update(password)
    .digest("hex");
};
