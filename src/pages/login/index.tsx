import React from 'react';
import { useEffect } from 'react';
import styles from '@/pages/login/styles/style.module.css';
import mainStyles from '@/styles/main.module.css';
import router from 'next/router';
import { Store } from '@/store/store';
import { useStore } from 'reto';
import { Button, Form } from '@arco-design/web-react';
import Link from 'next/link';
import { postUserLogin } from '@/api/api';
import { UserLoginProps } from '@/utils/appType';
import InputItem from '@/components/InputItem';

const Login = () => {
  const [form] = Form.useForm();
  const {setUserInfo, setLoginState, loginState} = useStore(Store);

  useEffect(() => {
    if (loginState) {
      router.push('/home');
    }
  }, [loginState]);

  const handleLogin = async () => {
    try {
      const res = await postUserLogin(
        {...form.getFieldsValue()} as UserLoginProps
      );
      if (res) {
        setUserInfo(res);
        setLoginState(true);
      } else {
        console.log(res);
      }
    } catch(e) {
      console.log(e);
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
            <p className={styles.title}>Login</p>
            <InputItem
              field='username'
              rules={[
                {
                  required: true,
                  type: 'string',
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
                },
              ]}
              placeholder='Password'
              password={true}
            />
            <div className={styles.buttonArea}>
              <Button
                className={mainStyles.loginButton}
                style={{height:'32', width:'350px', color:'#ffffff'}}
                onClick={handleLogin}
              >
                                login
              </Button>
              <p>{'Don\'t have an account? '}
                <Link href={'/register'}>
                                    Register!
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;