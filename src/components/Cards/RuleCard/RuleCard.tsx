import { useState } from "react";
import { IconButton, Tag, TagGroup, Toggle } from "rsuite";
import { useTranslation } from "react-i18next";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";
import { IRule } from "../../../interfaces/IRule.ts";
import styles from "./RuleCard.module.css";
import useRuleMutation from "../../../hooks/queries/useRuleMutation.tsx";
import TrashIcon from "@rsuite/icons/Trash";
import PeopleRuleIcon from "@rsuite/icons/PeopleRule";
import WavePointIcon from "@rsuite/icons/WavePoint";
import TaskIcon from "@rsuite/icons/Task";
import SettingIcon from "@rsuite/icons/Setting";

const formatValue = (value: unknown) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
};

const renderExtraSettings = (settings?: object | null, excludeKey:string[]=[]) => {
    if (!settings) return null;

    const entries = Object.entries(settings).filter(([key]) => !excludeKey.includes(key));
    if (entries.length === 0) return null;

    return (
        <TagGroup className={styles.tagGroup}>
            {entries.map(([key, value]) => (
                <Tag key={key} size="sm" className={styles.valueTag}>
                    <span>{key}</span>: <b>{formatValue(value)}</b>
                </Tag>
            ))}
        </TagGroup>
    );
};

export default function RuleCard({id, name, enabled, triggers, actions, is_local, conditions }: IRule) {
    const { t } = useTranslation();
    const {updateRule, deleteRule} = useRuleMutation();
    const updateMutation = updateRule(id);
    const deleteMutation = deleteRule(id);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isEnabled, setIsEnabled] = useState(enabled);

    async function handleToggle (checked: boolean) {
        await updateMutation.mutateAsync({ enabled: checked });
        setIsEnabled(checked);
    }

    async function handleDelete() {
        setConfirmDelete(false);
        deleteMutation.mutate();
    }

    const hasConditions = Array.isArray(conditions) && conditions.length > 0;
    const displayName = name || t("ruleCard.unnamedRule");

    return (
        <article className={`${styles.container} ${!isEnabled ? styles.disabled : ''}`}>
            <header className={styles.header}>
                <div className={styles.titleWrap}>
                    <span className={styles.titleIcon}>
                        <PeopleRuleIcon />
                    </span>
                    <div className={styles.titleContent}>
                        <h3 title={displayName}>{displayName}</h3>
                        <div className={styles.meta}>
                            {is_local ? (
                                <Tag className={styles.localTag} size="sm">{t("ruleCard.local")}</Tag>
                            ) : (
                                <span className={styles.remoteTag}>Remote</span>
                            )}
                            {hasConditions && <span className={styles.conditionPill}>{t("ruleCard.condition")}</span>}
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    {!is_local && (
                        <div className={styles.toggleWrap}>
                            <Toggle
                                checked={isEnabled}
                                onChange={handleToggle}
                                size="sm"
                                loading={updateMutation.isPending}
                            />
                        </div>
                    )}
                    <IconButton
                        className={styles.deleteButton}
                        icon={<TrashIcon />}
                        appearance="subtle"
                        size="sm"
                        loading={deleteMutation.isPending}
                        onClick={() => setConfirmDelete(true)}
                    />
                </div>
            </header>

            <div className={styles.body}>
                <div className={styles.divider}>
                    <span>{t("ruleCard.when").toUpperCase()}</span>
                </div>
                <div className={styles.section}>
                    {triggers.map(tg => (
                        <div key={tg.id} className={styles.logicRow}>
                            <span className={styles.rowIcon}>
                                <WavePointIcon />
                            </span>
                            <div className={styles.logicContent}>
                                <p className={styles.logicText}>
                                    <span className={styles.highlight}>{t(`peripheralName.${tg.peripheral_name}`)}</span>
                                    <small> ({tg.device_name})</small>
                                    {" "}{t("ruleCard.trigger")}{" "}
                                    <span className={styles.eventLabel}>{t(`messageCommand.${tg.event}`)}</span>
                                </p>
                                {renderExtraSettings(tg.extra_settings)}
                            </div>
                        </div>
                    ))}
                </div>
                {hasConditions && (
                  <>
                      <div className={styles.divider}>
                          <span>{t("ruleCard.condition").toUpperCase()}</span>
                      </div>
                      <div className={styles.section}>
                          {conditions.map(condition => (
                              <div key={condition.id} className={styles.logicRow}>
                                  <span className={styles.rowIcon}>
                                      <SettingIcon />
                                  </span>
                                  <div className={styles.logicContent}>
                                      {renderExtraSettings(condition.condition,["type"])}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </>
                )}

                <div className={styles.divider}>
                    <span>{t("ruleCard.then").toUpperCase()}</span>
                </div>

                <div className={styles.section}>
                    {actions.map(action => (
                        <div key={action.id} className={styles.logicRow}>
                            <span className={styles.rowIcon}>
                                <TaskIcon />
                            </span>
                            <div className={styles.logicContent}>
                                <p className={styles.logicText}>
                                    <span className={styles.highlight}>{t(`peripheralName.${action.peripheral_name}`)}</span>
                                    <small> ({action.device_name})</small>
                                    : <b>{t(`messageCommand.${action.action}`)}</b>
                                </p>
                                {renderExtraSettings(action.extra_settings)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmDelete
                show={confirmDelete}
                name={name || ""}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
            />
        </article>
    );
}
