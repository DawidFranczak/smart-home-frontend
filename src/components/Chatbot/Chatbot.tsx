import { Panel, Input, Button, List, FlexboxGrid, IconButton } from 'rsuite';
import {useEffect, useRef, useState} from 'react';
import MessageIcon from '@rsuite/icons/Message';
import CloseIcon from '@rsuite/icons/Close';
import {useWebSocket} from "../WebSocketProvider.tsx";
import styles from "./Chatbot.module.css"
import {useTranslation} from "react-i18next";
export default function Chatbot() {
    const [messages, setMessages] = useState<object[]>([]);
    const listRef = useRef<HTMLUListElement>(null);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const websocket = useWebSocket()
    const {t} = useTranslation();

    useEffect(() => {
        websocket.registerAiCallback(onMessage)
    }, []);

    useEffect(() => {
        if(listRef.current) listRef.current.scrollTo(0, listRef.current.scrollHeight)
    }, [messages]);

    function sendCommand() {
        if (!input.trim()) return;
        const userMessage = {from: 'user', message: input};
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        websocket.send({type: "aiCommand", message: input})
        setButtonLoading(true);
    }

    function onMessage(message: string) {
        setMessages(prev => [...prev, {from: 'assistant', message}])
        if (message === "end") setButtonLoading(false);
    }

    if (!isOpen) {
        return (
            <div className={styles.fab}>
                <IconButton
                    icon={<MessageIcon/>}
                    circle
                    size="lg"
                    appearance="primary"
                    onClick={() => setIsOpen(true)}
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Panel
                bordered
                className={styles.panel}
                header={
                        <div className={styles.header}>
                            <div>
                                <div className={styles.title}>
                                   <span className={styles.dot} />
                                   SmartHome AI
                                </div>
                                <small>{t("chatbot.warning")}</small>
                            </div>
                            <IconButton
                                icon={<CloseIcon />}
                                circle
                                size="sm"
                                appearance="subtle"
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                }
            >
                <List className={styles.list} ref={listRef}>
                    {messages.map((msg: any, index) => (
                        <List.Item
                            key={index}
                            className={
                                msg.from === 'user' ? styles.userMessage : styles.botMessage
                            }
                        >
                            <div className={styles.bubble}>
                                {msg.message}
                            </div>
                        </List.Item>
                    ))}
                </List>

                <FlexboxGrid className={styles.input}>
                    <FlexboxGrid.Item colspan={18}>
                        <Input
                            value={input}
                            onChange={setInput}
                            placeholder="Np. Zapal światło w kuchni"
                            onPressEnter={sendCommand}
                        />
                    </FlexboxGrid.Item>

                    <FlexboxGrid.Item colspan={6}>
                        <Button
                            appearance="primary"
                            block
                            loading={buttonLoading}
                            onClick={sendCommand}
                            disabled={!input.trim()}
                        >
                            Wyślij
                        </Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
        </div>
    )
}