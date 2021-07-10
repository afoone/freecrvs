export const getIdentifiers = (patient) => {
  return (
    <div data-testid="identifier">
      {patient.NIN && <div>{`NIN: ${patient.NIN}`}</div>}
      {patient.myChildId && <div>{`myChildId: ${patient.myChildId}`}</div>}
    </div>
  );
};

export const Errors = ({ patient }) => {
  const vaccinationDateMissing = !(
    patient.vaccination &&
    patient.vaccination[0] &&
    (patient.vaccination[0].firstDoseDate || patient.vaccination[0].date)
  );

  const vaccineNameMissing = !(
    patient.vaccination &&
    patient.vaccination[0] &&
    patient.vaccination[0].nameOfTheVaccine
  );

  return (
    <ul data-testid="errors">
      {vaccinationDateMissing && <li>Vaccination date is missing</li>}
      {vaccineNameMissing && <li>Name of the vaccine is missing</li>}
    </ul>
  );
};
