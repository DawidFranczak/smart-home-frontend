import WebSocketProvider from "../WebSocketProvider.tsx";
import Sidebar from "../ui/Sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";

import styles from "./Layouts.module.css";
import DataPrefetcher from "../DataPrefetcher.tsx";
import {useEffect} from "react";
import Chatbot from "../Chatbot/Chatbot.tsx";

export default function Layouts() {
    useEffect(() => {
        const setRootHeight = () => {
            const root = document.getElementById("root");
            if (root) {
                root.style.height = `${window.innerHeight}px`;
            }
        };

        setRootHeight();

        window.addEventListener("resize", setRootHeight);

        return () => {
            window.removeEventListener("resize", setRootHeight);
        };
    }, []);
    return (
        <div className={styles.container}>
            <DataPrefetcher/>
            <Sidebar />
            <main className={styles.content}>
                <WebSocketProvider>
                    <Outlet />
                    <Chatbot/>
                </WebSocketProvider>
            </main>
        </div>
    );
}