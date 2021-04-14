import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import PatientData from "../PatientData";
import { validate } from "../validators/validator";
import Select from "react-select";
import {
  priorityGroups,
  preexistingConditions,
} from "../extraData/multiselect";
import { v4 as uuid } from "uuid";
import AddressForm from "../adresss/AddressForm";
import {
  getProvincesOptions,
  getDistrictOptions,
  getNationalityOptions,
} from "../extraData/options";
import ImmunizationRecordForm from "./ImmunizationRecordForm";
import { add } from "../../redux/immunizationSlice";
import { useDispatch } from "react-redux";

const ImmunizationForm = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // utils
  const [patient, setPatient] = useState({});

  // locations
  const [facilities, setFacilities] = useState([]);
  // user
  // const [user, setUser] = useState({})
  // Application
  // const [informant, setInformant] = useState('self')
  // const [informantRelationship, setinformantRelationship] = useState('')
  const [phoneNumber, setPhoneNumber] = useState("");

  // Vaccination 1st Dose
  const [vaccinationFirstDose, setvaccinationFirstDose] = useState({});
  // Vaccination 2nd dose
  const [vaccinationSecondDose, setVaccinationSecondDose] = useState({});

  // Patient
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [baptismalName, setBaptismalName] = useState("");
  const [NIN, setNIN] = useState("");
  const [myChildId, setMyChildId] = useState("");
  const [nationality, setNationality] = useState("GM");
  const [gender, setGender] = useState("M");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [age, setAge] = useState("");
  const [placeOfWork, setPlaceOfWork] = useState("");
  const [patientPriorityGroups, setPatientPriorityGroups] = useState([]);
  const [
    patientVaccineRegisterNumber,
    setPatientVaccineRegisterNumber,
  ] = useState("");
  const [
    patientPreexistingConditions,
    setPatientPreexistingConditions,
  ] = useState([]);
  const [
    patientPreviousCovid19Infection,
    setpatientPreviousCovid19Infection,
  ] = useState(null);
  const [
    patientPreviousAllergicReaction,
    setPatientPreviousAllergicReaction,
  ] = useState("no");
  const [attendantAtBirth, setAttendantAtBirth] = useState("");
  // const [typeofBirth, setTypeofBirth] = useState('single')
  // const [orderOfBirth, setOrderOfBirth] = useState(1)
  // const [weightAtBirth, setWeightAtBirth] = useState('')
  // const [heightAtBirth, setHeightAtBirth] = useState('')
  const [placeOfDelivery, setPlaceOfDelivery] = useState({});
  const [patientAddress, setPatientAddress] = useState({});
  const [patientOccupation, setPatientOccupation] = useState("");

  // // Applicant (if other)
  // const [applicantNationality, setApplicantNationality] = useState('GM')
  // const [applicantNIN, setApplicantNIN] = useState('')
  // const [applicantFirstName, setApplicantFirstName] = useState('')
  // const [applicantMiddleName, setApplicantMiddleName] = useState('')
  // const [applicantLastName, setApplicantLastName] = useState('')
  // const [
  //   applicantResidentialAddress,
  //   setApplicantResidentialAddress
  // ] = useState({})
  // const [
  //   reasonNotApplyingMotherOrFather,
  //   setReasonNotApplyingMotherOrFather
  // ] = useState('')
  // const [primaryCaregiver, setPrimaryCaregiver] = useState('')

  // Mother
  const [motherFirstName, setMotherFirstName] = useState("");
  const [motherMiddleName, setMotherMiddleName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [motherNationality, setMotherNationality] = useState("GM");
  const [motherNIN, setMotherNIN] = useState("");
  const [motherDateOfBirth, setMotherDateOfBirth] = useState(new Date());
  const [motherAge, setMotherAge] = useState("");
  // const [motherMaritalStatuts, setMotherMaritalStatuts] = useState('')
  // const [motherOccupation, setMotherOccupation] = useState('')
  // const [motherLevelOfEducation, setMotherLevelOfEducation] = useState('')
  // const [motherChildrenBorn, setMotherChildrenBorn] = useState(1)
  // const [motherFetalDeaths, setMotherFetalDeaths] = useState(0)
  // const [motherPreviousLiveBirth, setMotherPreviousLiveBirth] = useState(
  //   new Date()
  // )
  const [motherResidentialAddress, setMotherResidentialAddress] = useState({});
  // const [motherCurrentAddress, setMotherCurrentAddress] = useState({})

  // Father
  const [fatherFirstName, setFatherFirstName] = useState("");
  const [fatherMiddleName, setFatherMiddleName] = useState("");
  const [fatherLastName, setFatherLastName] = useState("");
  const [fatherNationality, setFatherNationality] = useState("GM");
  const [fatherDateOfBirth, setFatherDateOfBirth] = useState(new Date());
  const [fatherAge, setFatherAge] = useState("");
  // const [fatherMaritalStatus, setFatherMaritalStatus] = useState('')
  // const [fatherOccupation, setFatherOccupation] = useState('')
  // const [fatherLevelOfEducation, setFatherLevelOfEducation] = useState('')
  const [fatherResidentialAddress, setFatherResidentialAddress] = useState({});
  const [fatherNIN, setFatherNIN] = useState("");

  // Errors
  const [errors, setErrors] = useState({});

  const validations = {
    // lastName: { required: true },
    // batchNumber: { required: true },
    // vaccinatorFullName: { required: true },
    // nameOfTheVaccine: { required: true }
  };

  const setLocationsOnState = (locationsObject) => {
    const locationsArray = Object.keys(locationsObject).map((k) => ({
      id: locationsObject[k].id,
      name: locationsObject[k].name,
      partOf: locationsObject[k].partOf,
    }));
    setProvinces(locationsArray.filter((l) => l.partOf === "Location/0"));
    setDistricts(locationsArray.filter((l) => l.partOf !== "Location/0"));
  };

  const populateData = (patient) => {
    setFirstName(patient.firstName);
    setLastName(patient.lastName);
    setMiddleName(patient.middleName);
    setPatientAddress(patient.address);
    setNIN(patient.NIN);
    setAttendantAtBirth(patient.attendantAtBirth);
    setBaptismalName(patient.baptismalName);
    setDateOfBirth(patient.dateOfBirth ? new Date(patient.dateOfBirth) : null);
    setAge(patient.age);
    setFatherFirstName(patient.father.firstName);
    setFatherLastName(patient.father.lastName);
    setFatherMiddleName(patient.father.middleName);
    setFatherNIN(patient.father.NIN);
    setFatherDateOfBirth(new Date(patient.father.dateOfBirth));
    setFatherAge(patient.father.age);
    setFatherNationality(patient.father.nationality);
    setFatherResidentialAddress(patient.father.residentialAddress);
    setGender(patient.gender);
    setMotherFirstName(patient.mother.firstName);
    setMotherMiddleName(patient.mother.middleName);
    setMotherDateOfBirth(
      patient.mother.dateOfBirth && new Date(patient.mother.dateOfBirth)
    );
    const vaccinationDose1 =
      patient.vaccination && patient.vaccination.length > 0
        ? patient.vaccination[0]
        : {};
    const vaccinationDose2 =
      patient.vaccination && patient.vaccination.length > 1
        ? patient.vaccination[1]
        : {};
    console.log("1st dose vaccionation retrieved", vaccinationDose1);

    setvaccinationFirstDose(vaccinationDose1);
    setVaccinationSecondDose(vaccinationDose2);
    setPatientVaccineRegisterNumber(patient.patientVaccineRegisterNumber);
    setMotherNationality(patient.mother.nationality);
    setMotherNIN(patient.mother.NIN);
    setMotherLastName(patient.mother.lastName);
    setMotherAge(patient.mother.age);
    setMotherResidentialAddress(patient.mother.residentialAddress);
    setMyChildId(patient.myChildId);
    setNationality(patient.nationality);
    setPatientOccupation(patient.occupation);
    setPatient(patient);
    setPhoneNumber(patient.phoneNumber);
    setPlaceOfDelivery(patient.placeOfDelivery);
    setPlaceOfWork(patient.placeOfWork);
    setPatientPreexistingConditions(patient.preexistingConditions);
    setpatientPreviousCovid19Infection(
      patient.previousCovid19Infection &&
        new Date(patient.previousCovid19Infection)
    );
    setPatientPriorityGroups(patient.priorityGroups);
    setPatientPreviousAllergicReaction(patient.patientPreviousAllergicReaction);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/api/patients/${id}/`, {
        // headers: {
        //   Authorization: `Bearer ${getToken()}`,
        // },
      })
      .then((res) => {
        console.log("patient retrieved", res);
        setPatient(res.data);
        populateData(res.data);
      });
  }, []);

  const savePatient = (e) => {
    e.preventDefault();
    const url = `/api/patients/`;
    console.log("patient to save vaccination 2nd dose", vaccinationSecondDose);
    const object = {
      patient: patient.id ? patient.id : uuid(),
      // informant,
      phoneNumber,
      firstName,
      lastName,
      middleName,
      baptismalName,
      NIN,
      age,
      patientVaccineRegisterNumber,
      myChildId,
      nationality,
      gender,
      dateOfBirth,
      placeOfWork,
      priorityGroups: patientPriorityGroups,
      preexistingConditions: patientPreexistingConditions,
      previousCovid19Infection: patientPreviousCovid19Infection,
      patientPreviousAllergicReaction,
      attendantAtBirth,
      placeOfDelivery,
      address: patientAddress,
      occupation: patientOccupation,
      vaccination: [vaccinationFirstDose, vaccinationSecondDose],
      mother: {
        firstName: motherFirstName,
        middleName: motherMiddleName,
        lastName: motherLastName,
        dateOfBirth: motherDateOfBirth,
        nationality: motherNationality,
        NIN: motherNIN,
        residentialAddress: motherResidentialAddress,
        age: motherAge,
      },
      father: {
        firstName: fatherFirstName,
        middleName: fatherMiddleName,
        lastName: fatherLastName,
        dateOfBirth: fatherDateOfBirth,
        nationality: fatherNationality,
        NIN: fatherNIN,
        residentialAddress: fatherResidentialAddress,
        age: fatherAge,
      },
    };

    const validationErrors = validate(object, validations);

    if (Object.keys(validationErrors).length < 1) {
      if (patient._id) {
        axios
          .put(url + `${patient._id}/`, object)
          .then(router.push("/immunization/"));
      } else {
        dispatch(add(object));
        router.push("/immunization/");
        // axios
        //   .post(url, object, {
        //     headers: {
        //       // Authorization: `Bearer ${getToken()}`,
        //     },
        //   })
        //   .then(router.push("/immunization/"));
      }
    }
    setErrors(validationErrors);
  };

  return (
    <div className="container two-columns">
      {/* {redirect && <Redirect to="/immunization" />} */}
      {patient && <PatientData patient={patient} />}
      <div className="register-form ui form">
        <h2 className="ui dividing header">Patient Data</h2>
        <div className="ui field">
          <label>Contact Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Nationality</label>
          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          >
            {getNationalityOptions()}
          </select>
        </div>
        <div className="three fields">
          <div className="field">
            <label>National ID Number (NIN)</label>
            <input
              type="text"
              value={NIN}
              onChange={(e) => setNIN(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Vaccine Registration Number</label>
            <input
              type="text"
              value={patientVaccineRegisterNumber}
              onChange={(e) => setPatientVaccineRegisterNumber(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
              <option value="U">Unknown</option>
            </select>
          </div>
        </div>
        <div className="three fields">
          <div className="ui field">
            <label>First Name</label>
            <input
              type="text"
              name="first-name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </div>
          <div className="ui field">
            <label>Middle Name</label>
            <input
              type="text"
              name="last-name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Middle Name"
            />
            {errors.middleName && (
              <div className="error">{errors.middleName}</div>
            )}
          </div>
          <div className="ui field">
            <label>Last Name</label>
            <input
              type="text"
              name="last-name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>
        <div className="two fields">
          <div className="ui field">
            <label>Baptismal Name (if applicable)</label>
            <input
              type="text"
              value={baptismalName}
              onChange={(e) => setBaptismalName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>MyChild ID (if any)</label>
            <input
              type="text"
              value={myChildId}
              onChange={(e) => setMyChildId(e.target.value)}
            />
          </div>
        </div>
        <AddressForm address={patientAddress} setAddress={setPatientAddress} />
        <div className="two fields">
          <div className="ui field">
            <label>Date of Birth</label>
            <div className="datepicker-full">
              <DatePicker
                isClearable
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
              />
            </div>
            {errors.dateOfBirth && (
              <div className="error">{errors.dateOfBirth}</div>
            )}
          </div>
          <div className="field">
            <label>Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <h5>Place of delivery</h5>
        <div className="inline fields">
          <div className="field">
            <div className="ui radio checkbox">
              <input
                type="radio"
                name="patient-address"
                value="facility"
                className="hidden"
                checked={placeOfDelivery.addressType === "facility"}
                onChange={(e) =>
                  setPlaceOfDelivery({
                    ...placeOfDelivery,
                    addressType: e.target.value,
                  })
                }
              />
              <label>Facility</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                type="radio"
                name="patient-address"
                value="address"
                className="hidden"
                checked={placeOfDelivery.addressType === "address"}
                onChange={(e) =>
                  setPlaceOfDelivery({
                    ...placeOfDelivery,
                    addressType: e.target.value,
                  })
                }
              />
              <label>Other Address</label>
            </div>
          </div>
        </div>
        <div className="fields">
          <div className="four wide field">
            <label>Region</label>
            <select
              className="ui fluid dropdown"
              value={placeOfDelivery.province}
              onChange={(e) =>
                setPlaceOfDelivery({
                  ...placeOfDelivery,
                  province: e.target.value,
                })
              }
            >
              <option></option>
              {getProvincesOptions()}
            </select>
            {errors.placeOfDelivery && (
              <div className="error">{errors.placeOfDelivery}</div>
            )}
          </div>
          {placeOfDelivery.province && (
            <div className="four wide field">
              <label>District</label>
              <select
                className="ui fluid dropdown"
                value={placeOfDelivery.district}
                onChange={(e) =>
                  setPlaceOfDelivery({
                    ...placeOfDelivery,
                    district: e.target.value,
                  })
                }
              >
                <option></option>
                {getDistrictOptions(placeOfDelivery.province)}
              </select>
            </div>
          )}
          {placeOfDelivery.district &&
            placeOfDelivery.addressType !== "facility" && (
              <div className="eight wide field">
                <label>Place</label>
                <input
                  type="text"
                  value={placeOfDelivery.place}
                  onChange={(e) =>
                    setPlaceOfDelivery({
                      ...placeOfDelivery,
                      place: e.target.value,
                    })
                  }
                />
                {errors.place && <div className="error">{errors.place}</div>}
              </div>
            )}
          {placeOfDelivery.district &&
            placeOfDelivery.addressType === "facility" && (
              <div className="eight wide field">
                <label>Facility</label>
                <select
                  className="ui fluid dropdown"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                >
                  <option></option>
                  {facilities
                    .sort((i, j) => (i.name > j.name ? 1 : -1))
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
        </div>
        <div className="two fields">
          <div className="field">
            <label>Place of Work</label>
            <input
              type="text"
              value={placeOfWork}
              onChange={(e) => setPlaceOfWork(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Occupation</label>
            <input
              type="text"
              value={patientOccupation}
              onChange={(e) => setPatientOccupation(e.target.value)}
            />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>
              COVID-19 Priority group, select one or more of the Following
            </label>
            <Select
              defaultValue={[]}
              isMulti
              name="priority-group"
              options={priorityGroups}
              value={patientPriorityGroups}
              onChange={(sel) => setPatientPriorityGroups(sel)}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="field">
            <label>
              Pre-existing conditions, select one or more of the Following
            </label>
            <Select
              defaultValue={[]}
              isMulti
              value={patientPreexistingConditions}
              onChange={(sel) => setPatientPreexistingConditions(sel)}
              name="priority-group"
              options={preexistingConditions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>History of COVID-19 Infection (Date, if infection)</label>
            <div className="datepicker-full">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                isClearable
                selected={patientPreviousCovid19Infection}
                onChange={(date) => setpatientPreviousCovid19Infection(date)}
              />
            </div>
          </div>
          <div className="field">
            <label>Previous Allergic Reaction</label>
            <select
              value={patientPreviousAllergicReaction}
              onChange={(e) =>
                setPatientPreviousAllergicReaction(e.target.value)
              }
            >
              <option value="minor">Yes, minor</option>
              <option value="severe">Yes, severe (anaphylaxis)</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        {nationality === "GM" && (
          <>
            {" "}
            <h2 className="ui dividing header">Mother's data</h2>
            <div className="field">
              <label>Nationality</label>
              <select
                value={motherNationality}
                onChange={(e) => setMotherNationality(e.target.value)}
              >
                {getNationalityOptions()}
              </select>
            </div>
            <div className="three fields">
              <div className="ui field">
                <label>First Name</label>
                <input
                  type="text"
                  name="first-name"
                  value={motherFirstName}
                  required
                  onChange={(e) => setMotherFirstName(e.target.value)}
                  placeholder="First Name"
                />
                {errors.motherFirstName && (
                  <div className="error">{errors.motherFirstName}</div>
                )}
              </div>
              <div className="ui field">
                <label>Middle Name</label>
                <input
                  type="text"
                  name="last-name"
                  value={motherMiddleName}
                  onChange={(e) => setMotherMiddleName(e.target.value)}
                  placeholder="Middle Name"
                />
                {errors.motherMiddleName && (
                  <div className="error">{errors.motherMiddleName}</div>
                )}
              </div>
              <div className="ui field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last-name"
                  value={motherLastName}
                  required
                  onChange={(e) => setMotherLastName(e.target.value)}
                  placeholder="Last Name"
                />
                {errors.motherLastName && (
                  <div className="error">{errors.motherLastName}</div>
                )}
              </div>
            </div>
            <div className="three fields">
              <div className="ui field">
                <label>Date of Birth</label>
                <div className="datepicker-full">
                  <DatePicker
                    isClearable
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    selected={motherDateOfBirth}
                    onChange={(date) => setMotherDateOfBirth(date)}
                  />
                </div>
                {errors.motherDateOfBirth && (
                  <div className="error">{errors.motherDateOfBirth}</div>
                )}
              </div>
              <div className="field">
                <label>Age</label>
                <input
                  type="text"
                  value={motherAge}
                  onChange={(e) => setMotherAge(e.target.value)}
                />
              </div>
              <div className="field">
                <label>NIN</label>
                <input
                  type="text"
                  value={motherNIN}
                  onChange={(e) => setMotherNIN(e.target.value)}
                />
              </div>
            </div>
            <AddressForm
              address={motherResidentialAddress}
              setAddress={setMotherResidentialAddress}
            ></AddressForm>
            <h2 className="ui dividing header">Father's data</h2>
            <div className="field">
              <label>Nationality</label>
              <select
                value={fatherNationality}
                onChange={(e) => setFatherNationality(e.target.value)}
              >
                {getNationalityOptions()}
              </select>
            </div>
            <div className="three fields">
              <div className="ui field">
                <label>First Name</label>
                <input
                  type="text"
                  name="first-name"
                  value={fatherFirstName}
                  required
                  onChange={(e) => setFatherFirstName(e.target.value)}
                  placeholder="First Name"
                />
                {errors.fatherFirstName && (
                  <div className="error">{errors.fatherFirstName}</div>
                )}
              </div>
              <div className="ui field">
                <label>Middle Name</label>
                <input
                  type="text"
                  name="last-name"
                  value={fatherMiddleName}
                  onChange={(e) => setFatherMiddleName(e.target.value)}
                  placeholder="Middle Name"
                />
                {errors.fatherMiddleName && (
                  <div className="error">{errors.fatherMiddleName}</div>
                )}
              </div>
              <div className="ui field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last-name"
                  value={fatherLastName}
                  required
                  onChange={(e) => setFatherLastName(e.target.value)}
                  placeholder="Last Name"
                />
                {errors.fatherLastName && (
                  <div className="error">{errors.fatherLastName}</div>
                )}
              </div>
            </div>
            <div className="three fields">
              <div className="ui field">
                <label>Date of Birth</label>
                <div className="datepicker-full">
                  <DatePicker
                    isClearable
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    selected={fatherDateOfBirth}
                    onChange={(date) => setFatherDateOfBirth(date)}
                  />
                </div>
                {errors.fatherDateOfBirth && (
                  <div className="error">{errors.fatherDateOfBirth}</div>
                )}
              </div>
              <div className="field">
                <label>Age</label>
                <input
                  type="text"
                  value={fatherAge}
                  onChange={(e) => setFatherAge(e.target.value)}
                />
              </div>
              <div className="field">
                <label>NIN</label>
                <input
                  type="text"
                  value={fatherNIN}
                  onChange={(e) => setFatherNIN(e.target.value)}
                />
              </div>
            </div>
            <AddressForm
              address={fatherResidentialAddress}
              setAddress={setFatherResidentialAddress}
            ></AddressForm>
          </>
        )}
        <ImmunizationRecordForm
          title="Vaccination Data (1st Dose)"
          setImmunization={setvaccinationFirstDose}
          immunization={vaccinationFirstDose}
          errors={errors}
        />
        <ImmunizationRecordForm
          title="Vaccination Data (2nd Dose)"
          setImmunization={setVaccinationSecondDose}
          immunization={vaccinationSecondDose}
          errors={errors}
        ></ImmunizationRecordForm>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <button className="ui button positive" onClick={savePatient}>
            {patient._id ? "Update Patient" : "Save"}
          </button>
          <a href="/immunization">
            <button className="ui button negative">Cancel</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImmunizationForm;
