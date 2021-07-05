import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ImmunizationReport from "../../../components/immunization/ImmunizationReport";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import { useState } from "react";
import QRCode from "qrcode.react";

const ImmunizationHome = () => {
  const { id } = useRouter().query;

  const [patient, setPatient] = useState(undefined);
  const [qrCodeCanvas, setQrCodeCanvas] = useState(undefined);
  const [qrCodeDataUri, setqrCodeDataUri] = useState(undefined);

  useEffect(() => {
    id &&
      axios.get(`/api/patients/${id}/`).then((res) => {
        setPatient(res.data);
      });
  }, [id]);

  setTimeout(() => {
    setQrCodeCanvas(document.querySelector("canvas"));
    setqrCodeDataUri(qrCodeCanvas?.toDataURL("image/jpg", 0.3));
  }, 300);

  return (
    <>
      {patient && (
        <>
          <div style={{ width: 0, height: 0, marginLeft: 10, marginTop: 10 }}>
            <QRCode value={patient._id} width="0px" />
          </div>
          {qrCodeDataUri && (
            <PDFViewer width="100%" height="800px">
              <ImmunizationReport
                patient={patient}
                qrcode={qrCodeDataUri}
              ></ImmunizationReport>
            </PDFViewer>
          )}
        </>
      )}
    </>
  );
};

export default ImmunizationHome;
