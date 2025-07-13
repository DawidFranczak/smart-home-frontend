import CacheUpdater from "../CacheUpdater.tsx";
import Sidebar from "../ui/Sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";

import styles from "./Layouts.module.css";

export default function Layouts() {
    return (
        <div className={styles.container}>
            <CacheUpdater/>
            <Sidebar />
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );

}