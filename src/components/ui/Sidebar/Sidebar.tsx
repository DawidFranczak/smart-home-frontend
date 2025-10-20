import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IconButton, Tooltip, Whisper } from "rsuite";
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
    const [collapsed, setCollapsed] = useState(false);
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

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
            <div className={styles.toggleButton}>
                <IconButton
                    icon={
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {collapsed ? (
                                <path d="M9 18l6-6-6-6" />
                            ) : (
                                <path d="M15 18l-6-6 6-6" />
                            )}
                        </svg>
                    }
                    appearance="subtle"
                    circle
                    size="sm"
                    onClick={toggleSidebar}
                    className={styles.collapseBtn}
                />
            </div>

            <div className={styles.header}>
                {!collapsed ? (
                    <>
                        <h2 className={styles.title}>Smart Home</h2>
                        <div className={styles.version}>v2.0</div>
                    </>
                ) : (
                    <div className={styles.logoCollapsed}>SH</div>
                )}
            </div>

            <nav className={styles.navigation}>
                {menuItems.map((item) => {
                    const navLink = (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navItem} ${
                                location.pathname === item.path ? styles.active : ""
                            }`}
                        >
                            <div className={styles.iconWrapper}>
                                <img src={item.icon} alt={item.label} className={styles.icon} />
                            </div>
                            {!collapsed && <span className={styles.label}>{item.label}</span>}
                        </Link>
                    );

                    if (collapsed) {
                        return (
                            <Whisper
                                key={item.path}
                                placement="right"
                                trigger="hover"
                                speaker={<Tooltip>{item.label}</Tooltip>}
                            >
                                {navLink}
                            </Whisper>
                        );
                    }

                    return navLink;
                })}
            </nav>

            <div className={styles.footer}>
                {collapsed ? (
                    <Whisper
                        placement="right"
                        trigger="hover"
                        speaker={<Tooltip>Wyloguj</Tooltip>}
                    >
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            <div className={styles.iconWrapper}>
                                <img src={logoutIcon} alt="Wyloguj" className={styles.icon} />
                            </div>
                        </button>
                    </Whisper>
                ) : (
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        <div className={styles.iconWrapper}>
                            <img src={logoutIcon} alt="Wyloguj" className={styles.icon} />
                        </div>
                        <span className={styles.label}>Wyloguj</span>
                    </button>
                )}
            </div>
        </aside>
    );
}