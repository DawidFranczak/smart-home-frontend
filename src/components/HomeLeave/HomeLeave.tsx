import ConfirmDelete from "../ConfirmDelete/ConfirmDelete.tsx";
import {useNavigate} from "react-router-dom";
import useHomeMutation from "../../hooks/queries/useHomeMutation.tsx";
import {useEffect} from "react";
import { useTranslation } from "react-i18next";
export default function HomeLeave() {
    const { t } = useTranslation();
    const { deleteHome } = useHomeMutation();
    const deleteHomeMutation = deleteHome();
    const navigate = useNavigate();

    useEffect(() => {
        if (deleteHomeMutation.isSuccess) {
            navigate("/");
        }
    }, [deleteHomeMutation.isSuccess]);

    function handleConfirm() {
        deleteHomeMutation.mutate();
    }

    function handleCancel() {
        navigate("/");
    }

    return (
        <ConfirmDelete
            show={true}
            name={t("homeLeave.homeName")}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
}
