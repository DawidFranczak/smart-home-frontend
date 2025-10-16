// src/components/layout/Sidebar/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../../../hooks/useFetch";
import { api } from "../../../constant/api";
import { useAuth } from "../../../auth/AuthContext";
import styles from "./Sidebar.module.css";

import dashboard from "/static/svg/dashboard.svg";
import room from "/static/svg/room.svg";
import device from "/static/svg/device.svg";
import router from "/static/svg/router.svg";
import settings from "/static/svg/settings.svg";
import camera from "/static/svg/camera.svg";
import logoutIcon from "/static/svg/logout.svg";

const menuItems = [
  { icon: dashboard, label: "Dashboard", path: "/" },
  { icon: room, label: "Pokoje", path: "/room" },
  { icon: device, label: "Urządzenia", path: "/device" },
  { icon: router, label: "Router", path: "/router" },
  { icon: camera, label: "Kamery", path: "/camera" },
  { icon: settings, label: "Ustawienia", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const { deleteData } = useFetch();
  const { logout } = useAuth();

  const mutation = useMutation({
    mutationFn: () => deleteData(api.logout),
    onSuccess: () => logout(),
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={styles.title}>Smart Home</h2>
          <div className={styles.version}>v2.0</div>
        </div>

        <nav className={styles.navigation}>
          {menuItems.map((item) => (
              <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navItem} ${
                      location.pathname === item.path ? styles.active : ""
                  }`}
              >
                <img src={item.icon} alt={item.label} className={styles.icon} />
                <span className={styles.label}>{item.label}</span>
              </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <img src={logoutIcon} alt="Wyloguj" className={styles.icon} />
            <span className={styles.label}>Wyloguj</span>
          </button>
        </div>
      </aside>
  );
}