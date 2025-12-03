import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Panel, Message, useToaster, IconButton } from "rsuite";
import { Gear } from "@rsuite/icons";
import { websocketUrl } from "../../../constant/urls.ts";
import LoadingAnimation from "../../ui/LoadingAnimation/LoadingAnimation.tsx";
import styles from "./CameraCard.module.css";

interface CameraCardProps {
    id: number;
    name: string;
}

export default function CameraCard({ id, name }: CameraCardProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toaster = useToaster();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!videoRef.current) return;

        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                {
                    urls: [
                        "turn:relay1.expressturn.com:3480?transport=tcp",
                        "turn:relay1.expressturn.com:3480?transport=udp"
                    ],
                    username: "000000002079983019",
                    credential: "Xrhc7a43tR34qR5YaC8iPwx1R1o="
                }
            ]
        });

        pc.addTransceiver("video", { direction: "recvonly" });
        pc.addTransceiver("audio", { direction: "recvonly" });

        const token = queryClient.getQueryData(["token"]) as { status: number; token: string };
        if (!token) {
            console.error("Brak tokenu autoryzacji");
            setError("Brak tokenu autoryzacji");
            setLoading(false);
            return;
        }

        const ws = new WebSocket(`${websocketUrl}/ws/camera/${token.token}/${id}/`);

        const iceQueue: RTCIceCandidateInit[] = [];

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("Wysłano ICE candidate:", event.candidate);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
                } else {
                    iceQueue.push(event.candidate.toJSON());
                }
            }
        };

        pc.ontrack = (event) => {
            console.log("Otrzymano strumień wideo/audio:", event.streams[0]);
            if (videoRef.current) {
                videoRef.current.srcObject = event.streams[0];
                videoRef.current.play().catch(err => {
                    console.error("Błąd odtwarzania wideo:", err);
                });
            }
            setLoading(false);
        };

        ws.onopen = async () => {
            console.log("WebSocket otwarty");
            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                ws.send(JSON.stringify({ type: "camera_offer", offer }));
                console.log("Wysłano ofertę WebRTC");
            } catch (err) {
                console.error("Błąd tworzenia offer:", err);
                setError("Nie udało się utworzyć połączenia");
                setLoading(false);
            }
        };

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            console.log("Otrzymano wiadomość WebSocket:", data);

            if (data.type === "answer") {
                try {
                    const remoteDesc = new RTCSessionDescription(data.answer || data);
                    await pc.setRemoteDescription(remoteDesc);
                    console.log("Otrzymano odpowiedź WebRTC");

                    // Dodaj wszystkie ICE z kolejki
                    while (iceQueue.length > 0) {
                        const candidate = iceQueue.shift();
                        if (candidate) {
                            await pc.addIceCandidate(new RTCIceCandidate(candidate));
                            console.log("Dodano ICE z kolejki:", candidate);
                        }
                    }
                } catch (err) {
                    console.error("Błąd ustawiania remote description:", err);
                }
            } else if (data.type === "candidate") {
                try {
                    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                    console.log("Dodano ICE z serwera:", data.candidate);
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
    const handleSettingsClick = () => {
        navigate(`/camera/settings/${id}`);
    };

    if (error) {
        return (
            <div className={styles.pageWrapper}>
                <Panel bordered shaded className={styles.panel}>
                    <Message type="error" showIcon>
                        {error}
                    </Message>
                </Panel>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <Panel bordered shaded className={styles.panel}>
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        <span className={styles.icon}>📷</span> {name}
                    </h3>
                    <IconButton
                        icon={<Gear />}
                        appearance="subtle"
                        onClick={handleSettingsClick}
                        className={styles.settingsButton}
                        title="Ustawienia kamery"
                    />
                </div>
                {loading && <LoadingAnimation size="large" type="spinner" glow />}
                <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    controls
                    muted
                    className={styles.video}
                    hidden={loading}
                />
            </Panel>
        </div>
    );
}