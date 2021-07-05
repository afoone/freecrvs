import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ImmunizationReport from "../../../components/immunization/ImmunizationReport";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import { useState } from "react";

const ImmunizationHome = () => {
  const { id } = useRouter().query;

  const [patient, setPatient] = useState(undefined);

  useEffect(() => {
    id &&
      axios.get(`/api/patients/${id}/`).then((res) => {
        setPatient(res.data);
      });
  }, [id]);

  return (
    <>
      {patient && (
        <PDFViewer width="100%" height="800px">
          <ImmunizationReport patient={patient}></ImmunizationReport>
        </PDFViewer>
      )}
    </>
  );
};

export default ImmunizationHome;
