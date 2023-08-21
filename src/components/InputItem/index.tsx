import React from 'react';
import { Form, Input, RulesProps } from '@arco-design/web-react';
import mainStyles from '@/styles/main.module.css';
import styles from '@/components/InputItem/styles/style.module.css';

interface InputItemProps {
    field: string;
    placeholder: string;
    rules: RulesProps<any>[];
    password: boolean;
}

const InputItem: React.FC<InputItemProps> = ({
  field,
  placeholder,
  rules,
  password
}) => {
  return (
    <Form.Item
      className={styles.formitem}
      field={field}
      rules={rules}
    >
      {password ? (
        <Input.Password
          className={mainStyles.inputBox}
          style={{height:'32px', width:'350px'}}
          placeholder={placeholder}
        />
      ) : (
        <Input
          className={mainStyles.inputBox}
          style={{height:'32px', width:'350px'}}
          placeholder={placeholder}
        />
      )}

    </Form.Item>
  );
};

export default InputItem;