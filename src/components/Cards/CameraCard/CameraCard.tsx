import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  url: string;
  width?: number;
  height?: number;
}

const CameraCard: React.FC<HlsPlayerProps> = ({
  url,
  width = 640,
  height = 360,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        liveSyncDurationCount: 1,
        maxLiveSyncPlaybackRate: 1.5,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current?.play();
      });
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      autoPlay={true}
      controls={true}
      muted={true}
      playsInline={true}
      width={width}
      height={height}
      style={{ backgroundColor: "black" }}
    />
  );
};

export default CameraCard;
