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
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
  },
  qr: {
    width: 100,
    height: 100,
    marginLeft: 100,
  },
  rectangulo: {
    display: "flex",
    width: "200px",
    height: "40px",
    border: 1,
    justifyContent: "center",
  },
  textDesign: {
    textAlign: "center",
  },
  marginTop: {
    marginTop: "3%",
  },
  preDosis: {
    display: "flex",
    alignItems: "center",
  },
  titleDosis: {
    marginTop: "4%",
    display: "flex",
    textDecoration: "underline",
    marginBottom: "2%",
  },
  divTable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

// Create Document Component
const ImmunizationReport = ({ patient, qrcode }) => {
  console.log("patient", patient);
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src="/images/logo2.png" size="large" style={styles.image} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "5%",
              }}
            >
              <Text wrap={false} style={styles.title}>
                The Gambia Patient Immunization Certificate
              </Text>
            </div>
            {qrcode && (
              <Image source={{ uri: qrcode }} size="large" style={styles.qr} />
            )}
          </View>
          <View style={styles.section}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>Full Name:</Text>
                </div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>Nationality:</Text>
                </div>

                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>Date of Birth:</Text>
                </div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>Mobile Number:</Text>
                </div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>NIN:</Text>
                </div>
              </div>
              <div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>
                    {patient.firstName} {patient.middleName} {patient.lastName}
                  </Text>
                </div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>{patient.nationality}</Text>
                </div>

                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>{patient.dateOfBirth}</Text>
                </div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>{patient.phoneNumber}</Text>
                </div>
                <div style={styles.rectangulo}>
                  <Text style={styles.textDesign}>
                    {patient.NIN ? patient.NIN : "None"}
                  </Text>
                </div>
              </div>
            </div>
            <div>
              <div style={styles.preDosis}>
                <Text style={styles.titleDosis}>First Dose:</Text>
              </div>
              <div style={styles.divTable}>
                <div>
                  <div style={styles.rectangulo}>
                    <Text style={styles.textDesign}>Vaccine Name:</Text>
                  </div>
                  <div style={styles.rectangulo}>
                    <Text style={styles.textDesign}>Date of Application:</Text>
                  </div>

                  <div style={styles.rectangulo}>
                    <Text style={styles.textDesign}>Batch o:</Text>
                  </div>
                </div>
                <div>
                  <div style={styles.rectangulo}>
                    <Text style={styles.textDesign}>
                      {patient.vaccination[0]?.nameOfTheVaccine}
                    </Text>
                  </div>
                  <div style={styles.rectangulo}>
                    <Text style={styles.textDesign}>
                      {patient.vaccination[0]?.firstDoseDate}
                      {patient.vaccination[0]?.date}
                    </Text>
                  </div>

                  <div style={styles.rectangulo}>
                    <Text style={styles.textDesign}>
                      {patient.vaccination[0]?.batchNumber}
                    </Text>
                  </div>
                </div>
              </div>
              <div>
                <div style={styles.preDosis}>
                  <Text style={styles.titleDosis}>Second Dose:</Text>
                </div>
                <div style={styles.divTable}>
                  <div>
                    <div style={styles.rectangulo}>
                      <Text style={styles.textDesign}>Vaccine Name:</Text>
                    </div>
                    <div style={styles.rectangulo}>
                      <Text style={styles.textDesign}>
                        Date of Application:
                      </Text>
                    </div>

                    <div style={styles.rectangulo}>
                      <Text style={styles.textDesign}>Batch o:</Text>
                    </div>
                  </div>
                  <div>
                    <div style={styles.rectangulo}>
                      <Text style={styles.textDesign}>
                        {patient.vaccination[1]?.nameOfTheVaccine}
                      </Text>
                    </div>
                    <div style={styles.rectangulo}>
                      <Text style={styles.textDesign}>
                        {patient.vaccination[1]?.firstDoseDate}
                      </Text>
                    </div>

                    <div style={styles.rectangulo}>
                      <Text style={styles.textDesign}>
                        {patient.vaccination[1]?.batchNumber}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "13%",
              }}
            >
              <div
                style={{
                  height: "2px",
                  width: "40%",
                  backgroundColor: "black",
                  marginLeft: "3%",
                }}
              />

              <div
                style={{
                  height: "2px",
                  width: "40%",
                  backgroundColor: "black",
                  marginRight: "3%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginLeft: "6%",
              }}
            >
              <Text>Signature of Registrar</Text>
              <Text style={{ marginLeft: "2%" }}>
                Date Certified (DD/MM/YYYY)
              </Text>
            </div>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default ImmunizationReport;
