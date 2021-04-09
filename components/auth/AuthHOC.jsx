import React from "react";
import { useSession, getSession } from "next-auth/client";

const AuthHOC = ({ roles, children }) => {
  const [session, loading] = useSession();

  console.log("roles", roles);
  console.log(loading, session);
  if (loading) return null;

  if (!loading && !session) return <p>Access Denied</p>;

  return <div>{children}</div>;
};

export default AuthHOC;
