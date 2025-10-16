import {ReactNode, useEffect, useState} from "react";
import style from "./Message.module.css";

interface MessageProps {
    children: ReactNode;
    type?: "error" | "success" | "warning" | "info";
    show: boolean;
    timeout?: number
    onTimeout?: () => void
}

export default function Message({ children,show, timeout = 0, onTimeout, type = "info" }: MessageProps) {
    const [shouldRender, setShouldRender] = useState(show);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
            if (timeout === 0) {
                setShouldRender(true);
                return;
            }
            const timer = setTimeout(() => {
                setShouldRender(false)
                if (onTimeout) {
                    onTimeout();
                }
            }, timeout);
            return () => {
                clearTimeout(timer);
            };
        }else {
            setShouldRender(false);
        }
    }, [show]);

    if(!shouldRender) return null
    return (
        <div className={`${style.message} ${style[type]}`}>
            {children}
        </div>
    );
}