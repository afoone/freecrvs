import React from "react";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";

const AuthHOC = ({ roles, children }) => {
  const [session, loading] = useSession();
  const router = useRouter()

  console.log("roles", roles);
  console.log(loading, session);
  if (loading) return null;

  if (!loading && !session) {
    router.push('/auth/signin?callbackurl=/immunization')
    return <p>Access Denied</p>;
  }

  return <div>{children}</div>;
};

export default AuthHOC;
