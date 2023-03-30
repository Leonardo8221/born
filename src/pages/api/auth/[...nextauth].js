import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    // Configure one or more authentication providers

    providers: [
        KeycloakProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            issuer: process.env.NEXT_PUBLIC_CLIENT_ISSUER,
            accessTokenUrl: process.env.NEXT_ACCESS_TOKEN_URL,
            authorizationUrl: process.env.NEXT_AUTHORIZATION_URL
        }),
        // ...add more providers here
    ],
    callbacks: {
        jwt: ({ token, account, ...rest }) => {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.token = token.accessToken;
            return session
        },
        redirect: async ({ url, baseUrl }) => {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
};

export default NextAuth(authOptions);