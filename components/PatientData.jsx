import React, { useState } from "react";
import { getFullName, getIdentifiers } from "./ImmunizationList";
import QRCode from "qrcode.react";
import styles from "./PatientData.module.css";
import axios from "axios";

const PatientData = ({ patient, image, setImage }) => {
  const [changingPhoto, setChangingPhoto] = useState(false);
  const [file, setFile] = useState("");

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("image", file, file.name);

    // Details of the uploaded file
    console.log(file);

    // Request made to the backend api
    // Send formData object
    axios.post(`/api/images/${patient._id}`, formData).then((res) => {
      setChangingPhoto(false);
      setImage(res.data.filename);
    });
  };

  return (
    <div>
      <div className="ui card">
        <div className="image">
          {!changingPhoto && (
            <img
              onClick={() => setChangingPhoto(true)}
              src={
                image
                  ? `/uploads/${image}`
                  : patient.gender === "M"
                  ? "http://www.multimediaenglish.org/wp-content/uploads/2011/11/MysteryMan.jpg"
                  : "https://www.citycentrerecruitment.co.uk/wp-content/uploads/2019/03/mystery-woman.jpg"
              }
            />
          )}
          {changingPhoto && (
            <div className="">
              <div>
                <input
                  type="file"
                  name="image"
                  id="file-input"
                  className={styles.inputfile}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label for="file-input" className="ui primary button">
                  Choose a file
                </label>
              </div>
              {file && (
                <div>
                  {/* <div>{file}</div> */}
                  <button className="ui positive button" onClick={onFileUpload}>
                    Upload
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="content">
          <a className="header">{patient._id && getFullName(patient)}</a>
          <div className="meta">
            {patient._id ? (
              <span className="date">
                Birth Date: {new Date(patient.dateOfBirth).toLocaleDateString()}
              </span>
            ) : (
              <span className="date">New Patient</span>
            )}
          </div>
          <div className="description"></div>
        </div>
        <div className="extra content">
          {patient && getIdentifiers(patient)}
        </div>
      </div>
      <div style={{ textAlign: "center", paddingTop: "1rem" }}>
        {patient._id && (
          <QRCode value={patient._id} size={200} renderAs="svg" />
        )}
      </div>
    </div>
  );
};

export default PatientData;
