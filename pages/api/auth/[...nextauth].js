import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { checkUser } from "../../../services/auth";
const { BASE_URL } = process.env;

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      console.log("these are the callbacks", url, baseUrl, BASE_URL)
      return '/'
      // return url.startsWith(baseUrl)
        // ? url
        // : 
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
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
