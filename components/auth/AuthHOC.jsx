import React from "react";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";

const AuthHOC = ({ roles, children, admin }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  console.log("roles", roles);
  console.log(loading, session);
  if (loading) return null;

  if (!admin && !loading && !session) {
    router.push(`/auth/signin`);
    return <p>Access Denied</p>;
  }

  if (!loading && admin && session && session.user && session.user.role != "ADMIN") {
    return <></>;
  }

  return <div>{children}</div>;
};

export default AuthHOC;
