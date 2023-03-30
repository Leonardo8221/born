import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    // Configure one or more authentication providers

    providers: [
        KeycloakProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "born-ui",
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "bqNTOGPXaivza7elslad4nZNIAgWlB41",
            issuer: process.env.NEXT_PUBLIC_CLIENT_ISSUER || "https://alkeon-dev-sso-dot-master-works-375211.ew.r.appspot.com/auth/realms/Born",
            accessTokenUrl: process.env.NEXT_ACCESS_TOKEN_URL || 'https://alkeon-dev-sso-dot-master-works-375211.ew.r.appspot.com/auth/realms/Born/protocol/openid-connect/token',
            authorizationUrl: process.env.NEXT_AUTH_URL || 'https://alkeon-dev-sso-dot-master-works-375211.ew.r.appspot.com/auth/realms/Born/protocol/openid-connect/auth'
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