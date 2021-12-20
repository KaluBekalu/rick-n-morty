import { useState, useEffect, createContext } from "react";
import Home from "./components/home/Home";
import { RootContext } from "./contexts/Context";
import { Route, Routes } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { ErrorLink, onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) => {
      alert(message);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [gqldata, setgqlData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setmodalId] = useState();
  const [modalData, setModaldata] = useState([]);

  return (
    <div className="App">
      <RootContext.Provider
        value={{
          showModal,
          modalData,
          modalId,
          gqldata,
          setgqlData,
          setmodalId,
          setShowModal,
          setModaldata,
        }}
      >
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ApolloProvider>
      </RootContext.Provider>
    </div>
  );
}

export default App;
