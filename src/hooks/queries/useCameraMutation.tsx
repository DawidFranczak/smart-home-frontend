import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "../useFetch.tsx";
import {api} from "../../constant/api.ts";
import {ICamera, ICameraCreate} from "../../interfaces/ICamera.tsx";
import CacheKey from "../../constant/cacheKey.ts";


export default function useCameraMutation(){
    const {createData, deleteData} = useFetch()
    const queryClient = useQueryClient();
    function createCamera(){
        return useMutation({
            mutationFn:(data:ICameraCreate) => createData(api.cameras, data),
            onSuccess: (response) => {
                if(response.status === 201){
                    const cameras = queryClient.getQueryData([CacheKey.CAMERAS]) as {status: number, data: ICamera[]} | undefined;
                    if (cameras){
                        queryClient.setQueryData([CacheKey.CAMERAS], {...cameras, data: [...cameras?.data, response.data]});
                        return
                    }
                    queryClient.setQueryData([CacheKey.CAMERAS], response);
                }
            }
        })
    }
    function deleteCamera(id: number){
        return useMutation({
            mutationFn: () => deleteData(`${api.cameras}${id}/`),
            onSuccess: () => {
            }
        })
    }

    return {createCamera, deleteCamera}
}