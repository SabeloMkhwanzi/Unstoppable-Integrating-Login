import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";

import { Text, Box, Avatar } from "@chakra-ui/react";

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();

  // const isInchDex = useMemo(
  //   () => (Moralis.Plugins?.oneInch ? true : false),
  //   [Moralis.Plugins?.oneInch]
  // );

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Box mt="15%">
        <>
          <Text as="h1" fontSize="4xl" fontWeight="bold">
            {" "}
            Welcome to GENESIS Most intermediate and advanced Defi multiple
            chains Portfolio Wallet.{" "}
          </Text>
          <Text
            color="#161853"
            as="u"
            mx="8%"
            textAlign="center"
            fontSize="3xl"
            fontWeight="bold"
          >
            Powered by Unstoppable Domains Helping users to Login with there
            Unstoppable Domains.
          </Text>
          <Avatar
            alignItems="center"
            size="2xl"
            name="unstoppable domains"
            src="https://crypto.jobs/storage/company-logos/yC2CISvH6kg2kZkNnzbACeuxOHmlYZj9rzsDbeVx.png"
            mt="2%"
            mx="50%"
          />
        </>
      </Box>
    </div>
  );
}
