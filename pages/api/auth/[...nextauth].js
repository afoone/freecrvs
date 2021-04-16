import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { checkUser } from "../../../services/auth";

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async redirect(url, baseUrl) {
      console.log("these are the callbacks", url, baseUrl);
      return "/";
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.user = user);
      return Promise.resolve(token)   // ...here
  },
  session: async (session, user, sessionToken) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = user.user;
      return Promise.resolve(session)
  }
  },
  providers: [
    Providers.Credentials({
      name: "Username and Password",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorize", credentials.username, credentials.password);
        const user = await checkUser(
          credentials.username,
          credentials.password
        );
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          console.log("user on auth callback", user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
