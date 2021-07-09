export const mapToFhir = (patient) => {
  return {
    name: [
      {
        family: patient.lastName,
        given: [patient.firstName, patient.middleName],
      },
    ],
  };
};

// para luego
export const mapToPatient = (fhir) => {
  return {
    firstName: fhir.given,
  };
};
