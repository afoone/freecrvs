import React from "react";
import ImmunizationLayout from "../../../components/immunization/Layout";
import { useRouter } from "next/router";
import ImmunizationReport from "../../../components/immunization/immunizationReport";

const ImmunizationHome = () => {
  const { id } = useRouter().query;

  return (
    <ImmunizationLayout>
      {id && <ImmunizationReport id={id}></ImmunizationReport>}
    </ImmunizationLayout>
  );
};

export default ImmunizationHome;
