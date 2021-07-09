import { mapToFhir, mapToPatient } from "./fhir";

const patient = {
  _id: "608bfaf5a6f4f3001f90ce4c",
  patient: "cf41563d-2eb4-48d0-9d93-623b27668c37",
  bornInGambia: true,
  phoneNumber: "9896100",
  firstName: "AMIE",
  lastName: "NDOYE",
  middleName: "",
  baptismalName: "",
  NIN: "181063-020-001",
  age: "",
  patientVaccineRegisterNumber: "116",
  myChildId: "",
  nationality: "GM",
  gender: "F",
  dateOfBirth: "1963-10-18T07:00:00.000Z",
  placeOfWork: "HOUSE WIFE",
  priorityGroups: [],
  preexistingConditions: [],
  previousCovid19Infection: null,
  patientPreviousAllergicReaction: "no",
  attendantAtBirth: "",
  placeOfDelivery: {
      province: "79defb55-db0a-48a0-9a69-c539f3eedb7f",
      district: "99222af6-0ba8-4da0-859f-2193eb16f4ac",
      place: "BANJUL"
  },
  address: {
      province: "79defb55-db0a-48a0-9a69-c539f3eedb7f",
      district: "be4be157-0848-49c9-9816-5c0a2dbd9721",
      address: "KOTU SOUTH"
  },
  occupation: "",
  vaccination: [
      {
          firstDoseDate: "2021-04-07T12:38:31.000Z",
          nameOfTheVaccine: "Astrazeneca",
          batchNumber: "4120Z004",
          serialNumber: "",
          expirydate: "2021-04-13T12:38:31.000Z",
          dateOfNextVisit: "2021-05-30T12:38:31.000Z",
          vaccinatorFullName: "MUSA B ADRBOE",
          aefi: [
              {
                  aefiSeverity: "severe",
                  aefiDescription: ""
              }
          ],
          placeofVaccination: {
              facility: "",
              province: "79defb55-db0a-48a0-9a69-c539f3eedb7f",
              district: "76dd6213-4edd-46cf-a6c0-d3eb9dd172d0",
              place: "TURNTABLE"
          }
      }
  ],
  mother: {
      firstName: "BINTOU",
      middleName: "",
      lastName: "NDURE",
      dateOfBirth: null,
      nationality: "GM",
      NIN: "",
      residentialAddress: {},
      age: ""
  },
  father: {
      firstName: "ASH MALICK",
      middleName: "",
      lastName: "NDOYE",
      dateOfBirth: null,
      nationality: "GM",
      NIN: "",
      residentialAddress: {},
      age: ""
  }
}

test("map to fhir patient", () => {
  expect(mapToFhir(patient)).toEqual({
      name: [
      {
        family: "NDOYE",
        given: ["AMIE",""],
      },
    ],
  });
});