import React, { useEffect } from "react";

interface VideoStreamProps {
  id: string;
  stream: MediaStream | null;
}

export const VideoStream: React.FC<VideoStreamProps> = (props) => {
  useEffect(() => {
    let video = document.getElementById(props.id);
    if (video) {
      (video as HTMLVideoElement).srcObject = props.stream;
      (video as HTMLVideoElement).play();
    }
  });

  return (
    <>
      <video id={props.id} itemID={props.id}></video>
    </>
  );
};
