import {useMutation} from "@tanstack/react-query";
import {api} from "../../constant/api.ts";
import useFetch from "../useFetch.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";

export default function useLogoutMutation() {
    const { deleteData } = useFetch();
    const { logout } = useAuth();
    return useMutation({
        mutationFn: () => deleteData(api.logout),
        onSuccess: () => logout(),
    });
}