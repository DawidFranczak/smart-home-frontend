import {Button, Loader, Modal, SelectPicker} from "rsuite";
import {useTranslation} from "react-i18next";
import usePrefetchDeviceQuery from "../../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import {useEffect, useReducer, useRef, useState} from "react";
import styles from "./RuleForm.module.css"
import reducer, {initialState} from "./reducer.ts";
import buildBody from "./buildBody.ts";
import isRuleFormValid from "./isRuleValid.ts";
import useRuleMutation from "../../hooks/queries/useRuleMutation.tsx";
import useActionExtraSettings from "../../hooks/queries/useActionExtraSettings.tsx";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import mapErrorsToRjsf from "./mapErrorsToRjsf.ts";
import useEventConditionQuery from "../../hooks/queries/useEventConditionQuery.tsx";
import {customWidget} from "./customWidget.tsx"
import {customTemplates} from "./customTemplate.tsx"
import {initialErrorState} from "./initialErrorState.ts"
import PeopleRuleIcon from "@rsuite/icons/PeopleRule";
import DeviceIcon from "@rsuite/icons/Device";
import WavePointIcon from "@rsuite/icons/WavePoint";
import SettingIcon from "@rsuite/icons/Setting";

const uiSchema = {
    "type": {
        "ui:widget": "hidden",
        "ui:title": " ",
    },
};

interface RuleFormProps {
    open: boolean;
    onClose: () => void;
}

