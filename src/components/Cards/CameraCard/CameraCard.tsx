import {useEffect, useRef, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {websocketUrl} from "../../../constant/urls.ts";
import LoadingAnimation from "../../ui/LoadingAnimation/LoadingAnimation.tsx";
import styles from "./CameraCard.module.css";
import Header from "../../ui/Headers/Header/Header.tsx";

interface CameraCardProps {
    id: number;
    name: string;
}

export default function CameraCard({id, name}: CameraCardProps) {
  const videoRef = useRef<HTMLVideoElement|null>(null);
  const queryClient = useQueryClient()
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const pc = new RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]
    });
    pc.addTransceiver("video", { direction: "recvonly" });
    pc.addTransceiver("audio", { direction: "recvonly" });
    const token = queryClient.getQueryData(["token"]) as {
      status: number;
      token: string;
    };
    if (!token) return;
    const ws = new WebSocket(`${websocketUrl}/ws/camera/${token.token}/${id}/`);

    ws.onopen = async (_) => {
       const offer = await pc.createOffer();
       await pc.setLocalDescription(offer)
      ws.send(JSON.stringify({"type":"camera_offer","offer":offer}));
    }

    ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "answer") {
            await pc.setRemoteDescription(new RTCSessionDescription(data));
        }
        else if (data.type === "candidate") {
            try{
                await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            }catch (err){
                console.error("Error adding received ice candidate", err);
            }
        }
        else if (data.type === "camera_error"){
            setError(data.error);
            ws.close();
            pc.close();
        }
    }
      pc.onicecandidate = (event) => {
          if (event.candidate) {
              ws.send(JSON.stringify({
                  type: "candidate",
                  candidate: event.candidate
              }));
          }
      };
      pc.ontrack = (event) => {
          if (videoRef.current) {
              videoRef.current.srcObject = event.streams[0];
          }
          setLoading(false);
      };
    return () => {
      ws.close();
      pc.close();
    };
  },[]);

    if (error)
        return <div>{error}</div>;
  return (
      <div className={styles.container}>
          <Header>{name}</Header>
          {loading&&<LoadingAnimation />}
          <video
              ref={videoRef}
              playsInline
              autoPlay = {true}
              controls={true}
              muted={true}
              width="300px"
              hidden={loading}
          />
      </div>
  )};

