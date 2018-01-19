import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "Access-Control-Request-Headers": "X-Requested-With"
        }
    }
});

const httpLink = new HttpLink({
    uri:'http://localhost:8080/graphql',
    credentials: 'same-origin'
});

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});