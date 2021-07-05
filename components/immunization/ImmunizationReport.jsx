import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { NonceProvider } from "react-select";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "50%",
  },
  header: {
    padding: 30,
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100
  },
  qr: {
    width: 100,
    height: 100,
    marginLeft: 100
  },
});

// Create Document Component
const ImmunizationReport = ({ patient, qrcode }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src="/images/logo2.png" size="large" style={styles.image} />
            <Text wrap={false} style={styles.title}>
              The Gambia Patient Immunization Certificate
            </Text>
            {qrcode && (
              <Image
                source={{ uri: qrcode }}
                size="large"
                style={styles.qr}
              />
            )}
          </View>
          <View style={styles.section}>

            

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "20%",
                height: "20%",
              }}
            ></div>
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
    </>
  );
};

export default ImmunizationReport;
