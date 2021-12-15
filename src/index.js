import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const APP_ID = "5l3S8AAj7MtMSNZbLoOkdSiN8AVOEHnZRNc6PqDU";
const SERVER_URL = "https://nxj1hsc3m8wc.usemoralis.com:2053/serverL";

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App isServerInfo />
        </ChakraProvider>
      </MoralisProvider>
    );
};

ReactDOM.render(<Application />, document.getElementById("root"));
