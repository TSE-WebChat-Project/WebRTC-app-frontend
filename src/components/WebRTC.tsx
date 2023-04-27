import React, { useContext, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { AuthenticationContext, app } from "./Authentication";
import { VideoStream } from "./VideoStream";
import { join, initOnStream } from "../WebRTCHandler";

export default function WebRTC() {
  const [peer, setPeer] = useState(null);
  const [streams, setStreams]: [MediaStream[], any] = useState([]);
  const context = useContext(AuthenticationContext);
  if (peer) {
    initOnStream(streams, setStreams);
    const videoStreams = streams.map((stream) => (
      <VideoStream id={stream.id} stream={stream}></VideoStream>
    ));
    return <>{videoStreams}</>;
  } else {
    return (
      <>
        <VideoStream id="1" stream={null}></VideoStream>
        <button
          onClick={() => {
            join("management-node-deployer-1", context?.uuid, setPeer);
          }}
        >
          Join
        </button>
      </>
    );
  }
}
