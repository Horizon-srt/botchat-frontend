/* eslint-disable @typescript-eslint/no-unused-vars */
import { postChangeInfo } from '@/api/api';
import { Store } from '@/store/store';
import styles from '@/pages/profile/styles/style.module.css';
import mainStyles from '@/styles/main.module.css';
import { Button, Form, Input, Message } from '@arco-design/web-react';
import React from 'react';
import router from 'next/router';
import { useEffect } from 'react';
import { useStore } from 'reto';
import Image from 'next/image';
import Bjut from '@/assets/Bjut.jpg';

const Profile = () => {
  const {loginState, userInfo, setUserInfo} = useStore(Store);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!loginState) {
      router.push('/login');
    }
  }, [loginState]);

  const handleSave = async () => {
    console.log(form.getFieldsValue());
    try {
      const res = await postChangeInfo({
        user_id: userInfo.user_id,
        username: form.getFieldValue('username'),
        password: form.getFieldValue('password'),
        email: form.getFieldValue('email')
      });
      if (res) {
        setUserInfo({...res});
        form.clearFields();
        Message.success('Save information success!');
      } else {
        Message.error('Save information failed!');
      }
    } catch (e) {
      Message.error('Save information failed!');
    }
  };

  return (
    <main className={mainStyles.background}>
      <div className={styles.page}>
        <div className={styles.avatorbox} >
          <Image src={Bjut} alt='default avator' className={styles.avator}/>
        </div>
        <div className={styles.container}>
          <div className={mainStyles.container}>
            <Form className={styles.content} form={form}>
              <div className={styles.oneLine}>
                <div className={styles.username}>username:</div>
                <Form.Item
                  field='username'
                  defaultValue={userInfo.username}
                  className={styles.username}
                  rules={[
                    {
                      required: true,
                      type: 'string',
                    },
                  ]}
                >
                  <Input
                    className={styles.inputBox}
                    placeholder="Enter your userName"
                    style={{width:'430px', height:'64px'}}
                  />
                </Form.Item>
              </div>
              <div className={styles.oneLine}>
                <div className={styles.password}>password:</div>
                <Form.Item
                  field='password'
                  defaultValue={userInfo.username}
                  className={styles.password}
                  rules={[
                    {
                      required: true,
                      type: 'string',
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className={styles.inputBox}
                    style={{width:'430px'}}
                  />
                </Form.Item>
              </div>
              <div className={styles.oneLine}>
                <div className={styles.email}>email:</div>
                <Form.Item
                  field='email'
                  defaultValue={userInfo.username}
                  className={styles.email}
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
                    type='email'
                    className={styles.emailInputBox}
                    placeholder="Enter your email"
                    style={{width:'430px'}}
                  />
                </Form.Item>
              </div>
              <div className={styles.buttons}>
                <Button
                  className={mainStyles.loginButton}
                  onClick={handleSave}
                  style={{width: '150px', height:'32px', marginRight:'30px'}}
                >
                Save Change
                </Button>
                <Button
                  className={mainStyles.loginButton}
                  onClick={() => {router.back();}}
                  style={{width: '150px', height:'32px'}}
                >
                Back
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;