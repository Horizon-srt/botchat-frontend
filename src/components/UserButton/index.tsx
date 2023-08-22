/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from '@/components/UserButton/styles/style.module.css';
import Image from 'next/image';
import Bjut from '@/assets/Bjut.jpg';
import { IconApps, IconDown } from '@arco-design/web-react/icon';
import { Dropdown, Menu } from '@arco-design/web-react';
import { useStore } from 'reto';
import { Store } from '@/store/store';
import router from 'next/router';
import { UserInfoProps } from '@/utils/appType';

const UserButton: React.FC = () => {
  const {userInfo, setUserInfo, setLoginState} = useStore(Store);

  const handlemenu = (key: string) => {
    if (key === 'profile') {
      router.push('/profile');
    } else {
      setUserInfo({} as UserInfoProps);
      setLoginState(false);
      router.push('/login');
    }
  };

  const dropList = (
    <Menu className={styles.menuarea} onClickMenuItem={handlemenu}>
      <Menu.Item key='profile' style={{color:'#165DFF'}}>Profile</Menu.Item>
      <Menu.Item key='logout'>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.userArea}>
      <div className={styles.avatorbox}>
        <Image src={Bjut} alt='default avator' className={styles.avator}/>
      </div>
      <IconApps fontSize='18px' className={styles.appicon} />
      <div className={styles.username}>{userInfo.username}</div>
      <Dropdown droplist={dropList} trigger='click' position='br'>
        <IconDown className={styles.downicon}/>
      </Dropdown>
    </div>
  );
};

export default UserButton;