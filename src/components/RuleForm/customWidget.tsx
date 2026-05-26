import {Checkbox, IconButton, NumberInput, Button, SelectPicker} from "rsuite";
import {WidgetProps } from '@rjsf/utils';
import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUpIcon from '@rsuite/icons/SortUp';
export const customTemplates = {
    ButtonTemplates: {
        AddButton: (props: any) => (
            <Button
                {...props}
                appearance="ghost"
                startIcon={<PlusIcon />}
                size="sm"
                style={{ marginTop: '10px' }}
            >
                Dodaj element
            </Button>
        ),
        RemoveButton: (props: any) => (
            <IconButton
                {...props}
                icon={<TrashIcon />}
                appearance="subtle"
                color="red"
                size="xs"
            />
        ),
        MoveDownButton: (props: any) => (
            <IconButton
                {...props}
                icon={<SortDownIcon/>}
                appearance="subtle"
                color="red"
                size="xs"
            />
        ),
        MoveUpButton: (props: any) => (
            <IconButton
                {...props}
                icon={<SortUpIcon/>}
                appearance="subtle"
                color="red"
                size="xs"
            />
        ),
    },
};


const IntegerWidget = (props: WidgetProps) => {
    return (
        <div style={{ marginBottom: 10 }}>
            <NumberInput
                style={{ width: '100%' }}
                value={props.value ?? ""}
                onChange={(val) => {
                    const result = val === "" ? undefined : Number(val);
                    props.onChange(result);
                }}
                step={0.5}

            />
        </div>
    );
};

export const CheckboxWidget = ({ value, onChange, label }: WidgetProps) => (
    <Checkbox checked={!!value} onChange={(_, checked) => onChange(checked)}>
        {label}
    </Checkbox>
);


export const SelectWidget = ({id,options,value,disabled,readonly,onChange,}: WidgetProps) => {
    const data = (options.enumOptions as any[])?.map(opt => ({
        label: opt.label,
        value: opt.value
    })) ?? [];

    return (
        <SelectPicker
            id={id}
            block
            data={data}
            value={value}
            disabled={disabled || readonly}
            onChange={(val) => onChange(val)}
            cleanable={!options.emptyValue}
        />
    );
};

export const customWidget = {
    integer: IntegerWidget,
    number: IntegerWidget,
    string: IntegerWidget,
    BaseInput: IntegerWidget,
    TextWidget: IntegerWidget,
    NumberWidget: IntegerWidget,
    CheckboxWidget: CheckboxWidget,
    SelectWidget:SelectWidget
};