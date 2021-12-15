/* eslint-disable react/jsx-no-undef */
import UAuth from "@uauth/js";
import { Avatar, Button, Container, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const uauth = new UAuth({
  clientID: "+87KQ7mOW0BrCrL8P2GBAiwUogPIAUBxvrqjQDHbALQ=",
  clientSecret: "ah8hxP+kJFjlP5fAbTMRaGlzPF7H1cO/SjhGrsP6xL0=",
  redirectUri: "https://genesiswallet.vercel.app/callback",
  postLogoutRedirectUri: "https://genesiswallet.vercel.app/",
  scope: "openid email wallet",
});

function Account() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  //Login/out Functions

  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  if (error) {
    console.error(error);
    return <App />;
  }

  console.log(loading);

  if (user) {
    return (
      <>
        <div>
          <Container>
            <HStack>
              <Text borderRadius="2lg" color="#FAEDF0">
                {user.sub}
              </Text>
              <Button
                borderRadius="3xl"
                bgColor="#FAEDF0"
                onClick={handleLogout}
              >
                <Avatar
                  size="sm"
                  name="unstoppable domains"
                  src="https://crypto.jobs/storage/company-logos/yC2CISvH6kg2kZkNnzbACeuxOHmlYZj9rzsDbeVx.png"
                  mr={2}
                />
                Logout
              </Button>
            </HStack>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Container py={2}>
        <HStack>
          <Button borderRadius="3xl" bgColor="#FAEDF0" onClick={handleLogin}>
            <Avatar
              size="sm"
              name="unstoppable domains"
              mr={2}
              src="https://crypto.jobs/storage/company-logos/yC2CISvH6kg2kZkNnzbACeuxOHmlYZj9rzsDbeVx.png"
            />
            connect
          </Button>
        </HStack>
      </Container>
    </>
  );
}
export default Account;
