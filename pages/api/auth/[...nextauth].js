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

        // const user = () => {
        //   // You need to provide your own logic here that takes the credentials
        //   // submitted and returns either a object representing a user or value
        //   // that is false/null if the credentials are invalid.
        //   // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        //   return { id: 1, name: "J Smith", email: "jsmith@example.com" };
        // };

        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
