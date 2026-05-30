import {Button, Checkbox, IconButton, Input, NumberInput, SelectPicker} from "rsuite";
import {WidgetProps } from '@rjsf/utils';
import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUpIcon from '@rsuite/icons/SortUp';
import styles from "./RuleForm.module.css";

export const customTemplates = {
    ButtonTemplates: {
        AddButton: (props: any) => (
            <Button
                {...props}
                appearance="ghost"
                startIcon={<PlusIcon />}
                size="sm"
                className={styles.schemaArrayButton}
            >
                Add item
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
    const step = props.schema.type === "integer" ? 1 : 0.5;

    return (
        <div className={styles.schemaControl}>
            <NumberInput
                className={styles.schemaInput}
                value={props.value ?? ""}
                onChange={(val) => {
                    const result = val === "" ? undefined : Number(val);
                    props.onChange(result);
                }}
                step={step}
                disabled={props.disabled || props.readonly}
            />
        </div>
    );
};

const TextWidget = (props: WidgetProps) => (
    <Input
        id={props.id}
        className={styles.schemaInput}
        value={props.value ?? ""}
        disabled={props.disabled || props.readonly}
        placeholder={props.placeholder}
        onChange={(value) => props.onChange(value === "" ? undefined : value)}
    />
);

export const CheckboxWidget = ({ value, onChange, label, disabled, readonly }: WidgetProps) => (
    <Checkbox
        className={styles.schemaCheckbox}
        checked={!!value}
        disabled={disabled || readonly}
        onChange={(_, checked) => onChange(checked)}
    >
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
            className={styles.schemaSelect}
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
    string: TextWidget,
    BaseInput: TextWidget,
    TextWidget: TextWidget,
    NumberWidget: IntegerWidget,
    CheckboxWidget: CheckboxWidget,
    SelectWidget:SelectWidget
};
