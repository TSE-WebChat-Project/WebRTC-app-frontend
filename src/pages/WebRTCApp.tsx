import React from "react";
import {
  AuthenticationProvider,
  EnforceAuthentication,
} from "../components/Authentication";
import Navbar from "../components/Navbar";

export default function WebRTCApp() {
  return (
    <>
      <AuthenticationProvider
        allowLoginOverlay={true}
        allowExitLoginOverlay={false}
      >
        <Navbar />
        <EnforceAuthentication />
      </AuthenticationProvider>
    </>
  );
}
