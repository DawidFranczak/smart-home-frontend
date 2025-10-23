import { useMutation } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
}
export default function ChangePassworMutation() {
  const { createData } = useFetch();
  return useMutation({
    mutationFn: (data: IChangePassword) =>
      createData(api.changePassword, {
        current_password: data.currentPassword,
        new_password: data.newPassword,
        new_password2: data.newPassword2,
      }),
  });
}
