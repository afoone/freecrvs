import { getCsrfToken } from "next-auth/client";
import { Button, Card, Image, Message } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }) {
  const router = useRouter();

  const { error } = router.query;

  return (
    <>
    <Message negative>
      <Message.Header >Invalid Credentials</Message.Header>
      <p>Sorry, either your username or password are wrong. Please try again or contact the administrator</p>
    </Message>
      <Card centered color="olive">
        <Image src="/images/logo2.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Login</Card.Header>
        </Card.Content>
        <Card.Content>
          <form
            method="post"
            className="ui form"
            action="/api/auth/callback/credentials"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
              Username
              <input name="username" type="text" />
            </label>
            <label>
              Password
              <input name="password" type="password" />
            </label>
            <div style={{ width: "100%", marginTop: "1rem" }}>
              <Button color="primary" type="submit" floated="right">
                Sign in
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
