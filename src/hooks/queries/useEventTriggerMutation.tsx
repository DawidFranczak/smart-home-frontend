import {useMutation,  useQueryClient} from "@tanstack/react-query";
import {TDeviceEvent} from "../../type/TDeviceEvent.ts";
import useFetch from "../useFetch.tsx";
import {api} from "../../constant/api.ts";
import updateDeviceData from "../../utils/updateDeviceData.tsx";

interface IUseEventTriggerMutation {
    id:number;
    type:TDeviceEvent;
}

export default function useEventTriggerMutation(){
    const {createData} = useFetch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data:IUseEventTriggerMutation)=> createData(api.triggerEvent,data),
        onSuccess : (response) => updateDeviceData(queryClient, response.data, response.status)
        }
    )
}