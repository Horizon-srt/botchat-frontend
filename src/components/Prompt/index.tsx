/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Store } from '@/store/store';
import { useStore } from 'reto';
import styles from '@/components/Prompt/styles/style.module.css';
import Bjut from '@/assets/Bjut.jpg';
import Image from 'next/image';
import { Card, Skeleton, Trigger } from '@arco-design/web-react';
import { IconInfoCircle } from '@arco-design/web-react/icon';

interface PromptProps {
    prompt: string;
}

const Prompt: React.FC<PromptProps> = ({ prompt }) => {
  const {userInfo} = useStore(Store);
  function Popup() {
    return (
      <div className={styles.demoTriggerPopup} style={{ width: 200 }}>
        Here is the commend.
      </div>
    );
  }

  return (
    <div className={styles.prompt}>
      <Card style={{ width: 360 }}
        title='UserName'
        bordered={false}
        className={styles.card}
      >
        {prompt}
        <Trigger
          popup={() => <Popup />}
          trigger={['hover']}
          clickToClose={false}
          classNames='zoomInTop'
        >
          <IconInfoCircle className={styles.iconInfo}/>
        </Trigger>
      </Card>
      <Image src={Bjut} alt='default avator' className={styles.avator}></Image>
    </div>
  );
};

export default Prompt;