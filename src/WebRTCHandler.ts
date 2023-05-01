import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    doc,
    QuerySnapshot,
    DocumentData,
    setDoc,
    DocumentSnapshot,
  } from "firebase/firestore";
import { AuthenticationContext, app } from "./components/Authentication";

const db = getFirestore(app);

/** WebRTC connection config */
const wrtcConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
/** WebRTC connection options. Allows adding video and audio streams after init */
const wrtcOptions = { offerToReceiveAudio: true, offerToReceiveVideo: true };
let conn: RTCPeerConnection;
let localWebcam: MediaStream;

const constraints = {
  'video': true,
  'audio': true
}
navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
      console.log('Got MediaStream:', stream);
      localWebcam = stream
  })
  .catch(error => {
      console.error('Error accessing media devices.', error);
  });

export async function join(
    meeting_id: string | null,
    uuid: string | undefined,
    setPeer: any
  ) {

    let ref = collection(
      db,
      `meetings/${meeting_id ?? "management-node-deployer-1"}/clients`
    );

    const unsub = onSnapshot(
      doc(db, ref.path + "/" + uuid),
      (snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.data()?.peer != "") {
            console.log("setting peer");
            setPeer(snapshot.data()?.peer);
            unsub();
            createRtcConnection(snapshot.data()?.peer, null, uuid);
        }
    }
    );
  
    setDoc(doc(ref, uuid), { id: uuid, peer: "" });
  }

async function createRtcConnection(
    peer: string,
    meeting_id: string | null,
    uuid: string | undefined
  ) {
    conn = new RTCPeerConnection(wrtcConfig);
    
    localWebcam.getTracks().forEach(track => {
      conn.addTrack(track, localWebcam);
    });

    conn.onconnectionstatechange = (ev) => {
        console.log(ev);
    }
    let offer = await conn.createOffer(wrtcOptions);
    await conn.setLocalDescription(offer);
  
    let routerRef = collection(
      db,
      `meetings/${
        meeting_id ?? "management-node-deployer-1"
      }/clients/${peer}/receivedOffers`
    );
    addDoc(routerRef, { id: uuid, offer: offer });
  
    let clientRef = collection(
      db,
      `meetings/${meeting_id ?? "management-node-deployer-1"}/clients`
    );
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
        console.log("Got ICE")
        for (const change of snapshot.docChanges()) {
          if (change.type == "added") {
            if(change.doc.data().candidate){
                conn.addIceCandidate(JSON.parse(change.doc.data().candidate))
                .then(() => {console.log("added ice"); console.log(change.doc.data().candidate)})
                .catch(() => {console.log("Error!:could not add ice"); console.log(change.doc.data().candidate)})
            }
          }
        }
      }
    );
  }

export function initOnStream(streams: Array<MediaStream>, setTracks: any){
  conn.ontrack = (ev) => {
    if(ev.streams){
      setTracks(ev.streams);
    }
  }
}
