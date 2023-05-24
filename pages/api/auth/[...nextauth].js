import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare, hash } from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_AUTH_TOKEN;

const client = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: `Bearer ${graphcmsToken}`,
  },
});

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "peterparker@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async ({ email, password, isRegister }) => {
        isRegister = isRegister === "true";

        const { user } = await client.request(GetUserByEmail, {
          email,
        });

        if (isRegister) {
          // Register user
          console.log("Registering user....");

          if (user) {
            console.log("User already been created");
            throw new Error("User already been created");
            return;
          }

          const { newUser } = await client.request(CreateNextUserByEmail, {
            email,
            password: await hash(password, 12),
          });
          return {
            id: newUser.id,
            username: email,
            email,
          };
        } else {
          // Log in user
          console.log("Signing in user....");

          if (!user) {
            throw new Error("Wrong email or password. Try again.");
          }

          const isValid = await compare(password, user.password);

          if (!isValid) {
            throw new Error("Wrong email or password. Try again.");
          }

          return {
            id: user.id,
            username: email,
            email,
          };
        }
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
