import React, { useContext, useState } from "react";
import { AuthenticationContext, app } from "./Authentication";
import { VideoStream } from "./VideoStream";
import { WebRTCContext } from "./WebRTCProvider";

export default function WebRTC() {
  const webrtcContext = useContext(WebRTCContext);
  let videoStreams: JSX.Element[] | undefined;
  if (webrtcContext && webrtcContext.streams.length > 0) {
    videoStreams = webrtcContext?.streams.map((stream) => (
      <VideoStream id={stream.id} stream={stream}></VideoStream>
    ));
  } else {
    return (
      <>
        <button
          onClick={() => webrtcContext?.setRoomId("management-node-deployer-1")}
        >
          Join
        </button>
      </>
    );
  }
  console.log(webrtcContext.streams);
  return <>{videoStreams}</>;
}
