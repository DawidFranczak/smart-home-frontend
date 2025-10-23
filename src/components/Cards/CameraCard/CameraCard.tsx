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
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
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

        ws.onopen = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            ws.send(JSON.stringify({ type: "camera_offer", offer }));
        };

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "answer") {
                await pc.setRemoteDescription(new RTCSessionDescription(data));
            } else if (data.type === "candidate") {
                try {
                    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                } catch (err) {
                    console.error("Error adding received ice candidate", err);
                }
            } else if (data.type === "camera_error") {
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

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                ws.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
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