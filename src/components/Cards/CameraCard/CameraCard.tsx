import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Message, useToaster } from "rsuite";
import { websocketUrl } from "../../../constant/urls.ts";
import LoadingAnimation from "../../ui/LoadingAnimation/LoadingAnimation.tsx";
import styles from "./CameraCard.module.css";
import Header from "../../ui/Headers/Header/Header.tsx";
import ThreeDot from "../../ui/ThreeDot/ThreeDot.tsx";

interface CameraCardProps {
    id: number;
    name: string;
    className?: string;
}

export default function CameraCard({ id, name, className }: CameraCardProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const queryClient = useQueryClient();
    const toaster = useToaster();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!videoRef.current) return;

        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" }
            ]
        });

        pc.addTransceiver("video", { direction: "recvonly" });
        pc.addTransceiver("audio", { direction: "recvonly" });

        const token = queryClient.getQueryData(["token"]) as { status: number; token: string };
        if (!token) {
            setError("Brak tokenu autoryzacji");
            setLoading(false);
            return;
        }

        const ws = new WebSocket(`${websocketUrl}/ws/camera/${token.token}/${id}/`);

        const iceQueue: RTCIceCandidateInit[] = [];

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
                } else {
                    iceQueue.push(event.candidate.toJSON());
                }
            }
        };

        pc.ontrack = (event) => {
            if (videoRef.current) {
                videoRef.current.srcObject = event.streams[0];
                videoRef.current.play().catch(_ => {
                });
            }
            setLoading(false);
        };

        ws.onopen = async () => {
            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                ws.send(JSON.stringify({ type: "camera_offer", offer }));
            } catch (err) {
                setError("Nie udało się utworzyć połączenia");
                setLoading(false);
            }
        };

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "answer") {
                try {
                    const remoteDesc = new RTCSessionDescription(data.answer || data);
                    await pc.setRemoteDescription(remoteDesc);
                    while (iceQueue.length > 0) {
                        const candidate = iceQueue.shift();
                        if (candidate) {
                            await pc.addIceCandidate(new RTCIceCandidate(candidate));
                        }
                    }
                } catch (err) {
                    console.error("Błąd ustawiania remote description:", err);
                }
            } else if (data.type === "candidate") {
                try {
                    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                } catch (err) {
                    console.error("Błąd dodawania ICE:", err);
                }
            } else if (data.type === "camera_error") {
                console.error("Błąd kamery:", data.error);
                setError(data.error);
                toaster.push(
                    <Message type="error" showIcon closable>
                        Błąd kamery: {data.error}
                    </Message>,
                    { placement: "topCenter", duration: 5000 }
                );
                ws.close();
                pc.close();
            }
        };

        return () => {
            ws.close();
            pc.close();
        };
    }, [id, queryClient, toaster]);
    return (
        <div className={`${styles.panel} ${className}`} >
            <div className={styles.header}>
                <Header disable={true}>{name}</Header>
                <ThreeDot className={styles.threeDots} to={`/camera/settings/${id}`}/>
            </div>
            {loading && !error && <LoadingAnimation size="large" type="spinner" glow />}
            {error ? <Message className={styles.errorMessage} type="error" showIcon>
                {error}
            </Message> :
                    <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    controls
                    muted
                    className={styles.video}
                    hidden={loading}
                    />
            }
        </div>
    );
}