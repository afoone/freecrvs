import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Canvas,
} from "@react-pdf/renderer";
import PatientData from "../PatientData";
import QRCode from "qrcode.react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const ImmunizationReport = ({ patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <table >
          <td>
          <Text>Section #1</Text>
          </td>
          <td><Text>otra cosa</Text></td>
        </table>
        
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "20%",
            height: "20%",
          }}
        >
          <Image src="/images/logo2.png" size="medium" />

          {/* <Canvas width="200px" height="200px">
            <QRCode value={patient._id} size={200} renderAs="canvas" />
          </Canvas> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* {patient && <PatientData patient={patient} />} */}
          <Text style={{ fontWeight: "bold" }}>{patient.firstName}</Text>
        </div>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default ImmunizationReport;
