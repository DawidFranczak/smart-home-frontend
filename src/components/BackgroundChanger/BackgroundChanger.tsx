import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackgroundChanger = () => {
  const location = useLocation();

  useEffect(() => {
    const backgrounds: Record<string, string> = {
      "": "url('/static/images/home.png')",
      login: "url('/static/images/login_full_hd.png')",
      registartion: "url('/static/images/login_full_hd.png')",
      room: "url('/static/images/rooms.png')",
      aquarium: "url('/static/images/aquariums.png')",
      rfid: "url('/static/images/rfid.png')",
      lamp: "url('/static/images/lamps.png')",
      router: "url('/static/images/router.png')",
    };
    const backgroundImage =
      backgrounds[location.pathname.split("/")[1]] || "none";

    const root = document.getElementById("root");
    if (root) {
      root.style.backgroundImage = backgroundImage;
      root.style.backgroundSize = "cover";
      root.style.backgroundPosition = "center";
      root.style.transition = "background 0.5s ease-in-out";
    }
  }, [location]);

  return null;
};

export default BackgroundChanger;
