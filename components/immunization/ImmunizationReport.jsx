import React, { useRef, useState, useEffect } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button } from "@progress/kendo-react-buttons";
import { Card, Icon, Image } from "semantic-ui-react";
import axios from "axios";
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

  console.log("patient", patient.firstName);

  return (
    <PDFExport ref={pdfExportComponent} paperSize="A4">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="button-area">
          <Button primary={true} onClick={handleExport}>
            Download PDF
          </Button>
        </div>
        <Card>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>Full Name:{patient.firstName} </Card.Header>
            <Card.Header>Nationality:</Card.Header>
            <Card.Header>Vaccine Name:</Card.Header>
            <Card.Header>Date of Application:</Card.Header>
            <Card.Header>Batch o:</Card.Header>
            <Card.Header>Date of Birth:</Card.Header>
            <Card.Header>Mobile Number:</Card.Header>
            <Card.Header>NIN:</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
              Daniel is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              10 Friends
            </a>
          </Card.Content>
        </Card>
      </div>
    </PDFExport>
  );
};

export default ImmunizationReport;
