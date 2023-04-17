import React from "react";
import {
  AuthenticationProvider,
  EnforceAuthentication,
} from "../components/Authentication";
import { Layout } from '../components/VideoFeed'
import { GridJoin } from "../components/Grid";
import { BottomStack } from "../components/BottomBar";
import {MuiDrawer} from '../components/CustomDrawer' 
import Navbar from "../components/Navbar";

//Loop GridJoin: prop for name of box currently 
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
      <MuiDrawer/>
      <Layout name = 'Meeting Name'/>
      <GridJoin name = 'Video Feed 1'/>
      <GridJoin name = 'Video Feed 2'/>
      <GridJoin name = 'Video Feed 3'/>
      <GridJoin name = 'Video Feed 4'/>
      <BottomStack/>
    </>
  );
}
