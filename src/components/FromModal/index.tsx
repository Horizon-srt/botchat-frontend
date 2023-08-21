import { Button, Form, Modal } from "@arco-design/web-react";
import { FormInstance } from "@arco-design/web-react/es/Form";
import { ReactElement } from "react";
import mainStyles from '@/styles/main.module.css'
import styles from './styles/style.module.css'

interface FormModalProps {
    visible: boolean;
    title: string;
    form: FormInstance<any, any, string | number | symbol>;
    children: ReactElement;
    onSubmit: () => void;
    setVisible: (args: boolean) => void;
}

const FormModal: React.FC<FormModalProps> = ({ visible, title, form, children, onSubmit, setVisible }) => {
    const onCancel = () => {
        setVisible(false);
    }

    return (
        <Modal 
            title={title} 
            visible={visible}
            onCancel={onCancel}
            maskClosable
            footer={
                <>
                    <Button className={mainStyles.loginButton} onClick={onCancel}>Cancel</Button>
                    <Button className={mainStyles.loginButton} onClick={onSubmit}>Submit</Button>
                </>
            }
            className={styles.modal}
        >
            <Form form={form}>
                {children}
            </Form>
        </Modal>
    );
}

export default FormModal;