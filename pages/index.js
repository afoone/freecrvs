import { useSession, signIn, signOut } from "next-auth/client";
import 'semantic-ui-css/semantic.min.css'


export default function Home() {
  const [session, loading] = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
