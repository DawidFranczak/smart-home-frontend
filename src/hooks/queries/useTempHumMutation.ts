import useFetch from "../useFetch.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../constant/api.ts";
import updateDeviceData from "../../utils/updateDeviceData.tsx";

interface State {
    temperature_hysteresis?:number,
    humidity_hysteresis?:number,
    trigger_temp_up?:number,
    trigger_temp_down?:number,
    trigger_hum_up?:number,
    trigger_hum_down?:number
}

export default function useTempHumMutation(id: number) {
    const { updateData } = useFetch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (aquariumData: State) =>
            updateData(`${api.tempHum}${id}/`, aquariumData),
        onSuccess: (response) => {
            updateDeviceData(queryClient, response.data, response.status);
        },
    });
}
