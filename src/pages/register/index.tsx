import { useState } from 'react';
import styles from '@/pages/login/styles/style.module.css'
import mainStyles from '@/styles/main.module.css'
import router from 'next/router';
import { Input, Button, Form } from '@arco-design/web-react';
import Link from 'next/link';
import form from '@arco-design/web-react/es/Form/form';
import { postUserRegister } from '@/api/api';
import { UserRegisterProps } from '@/utils/appType';

const Register = () => {
    const [form] = Form.useForm();

    const handleRegister = async () => {
        console.log(form.getFieldsValue())
        try {
            const res = await postUserRegister({...form.getFieldsValue()} as UserRegisterProps);
            router.push('/login')
        } catch (e) {
            console.log(e)
        }
        
    }

    return (
        <main className={mainStyles.background}>
            <div className={styles.container}>
                <div className={mainStyles.container}>
                    <Form className={styles.content} form={form} wrapperCol={{ span: 16 }}>
                        <p className={styles.title}>Register</p>
                        <Form.Item
                            className={styles.formitem}
                            field='username'
                            rules={[
                                {
                                    required: true,
                                    type: 'string',
                                    maxLength: 30
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
                                    minLength: 6
                                },
                            ]}
                        >
                            <Input.Password
                                className={mainStyles.inputBox} 
                                style={{height:'32px', width:'350px'}}
                                placeholder='Password'
                            />
                        </Form.Item>
                        <Form.Item
                            className={styles.formitem}
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
                        >
                            <Input 
                                className={mainStyles.inputBox} 
                                style={{height:'32px', width:'350px'}}
                                placeholder='Email Address'
                            />
                        </Form.Item>
                        <div className={styles.buttonArea}>
                            <Button 
                                className={mainStyles.loginButton}
                                style={{height:'32', width:'350px', color:'#ffffff'}}
                                onClick={handleRegister}
                            >
                                register
                            </Button>
                            <p>{"Already have an account? "}
                                <Link href={'/login'}>
                                    Log in!
                                </Link>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Register;