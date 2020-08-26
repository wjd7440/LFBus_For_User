import React, { useState, useEffect } from "react";
import AppStack from "./src/screens";
import { AsyncStorage } from "react-native";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import apolloClientOptions from "./apollo";

import { ApolloProvider } from "react-apollo-hooks";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  const preLoad = async () => {
    try {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        link: authLink.concat(apolloClientOptions),
      });
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    loaded &&
    client && (
      <ApolloProvider client={client}>
        <AppStack />
      </ApolloProvider>
    )
  );
}
