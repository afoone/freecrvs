import React from "react";
import ImmunizationLayout from "../../components/immunization/Layout";
import ImmunizationList from "../../components/ImmunizationList";
import { useRouter } from "next/router";
import AuthHOC from "../../components/auth/AuthHOC";

const ImmunizationHome = () => {
  return (
    <AuthHOC>
      <ImmunizationLayout>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "5%",
          }}
        >
          The Gambia COVID-19 Vaccination Form
        </h1>
        <ImmunizationList></ImmunizationList>
      </ImmunizationLayout>
    </AuthHOC>
  );
};

export default ImmunizationHome;
