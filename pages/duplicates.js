import React from "react";
import Duplicates from "../components/duplicates/Duplicates";
import AuthHOC from "../components/auth/AuthHOC";

const duplicates = () => {
  return (
    <div>
      <AuthHOC>
        <div>
          <Duplicates />
        </div>
      </AuthHOC>
    </div>
  );
};

export default duplicates;
