import React from "react";
import {
  AuthenticationProvider,
  EnforceAuthentication,
} from "../components/Authentication";
import WebRTC from "../components/WebRTC";
import { WebRTCProvider } from "../components/WebRTCProvider";

export default function WebRTCTest() {
  return (
    <>
      <AuthenticationProvider
        allowLoginOverlay={true}
        allowExitLoginOverlay={false}
      >
        <EnforceAuthentication />
        <WebRTCProvider>
          <WebRTC />
        </WebRTCProvider>
      </AuthenticationProvider>
    </>
  );
}
