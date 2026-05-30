import { FieldTemplateProps, ObjectFieldTemplateProps } from '@rjsf/utils';
import { Form  } from 'rsuite';
import styles from "./RuleForm.module.css";

export const CustomObjectFieldTemplate = ({ properties }: ObjectFieldTemplateProps) => {
    return (
        <div className={styles.schemaObject}>
            {properties.map((element) => (
                <div key={element.content.key} className={styles.schemaObjectItem}>
                    {element.content}
                </div>
            ))}
        </div>
    );
};
export const CustomFieldTemplate = ({id,label,children,required,displayLabel,rawErrors,}: FieldTemplateProps) => {
    const hasError = rawErrors && rawErrors.length > 0;
    if (!displayLabel && !hasError) return <>{children}</>;

    return (
        <Form.Group
            controlId={id}
            className={styles.schemaGroup}
        >
            <Form.ControlLabel
                className={hasError ? styles.schemaLabelError : styles.schemaLabel}
            >
                {label}
                {required && <span className={styles.requiredMark}>*</span>}
            </Form.ControlLabel>

            <div className={styles.schemaField}>
                {children}
            </div>
            {hasError && (
                <Form.ErrorMessage
                    show={true}
                    className={styles.schemaErrorMessage}
                >
                    {rawErrors[0]}
                </Form.ErrorMessage>
            )}
        </Form.Group>
    );
};
export const customTemplates = {
    FieldTemplate: CustomFieldTemplate,
    ObjectFieldTemplate: CustomObjectFieldTemplate,
};