export default function RuleForm({open, onClose}: RuleFormProps) {
    const {t} = useTranslation();
    const {deviceData} = usePrefetchDeviceQuery()
    const [state, dispatch] = useReducer(reducer, initialState)
    const {createRule} = useRuleMutation()
    const mutation = createRule()

    const {extraSettingSchema, isLoading: isExtraSettingSchemaLoading} =  useActionExtraSettings(state.targetPeripheral?.name, state.targetAction)
    const {conditionSchema, isLoading: isConditionSchemaLoading} =  useEventConditionQuery(state.triggerPeripheral?.name, state.triggerEvent)
    const hasExtraSettingSchema = extraSettingSchema && Object.keys(extraSettingSchema).length > 0;
    const hasConditionSchema = conditionSchema && Object.keys(conditionSchema).length > 0;
    const formRefCondition = useRef<Form>(null);
    const formRefExtraSettings = useRef<Form>(null);

    const [errorsForm, setErrorsForm] = useState(initialErrorState)

    const triggerDevicePeripheral= state.triggerDevice?.peripherals
        .filter(p=> p.available_event.length > 0)
        ?.map((p:any)=>({ label: `${t(`peripheralName.${p.name}`)}  ${p.config?.name ? `- ${p.config.name}` : "" }`, value:p})) ?? []

    const triggerPeripheralEvents= state.triggerPeripheral?.available_event.map(i=> ({label:t(`messageCommand.${i}`), value:i}))??[]

    const targetDevices = deviceData.map(i=> ({label:i.name, value:i}))
    const targetDevicePeripherals = state.targetDevice?.peripherals
        .filter(p=> p.available_action.length > 0)
        ?.map((p:any) => ({
        label: `${t(`peripheralName.${p.name}`)}  ${p.config?.name ? `- ${p.config.name}` : "" }`,
        value: p
    })) ?? []

    useEffect(() => {
        if (!open || mutation.isSuccess) {
            dispatch({ type: "reset" });
            setErrorsForm(initialErrorState);
        }
    }, [open, mutation.isSuccess]);

    const targetPeripheralAction= state.targetPeripheral?.available_action.map(i=> ({label:t(`messageCommand.${i}`), value:i}))??[]
    function handleSave(){
        const isConditionValid = formRefCondition.current
            ? formRefCondition.current.validateForm()
            : true;

        const isExtraSettingsValid = formRefExtraSettings.current
            ? formRefExtraSettings.current.validateForm()
            : true;

        const newErrors =  {
            triggerDevice: !Boolean(state.triggerDevice),
            triggerPeripheral: !Boolean(state.triggerPeripheral),
            triggerEvent:!Boolean(state.triggerEvent),
            targetDevice: !Boolean(state.targetDevice),
            targetPeripheral: !Boolean(state.targetPeripheral),
            targetAction: !Boolean(state.targetAction),
            condition: !isConditionValid,
            extraSettings: !isExtraSettingsValid
        }
        setErrorsForm(newErrors);
        if(Object.values(newErrors).some(v=> v)) {
            return;
        }
        if (!isRuleFormValid(state)) return;

       const data = buildBody(
           state.triggerDevice.id,
           state.triggerPeripheral.id,
           state.triggerEvent,
           state.targetPeripheral.id,
           state.targetAction,
           state.extraSettings,
           state.condition
        )
        mutation.mutate(data)
    }
    return <Modal open={open} onClose={onClose} className={styles.modal}>
        <Modal.Header>
            <Modal.Title>
                <div className={styles.header}>
                    <span className={styles.titleIcon}>
                        <PeopleRuleIcon />
                    </span>
                    <span className={styles.titleText}>{t("ruleForm.title")}</span>
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
           <div className={styles.layout}>
           <section className={styles.wrapper}>
               <div className={styles.sectionHeader}>
                   <span className={styles.sectionIcon}>
                       <WavePointIcon />
                   </span>
                   <p>{t("ruleForm.triggerSection")}</p>
               </div>
               <SelectPicker
                   block
                   className={`${styles.select} ${errorsForm.triggerDevice ? styles.error : ""}`}
                   data={deviceData.map( device=> ({label:device.name, value:device}))}
                   label={t("ruleForm.selectTriggerDevice")}
                   value={state.triggerDevice}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/device", payload: value })
                       setErrorsForm((prev) => ({...prev, triggerDevice: !value, triggerPeripheral: false, triggerEvent: false, condition: false}))
                   }}
               />
               <SelectPicker
                   block
                   className={`${styles.select} ${errorsForm.triggerPeripheral ? styles.error : ""}`}
                   disabled={!state.triggerDevice}
                   data={triggerDevicePeripheral}
                   label={t("ruleForm.selectTriggerPeripheral")}
                   value={state.triggerPeripheral}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/peripheral", payload: value })
                       setErrorsForm((prev) => ({...prev, triggerPeripheral: !value, triggerEvent: false, condition: false}))
                   }}
               />
               <SelectPicker
                   block
                   className={`${styles.select} ${errorsForm.triggerEvent ? styles.error : ""}`}
                   label={t("ruleForm.selectTrigger")}
                   disabled={!state.triggerPeripheral}
                   data={triggerPeripheralEvents}
                   value={state.triggerEvent}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/event", payload: value })
                       setErrorsForm((prev) => ({...prev, triggerEvent: !value, condition: false}))
                   }}
               />
               {isConditionSchemaLoading && (
                   <div className={styles.schemaLoading}>
                       <Loader size="sm" />
                   </div>
               )}
               { hasConditionSchema &&
                   <Form
                       key={`${state.triggerPeripheral?.id ?? "none"}-${state.triggerEvent ?? "none"}`}
                       ref={formRefCondition}
                       className={`${styles.rjsfForm} ${errorsForm.condition ? styles.rjsfFormError : ''}`}
                       showErrorList={false}
                       schema={conditionSchema}
                       widgets={customWidget}
                       templates={customTemplates}
                       validator={validator}
                       onChange={({ formData, errors}) => {
                           dispatch({ type: "set/condition", payload: formData })
                           setErrorsForm({...errorsForm, condition: errors.length > 0})
                       }}
                       uiSchema={uiSchema}
                   ><></></Form>
               }
           </section>
            <section className={styles.wrapper}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionIcon}>
                        <DeviceIcon />
                    </span>
                    <p>{t("ruleForm.actionSection")}</p>
                </div>
                <SelectPicker
                   block
                   className={`${styles.select} ${errorsForm.targetDevice ? styles.error : ""}`}
                   label={t("ruleForm.selectTargetDevice")}
                   data={targetDevices}
                   value={state.targetDevice}
                   onChange={(value) => {
                       dispatch({ type: "setTarget/device", payload: value })
                       setErrorsForm((prev) => ({...prev, targetDevice: !value, targetPeripheral: false, targetAction: false, extraSettings: false}))
                   }}
                />
                <SelectPicker
                   block
                   className={`${styles.select} ${errorsForm.targetPeripheral ? styles.error : ""}`}
                   label={t("ruleForm.selectTargetPeripheral")}
                   disabled={!state.targetDevice}
                   data={targetDevicePeripherals}
                   value={state.targetPeripheral}
                   onChange={(value) => {
                       dispatch({ type: "setTarget/peripheral", payload: value })
                       setErrorsForm((prev) => ({...prev, targetPeripheral: !value, targetAction: false, extraSettings: false}))
                   }}
                />
                <SelectPicker
                   block
                   className={`${styles.select} ${errorsForm.targetAction ? styles.error : ""}`}
                   label={t("ruleForm.selectTargetAction")}
                   disabled={!state.targetPeripheral}
                   data={targetPeripheralAction}
                   value={state.targetAction}
                   onChange={(value) => {
                       dispatch({ type: "setTarget/action", payload: value })
                       setErrorsForm((prev) => ({...prev, targetAction: !value, extraSettings: false}))
                   }}
                />
                {isExtraSettingSchemaLoading && (
                    <div className={styles.schemaLoading}>
                        <Loader size="sm" />
                    </div>
                )}
                { hasExtraSettingSchema &&
                    <Form
                        key={`${state.targetPeripheral?.id ?? "none"}-${state.targetAction ?? "none"}`}
                        ref={formRefExtraSettings}
                        className={`${styles.rjsfForm} ${errorsForm.extraSettings ? styles.rjsfFormError : ''}`}
                        showErrorList={false}
                        schema={extraSettingSchema}
                        validator={validator}
                        formData={state.extraSettings}
                        widgets={customWidget}
                        templates={customTemplates}
                        extraErrors={mapErrorsToRjsf(mutation.error?.details || {})}
                        onChange={({ formData, errors}) => {
                            dispatch({ type: "set/extraSettings", payload: formData })
                            setErrorsForm({...errorsForm, extraSettings: errors.length > 0})
                        }}
                    ><></></Form>
                }
           </section>
           </div>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
            <Button appearance="subtle" onClick={onClose}>
                {t("button.cancel")}
            </Button>
            <Button appearance="primary" startIcon={<SettingIcon />} loading={mutation.isPending} onClick={handleSave}>
                {t("button.save")}
            </Button>
        </Modal.Footer>
    </Modal>
}
