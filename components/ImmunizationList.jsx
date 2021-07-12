import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  getIdentifiers,
  Errors,
  firstDoseVaccinated,
  secondDoseVaccinated,
} from "./immunizationListPresenter";

export const getFullName = (patient) => {
  return `${patient.firstName}  ${patient.middleName || ""} ${
    patient.lastName
  }`;
};

const PatientRow = ({ patient }) => {
  console.log(patient.pending)
  return (
    <tr>
      <td>{getFullName(patient)}</td>
      <td>
        {patient.dateOfBirth &&
          new Date(patient.dateOfBirth).toLocaleDateString()}
      </td>
      <td>{patient.gender === "M" ? "Male" : "Female"}</td>
      <td>{getIdentifiers(patient)}</td>

      <td>
        {firstDoseVaccinated(patient) ? (
          <i class="check icon green"></i>
        ) : (
          <i class="close icon red"></i>
        )}
      </td>
      <td>
        {secondDoseVaccinated(patient) ? (
          <i class="check icon green"></i>
        ) : (
          <i class="close icon red"></i>
        )}
      </td>
      <td>
        {patient.pending ? (
         <i class="close icon red"></i>
        ) : (
         
          <i class="check icon green"></i>
          
        )}
      </td>
      <td>
        <Errors patient={patient}></Errors>
      </td>
      <td>
        {!patient.pending && (
          <a href={`/immunization/${patient._id}`}>
            <button className="primary mini ui button">Edit</button>
          </a>
        )}
      </td>
    </tr>
  );
};

const PatientSkeletonRow = () => {
  return (
    <tr>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
      <td>
        <Skeleton></Skeleton>
      </td>
    </tr>
  );
};

const Pagination = ({ size, position, setOffset }) => {
  const getPages = (size, position) => {
    const pages = [];
    for (let index = 0; index < Math.min(size, 10); index++) {
      pages.push(
        <div
          onClick={() => setOffset(index * 10)}
          key={`page-${index}`}
          className={`ui button basic mini ${
            index === position ? "blue" : "grey"
          }`}
        >
          {index + 1}
        </div>
      );
    }
    return pages;
  };

  return <div className="ui buttons">{getPages(size, position)}</div>;
};

const ImmunizationList = () => {
  const [patients, setPatients] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(25);
  const [searchGiven, setSearchGiven] = useState("");
  const [searchLast, setSearchLast] = useState("");
  const [searchNIN, setSearchNIN] = useState("");
  const [searchToday, setSearchToday] = useState(false);

  const immunization = useSelector((state) => state.immunization);
  const [loading, setLoading] = useState(true);

  const getPatientsWithParams = (params) => {
    let url = `/api/patients/?_count=${count}&_getpagesoffset=${offset}`;
    if (params) {
      url += params;
    }

    axios
      .get(url)
      .then((res) => {
        setPatients(immunization.concat(res.data).slice(0, count));
        setLoading(false);
      })
      .catch((err) => setPatients(immunization));
  };

  useEffect(() => {
    searchPatients();
  }, [immunization, count]);

  const searchPatients = () => {
    let url = "";
    if (searchGiven) {
      url += `&firstName=${searchGiven}`;
    }
    if (searchLast) {
      url += `&lastName=${searchLast}`;
    }
    if (searchNIN) {
      url += `&NIN=${searchNIN}`;
    }
    if (searchToday) {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      url += `&_lastUpdated=gt${date.getFullYear()}-${
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    }

    getPatientsWithParams(url);
  };

  const resetSearch = () => {
    setSearchGiven("");
    setSearchLast("");
    setSearchNIN("");
    getPatientsWithParams();
  };

  return (
    <div className="immunization-list">
      <div className="ui small form">
        <div className="four fields">
          <div className="ui field ">
            <input
              type="text"
              placeholder="Given name..."
              value={searchGiven}
              onChange={(e) => setSearchGiven(e.target.value)}
            />
          </div>
          <div className="ui field">
            <input
              type="text"
              placeholder="Last name..."
              value={searchLast}
              onChange={(e) => setSearchLast(e.target.value)}
            />
          </div>
          <div className="ui field">
            <input
              type="text"
              placeholder="ID (NIN)"
              value={searchNIN}
              onChange={(e) => setSearchNIN(e.target.value)}
            />
          </div>
          <div className="inline fields">
            <button className="ui button positive" onClick={searchPatients}>
              Search
            </button>
            <button className="ui button negative" onClick={resetSearch}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <h3>Patient List</h3>
          </div>
          <div className="ui field">
            <label>Number of results</label>
            <select
              className="ui fluid dropdown"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
      <table className="ui green striped table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Identifiers</th>
            <th>1st Dose</th>
            <th>2nd Dose</th>
            <th>Synchronized</th>
            <th>Problems</th>
            <th>
              <a href={`/immunization/new`}>
                <button className="positive mini ui button">New Patient</button>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <PatientSkeletonRow></PatientSkeletonRow>
            ))}
          {patients.map((i, index) => (
            <PatientRow key={index} patient={i} />
          ))}
        </tbody>
      </table>
      <Pagination
        size={Math.ceil(total / 10)}
        position={Math.floor(offset / 10)}
        setOffset={setOffset}
      />
    </div>
  );
};

export default ImmunizationList;
