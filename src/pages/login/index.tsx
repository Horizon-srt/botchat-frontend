import { useEffect, useState } from 'react';
import styles from '@/pages/login/styles/style.module.css'
import mainStyles from '@/styles/main.module.css'
import router from 'next/router';
import { Store } from '@/store/store';
import { useStore } from 'reto';
import { Button, Form, Input } from '@arco-design/web-react';
import Link from 'next/link';
import { postUserLogin } from '@/api/api';
import { UserLoginProps } from '@/utils/appType';

const Login = () => {
    const [form] = Form.useForm();
    const {setUserInfo, setLoginState, loginState} = useStore(Store);

    useEffect(() => {
        if (loginState) {
            router.push('/home');
        }
    }, [loginState]);

    const handleLogin = async () => {
        console.log(form.getFieldsValue())
        try {
            const res = await postUserLogin({...form.getFieldsValue()} as UserLoginProps);
            console.log(res)
            if (res) {
                setUserInfo(res)
                setLoginState(true)
            } else {
                console.log(res)
            }
        } catch(e) {
            console.log(e)
        };
    }

    return (
        <main className={mainStyles.background}>
            <div className={styles.container}>
                <div className={mainStyles.container}>
                    <Form className={styles.content} form={form} wrapperCol={{ span: 16 }}>
                        <p className={styles.title}>Login</p>
                        <Form.Item
                            className={styles.formitem}
                            field='username'
                            rules={[
                              {
                                required: true,
                                type: 'string',
                              },
                            ]}
                        >
                            <Input
                                className={mainStyles.inputBox} 
                                style={{height:'32px', width:'350px'}}
                                placeholder='User Name'
                            />
                        </Form.Item>
                        <Form.Item
                            className={styles.formitem}
                            field='password'
                            rules={[
                              {
                                required: true,
                                type: 'string',
                              },
                            ]}
                        >
                            <Input.Password
                                className={mainStyles.inputBox} 
                                style={{height:'32px', width:'350px'}}
                                placeholder='Password'
                            />
                        </Form.Item>
                        <div className={styles.buttonArea}>
                            <Button 
                                className={mainStyles.loginButton}
                                style={{height:'32', width:'350px', color:'#ffffff'}}
                                onClick={handleLogin}
                            >
                                login
                            </Button>
                            <p>{"Don't have an account? "}
                                <Link href={'/register'}>
                                    Register!
                                </Link>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Login;