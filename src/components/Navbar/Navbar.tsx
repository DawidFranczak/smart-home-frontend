import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import useFetch from "../../hooks/useFetch";
import { api } from "../../const/api";
import { useAuth } from "../../context/AuthContext";
import NavbarIcon from "../../ui/NavbarIcon/NavbarIcon";
import room from "/static/svg/room.svg";
import logoutIcon from "/static/svg/logout.svg";
import router from "/static/svg/router.svg";
import device from "/static/svg/device.svg";
import dashboard from "/static/svg/dashboard.svg";
import settings from "/static/svg/settings.svg";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { deleteData } = useFetch();
  const { logout } = useAuth();
  const mutation = useMutation({
    mutationFn: () => deleteData(api.logout),

    onSuccess: () => {
      logout();
    },
  });
  async function logoutHandler() {
    mutation.mutate();
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.burger} onClick={() => setOpen((e) => !e)}>
          <p className={open ? styles.active : ""}></p>
          <p className={open ? styles.active : ""}></p>
          <p className={open ? styles.active : ""}></p>
        </div>
        <div
          className={`${styles.links} ${
            open ? styles.active : styles.deactive
          }`}
        >
          <Link to="/" onClick={() => setOpen((e) => !e)}>
            <NavbarIcon svg={dashboard} />
          </Link>
          <Link to="/room" onClick={() => setOpen((e) => !e)}>
            <NavbarIcon svg={room} />
          </Link>
          <Link to="/device" onClick={() => setOpen((e) => !e)}>
            <NavbarIcon svg={device} />
          </Link>
          <Link to="/router" onClick={() => setOpen((e) => !e)}>
            <NavbarIcon svg={router} />
          </Link>
          <Link to="/settings" onClick={() => setOpen((e) => !e)}>
            <NavbarIcon svg={settings} />
          </Link>
          <Link className={styles.link} onClick={logoutHandler} to="/">
            <NavbarIcon svg={logoutIcon} />
          </Link>
        </div>
      </nav>
    </>
  );
}
