import { useState } from "react";
import { Panel, Form, ButtonToolbar, Button, Message } from "rsuite";
import useRouterMutation from "../../hooks/queries/useRouterMutation";
import styles from "./AddRouter.module.css";
import PageContainer from "../ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../ui/Headers/PageHeader/PageHeader.tsx";

export default function AddRouter() {
    const [mac, setMac] = useState("");
    const { createRouter } = useRouterMutation();
    const mutation = createRouter();

    const handleSaveRouter = () => {
        mutation.mutate(mac);
    };

    const error = mutation.error as any;

    return (
        <PageContainer>
            <PageHeader title="Dodaj ruter">
            </PageHeader>
            <div className={styles.pageWrapper}>
                <Panel className={styles.panel} bordered shaded>
                    <h3 className={styles.title}>Dodaj nowy router</h3>
                    <Form fluid>
                        <Form.Group>
                            <Form.ControlLabel>Adres MAC</Form.ControlLabel>
                            <Form.Control
                                name="router"
                                type="text"
                                placeholder="Podaj adres MAC"
                                value={mac}
                                onChange={(value: string) => setMac(value)}
                            />
                            {error?.details && (
                                <Message type="error" showIcon className={styles.errorMessage}>
                                    {error.details[Object.keys(error.details)[0]]}
                                </Message>
                            )}
                        </Form.Group>

                        <ButtonToolbar>
                            <Button
                                appearance="primary"
                                onClick={handleSaveRouter}
                                block
                            >
                                Dodaj
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </Panel>
            </div>
        </PageContainer>
    );
}
