import { getByNamesAndBirthDate } from "../../../services/immunization";
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  await runMiddleware(req, res, cors);
  const { firstName, lastName, birthDate } = req.query;
  const patient = await getByNamesAndBirthDate(firstName, lastName, birthDate);
  res.json(patient);
};
