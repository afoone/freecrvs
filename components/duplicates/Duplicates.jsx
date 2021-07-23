import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { printDuplicateTitle } from "./duplicatesPresenter";

const Duplicate = ({ duplicate, removeDuplicate, refreshItems }) => {
  const mergeDuplicates = () => {
    axios
      .post("/api/patients/duplicates/merge", duplicate.documents)
      .then(removeDuplicate(duplicate));
  };

  const deletePatient = (id) => {
    axios.delete(`/api/patients/${id}`).then(() => {
      refreshItems();
    });
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>{printDuplicateTitle(duplicate)}</h3>
      <table className="ui table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Vaccination Date 1st Dose</th>
            <th>Vaccination Date 2n Dose</th>
            <th>
              <button className="ui positive button" onClick={mergeDuplicates}>
                Merge
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {duplicate.documents.map((d) => (
            <tr key={d._id}>
              <td>{d.firstName}</td>
              <td>{d.middleName}</td>
              <td>{d.lastName}</td>
              <td>{new Date(d.dateOfBirth).toLocaleDateString()}</td>
              <td>
                {d.vaccination[0]?.date || d.vaccination[0]?.firstDoseDate}
              </td>
              <td>
                {d.vaccination[1]?.date || d.vaccination[1]?.firstDoseDate}
              </td>
              <td>
                <Link href={`/immunization/${d._id}`}>
                  <button className="ui button mini primary">Edit</button>
                </Link>
                <button
                  className="negative mini ui button"
                  onClick={() => deletePatient(d._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Duplicates = () => {
  const [duplicates, setDuplicates] = useState([]);

  const removeDuplicate = (duplicate) => {
    console.log(duplicate);
    setDuplicates(
      duplicates.filter((i) => {
        if (duplicate.nin) return i.nin !== duplicate.nin;
        else {
          if (i.nameAndDate)
            return (
              i.nameAndDate.firstName !== duplicate.nameAndDate.firstName &&
              i.nameAndDate.lastName !== duplicate.nameAndDate.lastName &&
              i.nameAndDate.dateOfBirth !== duplicate.nameAndDate.dateOfBirth
            );
        }
      })
    );
  };

  useEffect(() => {
    refreshItems();
  }, []);

  const refreshItems = () => {
    axios
      .get("/api/patients/duplicates")
      .then((res) => setDuplicates(res.data));
    //   .catch(console.error);
  };

  return (
    <div>
      <h1 className="ui header">Duplicates</h1>
      {duplicates.map((d, index) => (
        <Duplicate
          duplicate={d}
          key={index}
          removeDuplicate={removeDuplicate}
          refreshItems={refreshItems}
        ></Duplicate>
      ))}
    </div>
  );
};

export default Duplicates;
