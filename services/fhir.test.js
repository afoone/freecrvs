import { mapToFhir, mapToPatient } from "./fhir";

const patient = {
  _id: "60c1e652d95eec0012d5b607",
  patient: "19675ad2-7d47-4343-a3de-3fbc84102d0f",
  phoneNumber: "7234747",
  firstName: "EBOU",
  lastName: "DRAMMEH",
  middleName: "MIDDLE",
  NIN: "099719",
  age: "",
  patientVaccineRegisterNumber: "",
  nationality: "GM",
  email: "",
  gender: "M",
  dateOfBirth: "1969-02-02T00:00:00.000Z",
  placeOfWork: "GAMROCK",
  priorityGroups: [],
  preexistingConditions: [],
  previousCovid19Infection: null,
  patientPreviousAllergicReaction: "no",
  attendantAtBirth: "",
  placeOfDelivery: { province: "79defb55-db0a-48a0-9a69-c539f3eedb7f" },
  address: {
    province: "79defb55-db0a-48a0-9a69-c539f3eedb7f",
    district: "be4be157-0848-49c9-9816-5c0a2dbd9721",
    address: "OLD JESHWANG",
  },
  occupation: "CONSTRUCTION",
  vaccination: [
    {
      date: "2021-05-27T10:13:49.000Z",
      nameOfTheVaccine: "Astrazeneca",
      placeofVaccination: {
        province: "79defb55-db0a-48a0-9a69-c539f3eedb7f",
        district: "be4be157-0848-49c9-9816-5c0a2dbd9721",
      },
    },
    {},
  ],
  mother: {
    firstName: "SATU",
    middleName: "",
    lastName: "JARRA",
    dateOfBirth: null,
    nationality: "GM",
    NIN: "",
    residentialAddress: {},
    age: "",
  },
  father: {
    firstName: "PA",
    middleName: "",
    lastName: "DRAMMEH",
    dateOfBirth: null,
    nationality: "GM",
    NIN: "",
    residentialAddress: {},
    age: "",
  },
};

test("map to fhir patient", () => {
  expect(mapToFhir(patient)).toEqual({
    name: [
      {
        family: "DRAMMEH",
        given: ["EBOU", "MIDDLE"],
      },
    ],
  });
});
