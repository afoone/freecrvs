import { update, get } from "../../../../services/immunization";
import {mapToFhir} from '../../../../services/fhir'
import Cors from "cors";

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
    //   const { db } = await connectToDatabase();
    const { id } = req.query;
  
        await runMiddleware(req, res, cors)
        const patientResponse = await get(id);
        res.json(mapToFhir(patientResponse));
}