import { getCsrfToken } from "next-auth/client";
import { Button, Card, Image } from "semantic-ui-react";

export default function SignIn({ csrfToken }) {
  return (
    <Card centered color="olive">
          <Image src='/images/gambia.png' wrapped ui={false} />

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
