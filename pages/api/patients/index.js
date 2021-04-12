import {
  add,
  list,
  deleteImmunization,
  update,
  get,
} from "../../../services/immunization";

export default async (req, res) => {
  // const { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      const patient = await add(req.body);
      console.log(patient);
      res.json(patient);
      break;

    default:
      const { _count, _getpagesoffset } = req.query;
      const patients = await list(_getpagesoffset, _count);
      res.json(patients);
      break;
  }

  // export async function listImmunizationHandler(
  //   request: Hapi.Request,
  //   h: Hapi.ResponseToolkit
  // ): Promise<any> {
  //   const { page } = request.params
  //   const offset: number = page ? parseInt(page) * 10 : 0
  //   let result
  //   try {
  //     result = await list(offset, 10)
  //   } catch (err) {
  //     console.log('Error :', err)
  //     throw Error(err)
  //   }
  //   return result
  // }

  // export async function updateImmunizationHandler(
  //   request: Hapi.Request,
  //   h: Hapi.ResponseToolkit
  // ): Promise<any> {
  //   let result
  //   try {
  //     result = await update(request.params.id, request.payload)
  //   } catch (err) {
  //     console.log('Error :', err)
  //     throw Error(err)
  //   }
  //   return result
  // }

  // export async function getImmunizationHandler(
  //   request: Hapi.Request,
  //   h: Hapi.ResponseToolkit
  // ): Promise<any> {
  //   let result
  //   try {
  //     result = await get(request.params.id)
  //   } catch (err) {
  //     console.log('Error :', err)
  //     throw Error(err)
  //   }
  //   return result
  // }

  // export async function deleteImmunizationHandler(
  //   request: Hapi.Request,
  //   h: Hapi.ResponseToolkit
  // ): Promise<any> {
  //   let result
  //   try {
  //     result = await deleteImmunization(request.params.id)
  //   } catch (err) {
  //     console.log('Error :', err)
  //     throw Error(err)
  //   }
  //   return result
  // }
};
