const identifierVaccineFirstDose = [{
  vaccineCode: 91300,
  vaccineName: "Pfizer-BioNTech",
  vaccineAdministrationCode: "0001A"
},{
  vaccineCode: 91301,
  vaccineName: "Moderna",
  vaccineAdministrationCode: "0011A"
},{vaccineCode: 91302,
  vaccineName: "Astrazeneca",
  vaccineAdministrationCode: "0021A"},
  {vaccineCode: 91303,
  vaccineName: "Jhonson&Jhonson - Jansen",
  vaccineAdministrationCode: "0031A"},
  {vaccineCode: 91304,
  vaccineName: "NovaVax",
  vaccineAdministrationCode: "0041A"}]


const identifierVaccineSecondDose = [{
  vaccineCode: 91300,
  vaccineName: "Pfizer-BioNTech",
  vaccineAdministrationCode: "0002A"
},{
  vaccineCode: 91301,
  vaccineName: "Moderna",
  vaccineAdministrationCode: "0012A"
},{vaccineCode: 91302,
  vaccineName: "Astrazeneca",
  vaccineAdministrationCode: "0022A"},
  {vaccineCode: 91304,
  vaccineName: "NovaVax",
  vaccineAdministrationCode: "0042A"}]


  const codeNumberFirstDose =()=>{
    identifierVaccineFirstDose.map((i)=>{
      if(i.vaccineName === patient.vaccination[0].nameOfTheVaccine){
        return i.vaccineCode
      }
    })
  }
  const codeNumberSecondDose =()=>{
    identifierVaccineFirstDose.map((i)=>{
      if(i.vaccineName === patient.vaccination[1].nameOfTheVaccine){
        return i.vaccineCode
      }
    })
  }
export const mapToFhir = (patient) => {
  console.log("PATIENT", patient)
  return {
    resourceType: "Bundle",
    type: "collection",
    entry: [
      {
        fullUrl: "resource:0",
        resource: {
          resourceType: "Patient",
          name: [
            {
              family: patient.lastName,
              given: [patient.firstName, patient.middleName],
            }, 
          ],
          identifier: {
            use : "official",
            system : "gambia-nin",
            value : patient.NIN,
          },
          birthDate: patient.dateOfBirth
        }
      },
      {
        fullUrl: "resource:1",
        resource: {
          resourceType: "Immunization",
          meta: {
            security: [{system: "https://smarthealth.cards/ial", code: "IAL2"}]
          },
          status: "completed",
          vaccineCode: {
            coding: [
              {
                system: "http://hl7.org/fhir/sid/cvx",
                code: "207"
              },
              {
                  system: "http://www.ama-assn.org/go/cpt",
                  vaccineName:patient.vaccination[0].nameOfTheVaccine,
                  code: codeNumberFirstDose
              }
            ]
          },
          patient: {
            reference: "resource:0"
          },
          occurrenceDateTime: patient.vaccination[0]?.firstDoseDate,
          performer: [
            {
              actor: {
                display: patient.vaccination[0].vaccinatorFullName
              }
            }
          ],
          lotNumber: patient.vaccination[0].batchNumber
        }
      },
      (patient?.vaccination[1]?.nameOfTheVaccine)&&
        
        {
          fullUrl: "resource:2",
          resource: {
            resourceType: "Immunization",
            status: "completed",
            vaccineCode: {
              coding: [
                {
                  system: "http://hl7.org/fhir/sid/cvx",
                  code: "207"
                },
                {
                    system: "http://www.ama-assn.org/go/cpt",
                    vaccineName:patient.vaccination[1].nameOfTheVaccine,
                    code: codeNumberSecondDose
                }
              ]
            },
            patient: {
              reference: "resource:0"
            },
            occurrenceDateTime: patient.vaccination[1]?.firstDoseDate,
            performer: [
              {
                actor: {
                  display: patient.vaccination[1].vaccinatorFullName
                }
              }
            ],
            lotNumber: patient.vaccination[1].batchNumber
          }
        
      }
    ]
  }
};

// para luego
export const mapToPatient = (fhir) => {
  return {
    firstName: fhir.given,
  };
};
