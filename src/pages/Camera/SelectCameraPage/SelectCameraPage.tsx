import styles from './SelectCameraPage.module.css'
import CameraCard from "../../../components/Cards/CameraCard/CameraCard.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import StyledLink from "../../../components/ui/StyledLink/StyledLink.tsx";
import useCameraQuery from "../../../hooks/queries/useCameraQuery.tsx";
import {useEffect, useState} from "react";
import {ICamera} from "../../../interfaces/ICamera.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";

export default function SelectCameraPage() {
    const {cameraData,status, isLoading} = useCameraQuery();
    const [cameras, setCameras] = useState<ICamera[]>([]);

    useEffect(() => {
        if (cameraData && status === 200) {
            setCameras(cameraData);
        }
    }, [cameraData]);
    return(
        <PageContainer>
            <PageHeader title="Kamery">
                <StyledLink to={"add/"} type="fancy">Dodaj kamerę</StyledLink>
            </PageHeader>
            {isLoading? <LoadingAnimation size="xlarge" type="spinner" glow={true}/>:
                <div className={styles.container}>
                    {cameras?.map((camera) => (
                        <CameraCard key={camera.id} id={camera.id} name={camera.name}/>
                    ))}
                </div>}
        </PageContainer>
    )
}
