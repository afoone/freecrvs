import { useSession, signIn, signOut } from "next-auth/client";
import { Icon, Button } from "semantic-ui-react";

const LogoutButton = () => {
  return (
    <a href="#" onClick={() => signOut()}>
      Sign out
    </a>
  );
};

const LoginButton = () => {
  return (
    <a href="#" onClick={() => signIn()}>
      Sign in{" "}
    </a>
  );
};

export default function Logout() {
  const [session, loading] = useSession();
  return (
    <div>
      <Icon name="user md" />
      {session ? `Signed in as ${session.user.email}` : "Not signed in"} <br />
      {session ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
