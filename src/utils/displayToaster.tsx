import {Message, toaster} from "rsuite";
import {PlacementType} from "rsuite/esm/toaster/ToastContainer";
import {TypeAttributes} from "rsuite/cjs/internals/types";
import Status = TypeAttributes.Status;

export default function displayToaster(message:string, type:Status="success", placement:PlacementType="topCenter",duration=3000) {
    toaster.push(
        <Message closable type={type} showIcon >
            {message}
        </Message>,
        { placement, duration }
    );
}