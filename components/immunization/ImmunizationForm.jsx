import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import PatientData from '../PatientData';
import { validate } from '../validators/validator';
import Select from 'react-select';
import {
  priorityGroups,
  preexistingConditions,
} from '../extraData/multiselect';
import e from 'cors';
import { v4 as uuid } from 'uuid';
import AddressForm from '../adresss/AddressForm';
import { getNationalityOptions } from '../extraData/options';
import ImmunizationRecordForm from './ImmunizationRecordForm';
import { add, update } from '../../redux/immunizationSlice';
import { useDispatch } from 'react-redux';
import AddressFacilityForm from '../adresss/AddressFacilityForm';
import { Message } from 'semantic-ui-react';

const ImmunizationForm = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let maxAge;
  // utils
  const [patient, setPatient] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // Vaccination 1st Dose
  const [vaccinationFirstDose, setvaccinationFirstDose] = useState({});
  // Vaccination 2nd dose
  const [vaccinationSecondDose, setVaccinationSecondDose] = useState({});
  console.log('vaccinationFirstDose', vaccinationFirstDose.nameOfTheVaccine);
  console.log('vaccinationSecondDose', vaccinationSecondDose);
  // Patient
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [photo, setPhoto] = useState('');

  // const [baptismalName, setBaptismalName] = useState("");
  const [NIN, setNIN] = useState('');
  // const [myChildId, setMyChildId] = useState("");
  const [nationality, setNationality] = useState('GM');
  const [gender, setGender] = useState('M');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [age, setAge] = useState('');
  const [placeOfWork, setPlaceOfWork] = useState('');
  const [patientPriorityGroups, setPatientPriorityGroups] = useState([]);
  const [patientVaccineRegisterNumber, setPatientVaccineRegisterNumber] =
    useState('');
  const [patientPreexistingConditions, setPatientPreexistingConditions] =
    useState([]);
  const [patientPreviousCovid19Infection, setpatientPreviousCovid19Infection] =
    useState(null);
  const [patientPreviousAllergicReaction, setPatientPreviousAllergicReaction] =
    useState('no');
  const [attendantAtBirth, setAttendantAtBirth] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState({});
  const [patientAddress, setPatientAddress] = useState({});
  const [patientOccupation, setPatientOccupation] = useState('');
  const [saving, setSaving] = useState(false);

  // Mother
  const [motherFirstName, setMotherFirstName] = useState('');
  const [motherMiddleName, setMotherMiddleName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [motherNationality, setMotherNationality] = useState('GM');
  const [motherNIN, setMotherNIN] = useState('');
  const [motherDateOfBirth, setMotherDateOfBirth] = useState(new Date());
  const [motherAge, setMotherAge] = useState('');
  const [motherResidentialAddress, setMotherResidentialAddress] = useState({});

  // Father
  const [fatherFirstName, setFatherFirstName] = useState('');
  const [fatherMiddleName, setFatherMiddleName] = useState('');
  const [fatherLastName, setFatherLastName] = useState('');
  const [fatherNationality, setFatherNationality] = useState('GM');
  const [fatherDateOfBirth, setFatherDateOfBirth] = useState(new Date());
  const [fatherAge, setFatherAge] = useState('');
  const [fatherResidentialAddress, setFatherResidentialAddress] = useState({});
  const [fatherNIN, setFatherNIN] = useState('');

  // Errors
  const [errors, setErrors] = useState({});

  const validations = {
    lastName: { required: true },
    firstName: { required: true },
    phoneNumber: { required: true },
  };

  const populateData = (patient) => {
    setFirstName(patient.firstName);
    setLastName(patient.lastName);
    setMiddleName(patient.middleName);
    setPatientAddress(patient.address);
    setNIN(patient.NIN);
    setEmail(patient.email);
    setPhoto(patient.photo);
    setAttendantAtBirth(patient.attendantAtBirth);
    // setBaptismalName(patient.baptismalName);

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

    setvaccinationFirstDose(vaccinationDose1);
    setVaccinationSecondDose(vaccinationDose2);
    setPatientVaccineRegisterNumber(patient.patientVaccineRegisterNumber);
    setMotherNationality(patient.mother.nationality);
    setMotherNIN(patient.mother.NIN);
    setMotherLastName(patient.mother.lastName);
    setMotherAge(patient.mother.age);
    setMotherResidentialAddress(patient.mother.residentialAddress);
    // setMyChildId(patient.myChildId);
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
    axios.get(`/api/patients/${id}/`).then((res) => {
      setPatient(res.data);
      populateData(res.data);
    });
  }, []);
  const savePatient = (createNew = false) => {
    const url = `/api/patients/`;
    const object = {
      patient: patient.id ? patient.id : uuid(),
      phoneNumber,
      firstName,
      lastName,
      middleName,
      photo,
      NIN,
      age: age >= 12 && age,
      patientVaccineRegisterNumber,
      nationality,
      email,
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

    const redirectUrl = createNew ? '/immunization/new' : '/immunization/';

    if (Object.keys(validationErrors).length < 1) {
      if (patient._id) {
        setSaving(true);
        axios.put(url + `${patient._id}/`, object).then(() => {
          setSaving(false);
          router.push(redirectUrl);
        });
        dispatch(update(object));
      } else {
        setSaving(true);
        dispatch(add(object));
        router.push(redirectUrl);
      }
    }
    setErrors(validationErrors);
  };
  const maxLengthCheck = (e) => {
    const numberPattern = /^[]?\d*(?:[.,]\d*)?$/;
    console.log(e.target.name);
    if (numberPattern.test(e.target.value)) {
      if (e.target.name == 'NIN') {
        setNIN(e.target.value);
      } else if (e.target.name == 'fatherNIN') {
        setFatherNIN(e.target.value);
      } else {
        setMotherNIN(e.target.value);
      }
    }
  };

  const handleAge = (e) => {
    const inputValue = e.target.value;
    setAge(inputValue);
  };

  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const onChangeDateOfBirth = (date) => {
    var hoy = new Date();
    var cumpleanos = new Date(date);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    console.log('EDAD', edad);
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    if (
      vaccinationFirstDose.nameOfTheVaccine == 'Moderna' ||
      vaccinationFirstDose.nameOfTheVaccine == 'Pfizer-BioNTech'
    ) {
      if (edad >= 12) {
        setDateOfBirth(date);
        setDateOfBirthError(false);
      } else {
        setDateOfBirthError(true);
      }
    } else {
      if (edad >= 18) {
        setDateOfBirth(date);
        setDateOfBirthError(false);
      } else {
        setDateOfBirthError(true);
      }
    }
  };

  if (
    vaccinationFirstDose.nameOfTheVaccine == 'Moderna' ||
    vaccinationFirstDose.nameOfTheVaccine == 'Pfizer-BioNTech'
  ) {
    maxAge = 12;
  } else {
    maxAge = 18;
  }
  console.log('maxAge', maxAge);
  return (
    <div className="container two-row">
      <div
        style={{
          display: 'flex',
          justifyItems: 'center',
        }}
      >
        {patient.firstName && (
          <PatientData patient={patient} setImage={setPhoto} image={photo} />
        )}
      </div>
      <div className="register-form ui form">
        {errors && !!Object.keys(errors).length && (
          <Message negative>
            <Message.Header>There's some problems in the form</Message.Header>
            <ul>
              {Object.keys(errors).map((e) => (
                <li key={e}>{errors[e]}</li>
              ))}
            </ul>
          </Message>
        )}
        <h2 className="ui dividing header">Patient Data</h2>
        <div className="two fields">
          <div className="field">
            <label>Nationality</label>
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              {getNationalityOptions()}
            </select>
          </div>
          <div className="field">
            <label>e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Patient birth registration data */}
        <div className="three fields">
          <div className="ui field">
            <label>First Name</label>
            <input
              type="text"
              name="first-name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value.toUpperCase())}
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
              onChange={(e) => setMiddleName(e.target.value.toUpperCase())}
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
              onChange={(e) => setLastName(e.target.value.toUpperCase())}
              placeholder="Last Name"
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>

        {/* VacReg No. and Gender,Patient NIN */}

        <div className="three fields">
          <div className="field">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value={'M'}>Male</option>
              <option value={'F'}>Female</option>
              <option value="U">Unknown</option>
            </select>
          </div>
          <div className="ui field">
            <label>Mobile Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
          </div>

          {nationality == 'GM' && (
            <div className="field">
              <div
                className="field"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '20px',
                }}
              >
                <label
                  style={{
                    width: '160px',
                    height: '20px',
                  }}
                >
                  NIN
                </label>
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: 'ligthgray',
                    width: '180px',
                    height: '20px',
                    display: 'flex',
                    bottom: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  class="ui message"
                >
                  Only 12 numbers
                </div>
              </div>
              <input
                type="text"
                maxLength="12"
                name="NIN"
                value={NIN}
                onChange={maxLengthCheck}
              />
            </div>
          )}
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
                onChange={(date) => onChangeDateOfBirth(date)}
              />
            </div>
            {/* {dateOfBirthError == true && (
              <div class="ui negative message">
                <div class="header">
                  {vaccinationFirstDose.nameOfTheVaccine == 'Moderna' ||
                  vaccinationFirstDose.nameOfTheVaccine == 'Pfizer-BioNTech'
                    ? 'Age must be older than 11'
                    : 'Age must be older than 17'}
                </div>
              </div>
            )} */}
            {errors.dateOfBirth && (
              <div className="error">{errors.dateOfBirth}</div>
            )}
          </div>
          {console.log('errors.dateOfBirth', errors.dateOfBirth)}
          <div className="field">
            <label>Age</label>
            <input type="text" value={age} onChange={handleAge} />

            {age > 0 && age < maxAge && (
              <div class="ui negative message">
                <div class="header">
                  {vaccinationFirstDose.nameOfTheVaccine == 'Moderna' ||
                  vaccinationFirstDose.nameOfTheVaccine == 'Pfizer-BioNTech'
                    ? 'Age must be older than 11'
                    : 'Age must be older than 17'}
                </div>
              </div>
            )}
  
          </div>
        </div>
        <div>
          {/* Place of birth if
           * vaccine recipient is Gambian */}
          {nationality === 'GM' && (
            <>
              <AddressFacilityForm
                title="Place of Birth"
                setAddress={setPlaceOfDelivery}
                address={placeOfDelivery}
                errors={errors}
              />
            </>
          )}
          {/* Other vaccination data */}
          <div className="two fields">
            <div className="ui field">
              <label>Place of work</label>
              <input
                type="text"
                value={placeOfWork}
                onChange={(e) => setPlaceOfWork(e.target.value)}
              />
            </div>
            <div className="ui field">
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
                COVID-19 Priority group, select one or more of the following
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
                Pre-existing conditions, select one or more of the following
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
          <div>
            <div className="two fields">
              <div className="field">
                <label>
                  History of COVID-19 Infection (Date, if infection)
                </label>
                <div className="datepicker-full">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    selected={patientPreviousCovid19Infection}
                    onChange={(date) =>
                      setpatientPreviousCovid19Infection(date)
                    }
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

            {/* Mother/Father's data
             * if vaccine recipient is Gambian
             */}
            {nationality === 'GM' && (
              <>
                {' '}
                <h2 className="ui dividing header">Father's Information</h2>
                <div className="three fields">
                  <div className="ui field">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first-name"
                      value={fatherFirstName}
                      required
                      onChange={(e) =>
                        setFatherFirstName(e.target.value.toUpperCase())
                      }
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
                      onChange={(e) =>
                        setFatherMiddleName(e.target.value.toUpperCase())
                      }
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
                      onChange={(e) =>
                        setFatherLastName(e.target.value.toUpperCase())
                      }
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
                      type="number"
                      value={fatherAge}
                      onChange={(e) => setFatherAge(e.target.value)}
                    />
                  </div>
                  {fatherNationality == 'GM' && (
                    <div className="field">
                      <label>NIN</label>
                      <input
                        type="text"
                        name="fatherNIN"
                        maxLength="12"
                        value={fatherNIN}
                        onChange={maxLengthCheck}
                      />
                    </div>
                  )}
                </div>
                <div className="field">
                  <label>Nationality</label>
                  <select
                    value={fatherNationality}
                    onChange={(e) => setFatherNationality(e.target.value)}
                  >
                    {getNationalityOptions()}
                  </select>
                </div>
                <AddressForm
                  address={fatherResidentialAddress}
                  setAddress={setFatherResidentialAddress}
                ></AddressForm>
                <h2 className="ui dividing header">Mother's Information</h2>
                <div className="three fields">
                  <div className="ui field">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first-name"
                      value={motherFirstName}
                      required
                      onChange={(e) =>
                        setMotherFirstName(e.target.value.toUpperCase())
                      }
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
                      onChange={(e) =>
                        setMotherMiddleName(e.target.value.toUpperCase())
                      }
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
                      <div className="error">
                        {errors.motherLastName.toUpperCase()}
                      </div>
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
                      type="number"
                      value={motherAge}
                      onChange={(e) => setMotherAge(e.target.value)}
                    />
                  </div>
                  {motherNationality == 'GM' && (
                    <div className="field">
                      <label>NIN</label>
                      <input
                        type="text"
                        name="motherNIN"
                        maxLength="12"
                        value={motherNIN}
                        onChange={maxLengthCheck}
                      />
                    </div>
                  )}
                </div>
                <div className="field">
                  <label>Nationality</label>
                  <select
                    value={motherNationality}
                    onChange={(e) => setMotherNationality(e.target.value)}
                  >
                    {getNationalityOptions()}
                  </select>
                </div>
                <AddressForm
                  address={motherResidentialAddress}
                  setAddress={setMotherResidentialAddress}
                ></AddressForm>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <label>Vaccine Register Number</label>
          <input
            type="text"
            value={patientVaccineRegisterNumber}
            onChange={(e) =>
              setPatientVaccineRegisterNumber(e.target.value.toUpperCase())
            }
          ></input>
        </div>
        <ImmunizationRecordForm
          title="Vaccination Data (1st Dose)"
          setImmunization={setvaccinationFirstDose}
          immunization={vaccinationFirstDose}
          errors={errors}
          nextVisit
        />
        <ImmunizationRecordForm
          title="Vaccination Data (2nd Dose)"
          setImmunization={setVaccinationSecondDose}
          immunization={vaccinationSecondDose}
          errors={errors}
        ></ImmunizationRecordForm>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {!patient._id && (
            <button
              className="ui button positive"
              onClick={() => savePatient(true)}
            >
              Save and Open New Form
            </button>
          )}
          <button
            className="ui button positive"
            disabled={saving}
            onClick={() => savePatient()}
          >
            {saving ? 'Saving...' : patient._id ? 'Update Patient' : 'Save'}
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
