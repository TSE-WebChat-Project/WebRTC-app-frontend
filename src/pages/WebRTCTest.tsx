import React from "react";
import {
  AuthenticationProvider,
  EnforceAuthentication,
} from "../components/Authentication";
import WebRTC from "../components/WebRTC";

export default function WebRTCTest() {
  return (
    <>
      <AuthenticationProvider
        allowLoginOverlay={true}
        allowExitLoginOverlay={false}
      >
        <EnforceAuthentication />
        <WebRTC></WebRTC>
      </AuthenticationProvider>
    </>
  );
}
