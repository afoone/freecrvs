import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const NewPatient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [firstDoseDate, setFirstDoseDate] = useState(new Date());
  const [nameOfTheVaccine, setNameOfTheVaccine] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [expirydate, setExpirydate] = useState(new Date());
  const [dateOfNextVisit, setDateOfNextVisit] = useState(new Date());
  const [vaccinatorFullName, setVaccinatorFullName] = useState("");
  const [aefi, setAefi] = useState(false);
  const [aefiSeverity, setAefiSeverity] = useState("");
  const [aefiDescription, setAefiDescription] = useState("");

  const savePatient = (e) => {
    e.preventDefault();
    axios.post("/api/patients", {
      firstName,
      lastName,
      middleName,
    });
  };

  return (
    <div>
      <form class="ui form">
        <div className="field">
          <div className="three fields">
            <div class="field">
              <label>First Name</label>
              <input
                type="text"
                name="first-name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div class="field">
              <label>Middle Name</label>
              <input
                type="text"
                name="last-name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Middle Name"
              />
            </div>
            <div class="field">
              <label>Last Name</label>
              <input
                type="text"
                name="last-name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Date of giving (1st dose)</label>
                <DatePicker
                  selected={firstDoseDate}
                  onChange={(date) => setFirstDoseDate(date)}
                />
              </div>
              <div className="field">
                <label>Name of the vaccine</label>
                <select
                  type="text"
                  name="last-name"
                  value={nameOfTheVaccine}
                  required
                  onChange={(e) => setNameOfTheVaccine(e.target.value)}
                  placeholder="Name of the vaccine"
                >
                  <option>Astrazeneca</option>
                  <option>Pfizer</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="two fields">
            <div className="field">
              <label>Batch Number</label>
              <input
                type="text"
                name="last-name"
                value={batchNumber}
                required
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="Batch Number"
              ></input>
            </div>
            <div className="field">
              <label>Expiry Date</label>
              <DatePicker
                selected={expirydate}
                onChange={(date) => setExpirydate(date)}
              />
            </div>
            <div className="field">
              <label>Next Visit</label>
              <DatePicker
                selected={dateOfNextVisit}
                onChange={(date) => setDateOfNextVisit(date)}
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label>Vaccinator Full Name</label>
          <input
            type="text"
            name="last-name"
            value={vaccinatorFullName}
            required
            onChange={(e) => setVaccinatorFullName(e.target.value)}
            placeholder="Last Name"
          />
        </div>

        <div className="field">
          <label>Vaccinator Full Name</label>
          <input
            type="text"
            name="last-name"
            value={vaccinatorFullName}
            required
            onChange={(e) => setVaccinatorFullName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div className="field">
          <div className="two fields">
            <div className="field">
              <input
                type="checkbox"
                checked={aefi}
                onChange={(e) => setAefi(e.target.value)}
              ></input>{" "}
              Adverse Event Following Immunization
            </div>
          </div>
        </div>

        <div className="field">
          <div className="two fields">
            <div className="field">
              <label>Severity</label>
              <select
                value={aefiSeverity}
                onChange={(e) => setAefiSeverity(e.target.value)}
              >
                <option>Severe</option>
                <option>Minor</option>
              </select>
            </div>
            <div className="field">
              <label>AEFI description</label>
              <input
                type="text"
                value={aefiDescription}
                onChange={(e) => setAefiDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button class="ui button" onClick={savePatient}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPatient;
