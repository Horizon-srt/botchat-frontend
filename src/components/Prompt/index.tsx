/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Store } from '@/store/store';
import { useStore } from 'reto';
import styles from '@/components/Prompt/styles/style.module.css';
import Bjut from '@/assets/Bjut.jpg';
import Image from 'next/image';
import { Card } from '@arco-design/web-react';

interface PromptProps {
    prompt: string;
}

const Prompt: React.FC<PromptProps> = ({ prompt }) => {
  const {userInfo} = useStore(Store);

  return (
    <div className={styles.prompt}>
      <Card style={{ width: 360 }}
        title='UserName'
        bordered={false}
      >
        {prompt}
      </Card>
      <Image src={Bjut} alt='default avator' className={styles.avator}></Image>
    </div>
  );
};

export default Prompt;