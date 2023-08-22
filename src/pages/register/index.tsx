/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from '@/pages/login/styles/style.module.css';
import mainStyles from '@/styles/main.module.css';
import router from 'next/router';
import { Button, Form, Message } from '@arco-design/web-react';
import Link from 'next/link';
import { postUserRegister } from '@/api/api';
import { UserRegisterProps } from '@/utils/appType';
import InputItem from '@/components/InputItem';

const Register = () => {
  const [form] = Form.useForm();

  const handleRegister = async () => {
    console.log(form.getFieldsValue());
    try {
      const res = await postUserRegister(
        {...form.getFieldsValue()} as UserRegisterProps
      );
      if (res) {
        Message.success('Register success!');
      } else {
        Message.error('Register failed!');
      }
      router.push('/login');
    } catch (e) {
      Message.error('Register failed!');
    }
  };

  return (
    <main className={mainStyles.background}>
      <div className={styles.container}>
        <div className={mainStyles.container}>
          <Form
            className={styles.content}
            form={form}
            wrapperCol={{ span: 16 }}
          >
            <p className={styles.title}>Register</p>
            <InputItem
              field='username'
              rules={[
                {
                  required: true,
                  type: 'string',
                  maxLength: 30
                },
              ]}
              placeholder='User Name'
              password={false}
            />
            <InputItem
              field='password'
              rules={[
                {
                  required: true,
                  type: 'string',
                  minLength: 6
                },
              ]}
              placeholder='Password'
              password={true}
            />
            <InputItem
              field='email'
              rules={[
                {
                  type: 'email',
                  validateLevel: 'warning',
                },
                {
                  required: true,
                  type: 'string',
                },
              ]}
              placeholder='Email Address'
              password={false}
            />
            <div className={styles.buttonArea}>
              <Button
                className={mainStyles.loginButton}
                style={{height:'32', width:'350px', color:'#ffffff'}}
                onClick={handleRegister}
              >
                                register
              </Button>
              <p>{'Already have an account? '}
                <Link href={'/login'}>
                                    Log in!
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Register;