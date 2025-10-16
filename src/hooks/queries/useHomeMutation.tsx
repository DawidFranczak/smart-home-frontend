import useFetch from "../useFetch.tsx";
import {useMutation} from "@tanstack/react-query";
import {api} from "../../constant/api.ts";

export default function useHomeMutation() {
    const {updateData, deleteData} = useFetch();

    function updateHome() {
        return useMutation({
            mutationFn: (code: string) => updateData(api.home, {code})
        })
    }
    function deleteHome() {
        return useMutation({
            mutationFn: () => deleteData(api.home)
        })
    }
    return {updateHome,deleteHome}
}