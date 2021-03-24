import axios from "axios";
import React, { useEffect, useState } from "react";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("/api/patients/").then((res) => setPatients(res.data));
    return () => {};
  }, []);

  return (
    <div className="patients-page">
      <table>
        <thead>
          <th>Full Name</th>
        </thead>
        <tbody>
          {patients.map((i) => (
            <tr>
              {i.firstName} {i.middleName} {i.lastName}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
