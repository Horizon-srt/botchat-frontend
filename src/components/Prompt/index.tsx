/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Store } from '@/store/store';
import { useStore } from 'reto';
import styles from '@/components/Prompt/styles/style.module.css';
import Bjut from '@/assets/Bjut.jpg';

interface PromptProps {
    prompt: string;
}

const Prompt: React.FC<PromptProps> = ({ prompt }) => {
  const {userInfo} = useStore(Store);

  return (
    <div>
      <div className={styles.prompt}>{prompt}</div>
      {/* <Image></Image> */}
    </div>
  );
};

export default Prompt;