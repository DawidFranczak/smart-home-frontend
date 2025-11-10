import { useState } from "react";
import { Panel, Message, Button, Whisper, Tooltip } from "rsuite";
import useHomeCodeQuery from "../../hooks/queries/useHomeCodeQuery";
import LoadingAnimation from "../ui/LoadingAnimation/LoadingAnimation";
import styles from "./HomeCode.module.css";
import { useTranslation } from "react-i18next";

export default function HomeCode() {
    const { t } = useTranslation();
    const { data, status, isLoading } = useHomeCodeQuery();
    const [copied, setCopied] = useState(false);

    if (isLoading || data === undefined) return <LoadingAnimation />;
    if (status === "error")
        return <Message type="error">{t("homeCode.errorMessage")}</Message>;

    const code = data.data.code;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.pageWrapper}>
            <Panel bordered shaded className={styles.panel}>
                <h3 className={styles.title}>{t("homeCode.title")}</h3>
                <p className={styles.subtitle}>{t("homeCode.subtitle")}</p>

                <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={<Tooltip>{t("homeCode.copyTooltip")}</Tooltip>}
                >
                    <div className={styles.codeBox} onClick={handleCopy}>
                        <span className={styles.code}>{code}</span>
                    </div>
                </Whisper>

                {copied && (
                    <Message type="success" showIcon closable className={styles.message}>
                        {t("homeCode.copiedMessage")}
                    </Message>
                )}

                <Button
                    appearance="primary"
                    onClick={handleCopy}
                    block
                    className={styles.copyBtn}
                >
                    {t("homeCode.copyButton")}
                </Button>
            </Panel>
        </div>
    );
}