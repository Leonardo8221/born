import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        KeycloakProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            issuer: process.env.NEXT_PUBLIC_CLIENT_ISSUER,
        }),
        // ...add more providers here
    ],
};

export default NextAuth(authOptions);