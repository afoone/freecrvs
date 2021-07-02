import React, { useRef, useState, useEffect } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button } from "@progress/kendo-react-buttons";
import { Card, Icon, Image, Grid, Segment } from "semantic-ui-react";

import axios from "axios";
import PatientData from "../PatientData";
const ImmunizationReport = ({ id }) => {
  const pdfExportComponent = useRef(null);
  const handleExport = (e) => {
    pdfExportComponent.current.save();
  };

  const [patient, setPatient] = useState({});

  useEffect(() => {
    axios.get(`/api/patients/${id}/`).then((res) => {
      setPatient(res.data);
    });
  }, [id]);

  console.log("patient", patient);

  return (
    <PDFExport ref={pdfExportComponent} paperSize="A4">
      <div
        className="button-area"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button primary={true} onClick={handleExport}>
          Download PDF
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "20%",
          height: "20%",
        }}
      >
        <Image src="/images/logo2.png" size="medium" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {patient && <PatientData patient={patient} />}
      </div>

      <Grid columns="equal">
        <Grid.Column>
          <Segment>Full Name:</Segment>
          <Segment>Nationality:</Segment>
          <Segment>Vaccine Name:</Segment>
          <Segment>Date of Application:</Segment>
          <Segment>Batch o:</Segment>
          <Segment>Date of Birth:</Segment>
          <Segment>Mobile Number:</Segment>
          <Segment>NIN:</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            {patient.firstName} {patient.middleName} {patient.lastName}
          </Segment>
          <Segment>{patient.nationality}</Segment>
          {/* <Segment>{patient.vaccination.nameOfTheVaccine}</Segment> */}
          <Segment>Date of Application:</Segment>
          <Segment>Date of Application:</Segment>
          <Segment>Date of Application:</Segment>
          {/* <Segment>{patient.vaccination[0].batchNumber}</Segment> */}
          <Segment>{patient.dateOfBirth}</Segment>
          <Segment>{patient.phoneNumber}</Segment>
          <Segment>{patient.NIN ? patient.NIN : "None"}</Segment>
        </Grid.Column>
      </Grid>
    </PDFExport>
  );
};

export default ImmunizationReport;
