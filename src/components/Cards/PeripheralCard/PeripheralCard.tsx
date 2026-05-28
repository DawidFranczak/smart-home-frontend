import { Card, IconButton } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import DeviceIcon from "@rsuite/icons/Device";
import SettingIcon from "@rsuite/icons/Setting";
import styles from "./PeripheralCard.module.css";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete.tsx";
import {useEffect, useRef, useState} from "react";
import usePeripheralMutation from "../../../hooks/queries/usePeripheralMutation.ts";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import {useTranslation} from "react-i18next";

function RenderConfig({ data }: { data: unknown }) {
    if (data === null || data === undefined) {
        return <span className={styles.emptyValue}>null</span>;
    }

    if (typeof data !== "object") {
        return <span className={styles.value}>{String(data)}</span>;
    }

    if (Array.isArray(data)) {
        return (
            <ul className={styles.configList}>
                {data.map((item, index) => (
                    <li key={index}>
                        <RenderConfig data={item} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className={styles.configGroup}>
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className={styles.configRow}>
                    <span className={styles.configKey}>{key}</span>
                    <RenderConfig data={value} />
                </div>
            ))}
        </div>
    );
}

export default function PeripheralCard({id, name, config}: IPeripheral){
    const [confirmDelete, setConfirmDelete] = useState(false);
    const {deletePeripheralMutation} = usePeripheralMutation();
    const mutation = deletePeripheralMutation(id);
    const {t} = useTranslation();
    const translatedName = t(`peripheralName.${name}`)
    const displayName = config?.name ?? translatedName;
    const [shouldRollName, setShouldRollName] = useState(false);
    const nameRef = useRef<HTMLSpanElement>(null);
    const nameTextRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
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
    }, [displayName]);

    function handleDelete() {
        mutation.mutate();
        setConfirmDelete(false);
    }

    return (
        <Card className={styles.card} shaded>
            <Card.Header className={styles.header}>
                <div className={styles.titleBlock}>
                    <span className={styles.iconWrap} aria-hidden="true">
                        <DeviceIcon />
                    </span>
                    <div className={styles.titleText}>
                        <span
                            ref={nameRef}
                            className={`${styles.name} ${shouldRollName ? styles.nameRolling : ""}`}
                            title={displayName}
                        >
                            <span className={styles.nameTrack}>
                                <span ref={nameTextRef}>{displayName}</span>
                                <span aria-hidden="true">{displayName}</span>
                            </span>
                        </span>
                    </div>
                </div>
                <IconButton
                    appearance="subtle"
                    icon={<TrashIcon />}
                    className={styles.deleteIcon}
                    aria-label={`Delete ${displayName}`}
                    onClick={() => setConfirmDelete(true)}
                />
            </Card.Header>
            <Card.Body className={styles.body}>
                <div className={styles.sectionTitle}>
                    <SettingIcon />
                    <span>Configuration</span>
                </div>
                <RenderConfig data={config} />
            </Card.Body>
            <Card.Footer className={styles.footer}>
                <ConfirmDelete
                    show={confirmDelete}
                    name={`${name} ${config?.name}`}
                    onCancel={() => setConfirmDelete(false)}
                    onConfirm={handleDelete}
                />
            </Card.Footer>
        </Card>
    );
}
