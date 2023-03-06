import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Layout from "../components/layouts/DefaultLayout";
import "../assets/css/global.css";

// create http link to your graphql endpoint
const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_DEV_GRAPHQL_ENDPOINT,
});

// create error link to handle errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

// create auth link to set authorization header
const authLink = setContext((_, { headers }) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(process.env.NEXT_PUBLIC_DEV_GRAPHQL_ENDPOINT)
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    };
});

// create apollo client instance
const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
}