import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext, app } from "./Authentication";
import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(app);
/** WebRTC connection config */
const wrtcConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
/** WebRTC connection options. Allows adding video and audio streams after init */
const wrtcOptions = { offerToReceiveAudio: true, offerToReceiveVideo: true };
const localStreamConstraints = { video: true, audio: true };

interface IWebRTCContext {
  uuid?: string;
  streams: readonly MediaStream[];
  setRoomId: any;
}

export const WebRTCContext = React.createContext<IWebRTCContext | null>(null);

interface WebRTCProviderProps {
  children?: React.ReactNode;
}

export const WebRTCProvider: React.FC<WebRTCProviderProps> = (props) => {
  const authContext = useContext(AuthenticationContext);
  const [streams, setStreams] = useState<readonly MediaStream[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [roomId, setRoomId] = useState<string>("");

  if (!localStream) {
    navigator.mediaDevices
      .getUserMedia(localStreamConstraints)
      .then((stream) => {
        console.log("Got MediaStream:", stream);
        setLocalStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }

  useEffect(() => {
    if (roomId != "") {
      let clientRef = `meetings/${roomId}/clients/${authContext?.uuid}`;
      const unsub = onSnapshot(
        doc(db, clientRef),
        (snapshot: DocumentSnapshot<DocumentData>) => {
          if (snapshot.data()?.peer != "") {
            console.log(`Setting peer to ${snapshot.data()?.peer}`);
            unsub();
            console.log("Creating RTC connection...");
            createRtcConnection(
              snapshot.data()?.peer,
              roomId,
              authContext?.uuid,
              localStream,
              setStreams
            );
          }
        }
      );

      let docRef = collection(db, `meetings/${roomId}/clients`);
      setDoc(doc(docRef, authContext?.uuid), {
        id: authContext?.uuid,
        peer: "",
      });
    }
  }, [roomId, authContext?.uuid, localStream]);

  return (
    <>
      <WebRTCContext.Provider
        value={{
          uuid: authContext?.uuid,
          streams: streams,
          setRoomId: setRoomId,
        }}
      >
        {props.children}
      </WebRTCContext.Provider>
    </>
  );
};

async function createRtcConnection(
  peer: string | null,
  roomId: string,
  uuid: string | undefined,
  localStream: MediaStream | null,
  setStreams: (streams: readonly MediaStream[]) => any
) {
  if (!peer) {
    return null;
  }

  let routerPath = `meetings/${roomId}/clients/${peer}`;
  let conn = new RTCPeerConnection(wrtcConfig);

  if (localStream) {
    localStream.getTracks().forEach((track) => {
      conn.addTrack(track, localStream);
    });
  }

  conn.onconnectionstatechange = (ev) => {
    console.log(ev);
  };
  conn.onicecandidate = (event) => {
    if (event.candidate) {
      let iceRef = collection(db, routerPath + "/receivedIce");
      addDoc(iceRef, { id: uuid, ice: JSON.stringify(event.candidate) });
    }
  };

  conn.ontrack = (ev) => {
    if (ev.streams) {
      console.log("Got Track!");
      setStreams(ev.streams);
    }
  };

  sendOffer(conn, routerPath, uuid ?? "");

  let clientRef = collection(db, `meetings/${roomId}/clients`);
  // Get Answer
  onSnapshot(
    collection(db, clientRef.path + `/${uuid}/receivedAnswers`),
    async (snapshot: QuerySnapshot<DocumentData>) => {
      console.log("Got answer");
      console.log(snapshot.docChanges());
      for (const change of snapshot.docChanges()) {
        if (change.type == "added") {
          console.log("added answer");
          await conn.setRemoteDescription(change.doc.data().answer);
        }
      }
    }
  );
  // Send ICE
  onSnapshot(
    collection(db, clientRef.path + `/${uuid}/receivedIce`),
    (snapshot: QuerySnapshot<DocumentData>) => {
      console.log("Got ICE");
      for (const change of snapshot.docChanges()) {
        if (change.type == "added") {
          if (change.doc.data().candidate) {
            conn
              .addIceCandidate(JSON.parse(change.doc.data().candidate))
              .then(() => {
                console.log("added ice");
                console.log(change.doc.data().candidate);
              })
              .catch((reason) => {
                console.log("Error!:could not add ice");
                console.log(reason);
                console.log(change.doc.data().candidate);
              });
          }
        }
      }
    }
  );
  // Get commands
  onSnapshot(
    collection(db, clientRef.path + `/${uuid}/commands`),
    (snapshot: QuerySnapshot<DocumentData>) => {
      console.log("Got ICE");
      for (const change of snapshot.docChanges()) {
        if (change.type == "added") {
          switch (change.doc.data().command) {
            case "renegotiate":
              console.log("Renegotiate...");
              sendOffer(conn, routerPath, uuid ?? "");
              break;
            default:
              console.log(`Unknown command ${change.doc.data().command}`);
          }
        }
      }
    }
  );
}

async function sendOffer(
  conn: RTCPeerConnection,
  routerPath: string,
  uuid: string
) {
  let offer = await conn.createOffer(wrtcOptions);
  await conn.setLocalDescription(offer);

  let routerRef = collection(db, routerPath + "/receivedOffers");
  addDoc(routerRef, { id: uuid, offer: offer });
}
