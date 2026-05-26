import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import PageContainer from "../../../components/ui/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import {cpuAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import SyncType from "../../../constant/syncType.ts";
import UpdatePeripheralRequired from "./UpdatePeripheralRequired.tsx";
import DevicePeripheralWrapper from "./DevicePeripheralWrapper.tsx";
import PeopleRuleIcon from "@rsuite/icons/PeopleRule";
import EditIcon from "@rsuite/icons/Edit";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import GearIcon from "@rsuite/icons/Gear";


export default function Device() {

    const { t } = useTranslation();
    const params = useParams();
    const deviceId = parseInt(params.id ?? "0");
    const mutation = useTriggerActionEventMutation()
    const { device } = useDeviceQuery(deviceId);
    async function startSync(type:SyncType) {
        if (!device) return;
        const data = cpuAction(device.mac, MessageAction.SYNC_START, {sync_type:type});
        await mutation.mutateAsync(data)
    }
    if (!device) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    return (
        <PageContainer>
          <PageHeader title={device.name} subtitle={`${t("devicePage.headerSubtitle")} ${device.peripherals.length}`} >

              <DeviceActionPanel
                  buttons={[
                      { label: t("button.rules"), to: `/devices/${device.id}/rule/`, type: "subtle", icon: <PeopleRuleIcon />},
                      { label: t("button.editPeripheral"), to: `/devices/${device.id}/peripheral/edit/`, type: "subtle", icon: <EditIcon />},
                      { label: t("button.addPeripheral"), to: `/devices/${device.id}/peripheral/add/`, type: "subtle", icon: <PlusRoundIcon />},
                      { label: t("button.deviceSettings"), to: `/devices/${device.id}/settings/`, type: "subtle", icon: <GearIcon />},

                  ]}
                  wifiStrength={device.is_online ? device.wifi_strength : -100}
                  showWifi={true}
              />
          </PageHeader>

            {device.required_action.includes(MessageAction.UPDATE_PERIPHERAL) ?
                <UpdatePeripheralRequired onClick={startSync} pending={device.pending.includes(MessageAction.SYNC_START)}/>:
                <DevicePeripheralWrapper peripherals={device.peripherals}/>
            }
        </PageContainer>
    );
}
