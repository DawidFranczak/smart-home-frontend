import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  url: string; // URL do pliku .m3u8 (HLS)
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
        liveSyncDurationCount: 1, // zredukowane do 1 segmentu opóźnienia (~1-2s)
        maxLiveSyncPlaybackRate: 1.5, // umożliwia przyspieszenie odtwarzania jeśli stream "dogania"
        enableWorker: true, // użyj Web Workerów do dekodowania (lepsza wydajność)
        lowLatencyMode: true, // Włącz tryb niskiego opóźnienia
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
      // Safari natywnie obsługuje HLS
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
