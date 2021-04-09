import React from "react";
import ImmunizationLayout from "../../components/immunization/Layout";
import { useRouter } from "next/router";
import ImmunizationForm from "../../components/immunization/ImmunizationForm";

const ImmunizationHome = () => {
  const { id } = useRouter().query;

  return (
    <ImmunizationLayout>
      <h1>The Gambia COVID-19 Vaccination Form</h1>
      {id && <ImmunizationForm id={id}></ImmunizationForm>}
    </ImmunizationLayout>
  );
};

export default ImmunizationHome;
