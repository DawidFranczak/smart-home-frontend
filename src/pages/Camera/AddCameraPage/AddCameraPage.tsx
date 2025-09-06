import styles from "./AddCameraPage.module.css";
import FormContainer from "../../../components/ui/containers/FormContainer/FormContainer.tsx";
import Header from "../../../components/ui/Headers/Header/Header.tsx";
import FormField from "../../../components/ui/FormField/FormField.tsx";
import ButtonContainer from "../../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";
import Button from "../../../components/ui/Buttons/Button/Button.tsx";
import useCameraMutation from "../../../hooks/queries/useCameraMutation.tsx";
import {ICameraCreate} from "../../../interfaces/ICamera.tsx";
import {ICustomError} from "../../../interfaces/ICustomError.tsx";

export default function AddCameraPage() {
    const {createCamera} = useCameraMutation();
    const mutation = createCamera();
    function handleAdd(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataObj : ICameraCreate = Object.fromEntries(data);
        mutation.mutate(dataObj);
    }
    const error :ICustomError | null = mutation.error
    return (
        <div className={styles.container}>
            <FormContainer>
                <form onSubmit={handleAdd} className={styles.form}>
                    <Header>Dodaj kamerę</Header>
                    <FormField
                        name="name"
                        type="text"
                        placeholder="Nazwa"
                        error={error?.details?.name}
                    />
                    <FormField
                        name="ip_address"
                        type="text"
                        placeholder="Adres ip"
                        error={error?.details?.ip_address}

                    />
                    <FormField
                        name="port"
                        type="number"
                        placeholder="Port"
                        error={error?.details?.port}

                    />
                    <FormField
                        name="username"
                        type="text"
                        placeholder="Nazwa użytkownika"
                        error={error?.details?.username}

                    />
                    <FormField
                        name="password"
                        type="text"
                        placeholder="Hasło"
                        error={error?.details?.password}

                    />
                    <FormField
                        name="path"
                        type="text"
                        placeholder="Ścieżka"
                        error={error?.details?.path}
                    />
                    <ButtonContainer>
                        <Button type="fancy">Dodaj</Button>
                    </ButtonContainer>
                </form>
            </FormContainer>
        </div>
    )
}