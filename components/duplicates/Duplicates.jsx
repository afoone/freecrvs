import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Duplicate = ({ duplicate, removeDuplicate }) => {
  const mergeDuplicates = () => {
    axios
      .post("/api/patients/duplicates/merge", duplicate.documents)
      .then(removeDuplicate(duplicate.nin));
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>NIN {duplicate.nin}</h3>
      <table className="ui table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
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
                <button className="ui mini primary">Edit</button>
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

  const removeDuplicate = (nin) => {
    console.log("remove duplicate", nin, duplicates.filter((i) => i.nin !== nin));
    setDuplicates(duplicates.filter((i) => i.nin !== nin));
  };

  useEffect(() => {
    axios
      .get("/api/patients/duplicates")
      .then((res) => setDuplicates(res.data));
    //   .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="ui header">Duplicates</h1>
      {duplicates.map((d) => (
        <Duplicate
          duplicate={d}
          key={d.nin}
          removeDuplicate={removeDuplicate}
        ></Duplicate>
      ))}
    </div>
  );
};

export default Duplicates;
