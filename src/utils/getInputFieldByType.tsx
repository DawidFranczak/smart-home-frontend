import {Checkbox, Form} from "rsuite";
import {SettingType} from "../pages/DeviceEventWizard/DeviceEventWizard.tsx";


export default function renderInputFieldByType(key:string, type:SettingType, formValue:object, setFormValue:(value: any) => void){
    switch(type){
        case "bool":
            return <Form.Group controlId={key} key={key}>
                <Checkbox
                    onChange={(_, checked)=>setFormValue({...formValue,[key]:checked})}
                >{key}</Checkbox>
            </Form.Group>
    }
}