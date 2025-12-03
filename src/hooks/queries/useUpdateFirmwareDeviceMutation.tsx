import useFetch from "../useFetch.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../constant/api.ts";
import updateDeviceData from "../../utils/updateDeviceData.tsx";


export default function useUpdateFirmwareDeviceMutation(){
    const {updateData} = useFetch()
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn:(data:{id:number}) => updateData(api.firmwareUpdate, data),
            onSuccess: (response) => {
                updateDeviceData(queryClient,response.data,response.status)
        }
    })
}