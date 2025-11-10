import useFetch from "../useFetch.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../constant/api.ts";
import {TButton} from "../../type/TButton.ts";
import updateDeviceData from "../../utils/updateDeviceData.tsx";


export default function useButtonTypeMutation(id:number){
    const {updateData} = useFetch()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:{button_type:TButton}) => updateData(`${api.buttonType}${id}/`, data),
        onSuccess: (response) => {
            updateDeviceData(queryClient, response.data, response.status);
            queryClient.invalidateQueries({queryKey:["availableAction", id]})
        }
    })
}