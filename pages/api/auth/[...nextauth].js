import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import CreateAccount from "../../../schema/CreateAccount";
import dbConnect from "../../../utils/DBconnect";
import { compare } from "bcrypt";
dbConnect();
let email = "";
export default (req, res) => {
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      Providers.Email({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
      Providers.Credentials({
        async authorize(credentials) {
          //Connect to DB

          //Get  the  requested users
          const user = await CreateAccount.findOne({
            email: credentials.email,
          });

          //Not found - send error res
          if (!user) {
            throw new Error("No user found with the email ! Sign up");
          }
          //Check hased password with DB password
          const checkPassword = await compare(
            credentials.password,
            user.password
          );
          //Incorrect password - send response
          if (!checkPassword) {
            throw new Error("Email or Password is incorrect");
          }
          //Else send success response

          let payload = {
            name: user.fisrtName,
            lastName: user.lastName,
            email: user.email,
            image: user.avatar,
            id: user._id,
          };
          if (user) {
            return payload;
          }
        },
      }),
    ],
    database: process.env.MONGODB_URI,
    debug: process.env.NODE_ENV !== "development",
    secret: process.env.JWT_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      session: async (session, user, sessionToken) => {
        const userDatabase = await CreateAccount.findOne({
          email: user.email,
        });
        const userData = {
          name: userDatabase.firstName,
          lastName: userDatabase.lastName,
          email: userDatabase.email,
          image: userDatabase.avatar,
          id: userDatabase._id,
        };

        session.user = userData;
        return Promise.resolve(session);
      },
    },
    session: {
      jwt: true,
    },
    pages: {
      signin: "/register",
      signout: "/",
      error: "/register",
    },
  });
};
