import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    // Configure one or more authentication providers

    providers: [
        KeycloakProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            issuer: process.env.NEXT_PUBLIC_CLIENT_ISSUER,
            accessTokenUrl: 'https://alkeon-dev-sso-dot-master-works-375211.ew.r.appspot.com/auth/realms/Born/protocol/openid-connect/token',
            authorizationUrl: 'https://alkeon-dev-sso-dot-master-works-375211.ew.r.appspot.com/auth/realms/Born/protocol/openid-connect/auth'
        }),
        // ...add more providers here
    ],
    callbacks: {
        jwt: ({ token, account, ...rest }) => {
            console.log(token, account, rest)
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.token = token.accessToken;
            return session
        }
    },
};

export default NextAuth(authOptions);