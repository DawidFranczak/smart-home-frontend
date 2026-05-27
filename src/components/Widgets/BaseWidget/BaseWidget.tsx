import {useEffect, useRef, useState} from "react";
import styles from "./BaseWidget.module.css";

interface Props {
    children: React.ReactNode;
    name?: string;
    w?: number;
    h?: number;
    className?: string;
}

export default function BaseWidget({ name, children, w = 1, h = 1, className = '' }: Props) {
    const nameRef = useRef<HTMLParagraphElement>(null);
    const nameTextRef = useRef<HTMLSpanElement>(null);
    const [shouldRollName, setShouldRollName] = useState(false);

    useEffect(() => {
        if (!name) return;

        const measureName = () => {
            const container = nameRef.current;
            const text = nameTextRef.current;

            if (!container || !text) return;

            setShouldRollName(text.scrollWidth > container.clientWidth);
        };

        measureName();

        const resizeObserver = new ResizeObserver(measureName);

        if (nameRef.current) {
            resizeObserver.observe(nameRef.current);
        }

        window.addEventListener("resize", measureName);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", measureName);
        };
    }, [name]);

    return (
        <div
            className={`${styles.widget} ${name ? styles.hasName : ""} ${className}`}
            style={{
                '--col-span': w,
                '--row-span': h,
            } as React.CSSProperties}
        >
            {name && (
                <div className={styles.header}>
                    <p
                        ref={nameRef}
                        className={`${styles.name} ${shouldRollName ? styles.nameRolling : ""}`}
                        title={name}
                    >
                        <span className={styles.nameTrack}>
                            <span ref={nameTextRef}>{name}</span>
                            <span aria-hidden="true">{name}</span>
                        </span>
                    </p>
                </div>
            )}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
