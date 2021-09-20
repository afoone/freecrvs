import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { Button, Header, Icon, Modal, Popup, Grid } from 'semantic-ui-react';
import {
  getIdentifiers,
  Errors,
  firstDoseVaccinated,
  secondDoseVaccinated,
} from './immunizationListPresenter';
import DatePicker from 'react-datepicker';
export const getFullName = (patient) => {
  return `${patient.firstName}  ${patient.middleName || ''} ${
    patient.lastName
  }`;
};

const PatientRow = ({ patient, setOpen }) => {
  const deletePatient = (id) => {
    setOpen(id);
  };

  const titlesArray = [
    'Name:',
    'Birth Date:',
    'Gender:',
    '1st Dose:',
    '2nd Dose:',
    'Synchronized:',
    'Identifiers:',
  ];

  return (
    <tr>
      <td>
        <Popup content="Add users to your feed" trigger={<Button icon="eye" />}>
          <Grid
            centered
            divided
            style={{
              width: '400px',
            }}
          >
            <Grid.Row
              textAlign="center"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                }}
              >
                {titlesArray.map((d) => (
                  <Header style={{ marginTop: '5%' }} as="h4">
                    {d}
                  </Header>
                ))}
              </div>
              <div style={{ marginTop: '2%' }}>
                <p>{getFullName(patient)}</p>
                <p>
                  {patient.dateOfBirth
                    ? new Date(patient.dateOfBirth).toLocaleDateString()
                    : '-'}
                </p>
                <p>{patient.gender === 'M' ? 'Male' : 'Female'}</p>
                <p>
                  {firstDoseVaccinated(patient) ? (
                    <i
                      style={{ marginTop: '15%' }}
                      className="check icon green"
                    ></i>
                  ) : (
                    <i className="close icon red"></i>
                  )}
                </p>
                <p>
                  {secondDoseVaccinated(patient) ? (
                    <i className="check icon green"></i>
                  ) : (
                    <i className="close icon red"></i>
                  )}
                </p>
                <p>
                  {patient.pending ? (
                    <i className="close icon red"></i>
                  ) : (
                    <i className="check icon green"></i>
                  )}
                </p>
                <br />
                {getIdentifiers(patient) != '' ? (
                  <p>{getIdentifiers(patient)}</p>
                ) : (
                  '-'
                )}
              </div>
            </Grid.Row>
          </Grid>
        </Popup>
      </td>
      <td>
        <Link href={`/immunization/${patient._id}/report`}>
          <button
            class="ui basic button"
            style={{
              width: '2%',
            }}
          >
            <i
              class="big file icon"
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                left: -10,
              }}
            />
          </button>
        </Link>
      </td>

      <td>{getFullName(patient)}</td>
      <td>
        {patient.dateOfBirth &&
          new Date(patient.dateOfBirth).toLocaleDateString()}
      </td>
      <td>{patient.gender === 'M' ? 'Male' : 'Female'}</td>
      <td>{getIdentifiers(patient)}</td>

      <td>
        {firstDoseVaccinated(patient) ? (
          <i className="check icon green"></i>
        ) : (
          <i className="close icon red"></i>
        )}
      </td>
      <td>
        {secondDoseVaccinated(patient) ? (
          <i className="check icon green"></i>
        ) : (
          <i className="close icon red"></i>
        )}
      </td>
      <td>
        {patient.pending ? (
          <i className="close icon red"></i>
        ) : (
          <i className="check icon green"></i>
        )}
      </td>
      <td>
        <Errors patient={patient}></Errors>
      </td>
      <td>
        {!patient.pending && (
          <div className="ui buttons">
            <Link href={`/immunization/${patient._id}`}>
              <button className="primary mini ui button">Edit</button>
            </Link>
            <div className="or"></div>
            <button
              className="negative mini ui button"
              onClick={() => deletePatient(patient._id)}
            >
              Delete
            </button>
          </div>
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
            index === position ? 'blue' : 'grey'
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
  const [count, setCount] = useState(100);
  const [searchGiven, setSearchGiven] = useState('');
  const [searchLast, setSearchLast] = useState('');
  const [searchBirthDate, setSearchBirthDate] = useState(new Date());
  console.log('searchBirthDate', searchBirthDate);
  const [searchNIN, setSearchNIN] = useState('');
  const [searchToday, setSearchToday] = useState(false);

  const immunization = useSelector((state) => state.immunization);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
    let url = '';
    if (searchGiven) {
      url += `&firstName=${searchGiven}`;
    }
    if (searchLast) {
      url += `&lastName=${searchLast}`;
    }
    if (searchNIN) {
      url += `&NIN=${searchNIN}`;
    }
    // if (searchBirthDate) {
    //   url += `&NIN=${searchBirthDate}`;
    // }
    //ALFONSO
    if (searchToday) {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      url += `&_lastUpdated=gt${date.getFullYear()}-${
        date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
    }

    getPatientsWithParams(url);
  };

  const resetSearch = () => {
    setSearchGiven('');
    setSearchLast('');
    setSearchNIN('');
    setSearchBirthDate('');
    getPatientsWithParams();
  };

  const performDeletion = () => {
    axios.delete(`/api/patients/${open}`).then(() => {
      setOpen(undefined);
      searchPatients();
    });
  };

  return (
    <div className="immunization-list">
      {open && (
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          trigger={<Button>Basic Modal</Button>}
        >
          <Header icon>
            <Icon name="delete" />
            Delete patient.
          </Header>
          <Modal.Content>
            <p>
              This operation is not reversible. Are you sure to perform the
              delete?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={() => setOpen(false)}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={() => performDeletion()}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )}
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
          <div className="datepicker-full">
            <DatePicker
              isClearable
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              selected={searchBirthDate}
              onChange={(date) => setSearchBirthDate(date)}
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
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
            </select>
          </div>
        </div>
      </div>
      <table className="ui green striped table">
        <thead>
          <tr>
            <th />
            <th />
            <th>Name</th>
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Identifiers</th>
            <th>1st Dose</th>
            <th>2nd Dose</th>
            <th>Synchronized</th>
            <th>Problems</th>
            <th>
              <Link href={`/immunization/new`}>
                <button className="positive mini ui button">New Patient</button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <PatientSkeletonRow key={i}></PatientSkeletonRow>
            ))}
          {patients.map((i, index) => (
            <PatientRow key={index} patient={i} setOpen={setOpen} />
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
