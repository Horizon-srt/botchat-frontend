/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Store } from '@/store/store';
import { useStore } from 'reto';

interface PromptProps {
    prompt: string;
}

const Prompt: React.FC<PromptProps> = ({ prompt }) => {
  const {userInfo} = useStore(Store);

  return (
    <div>{prompt}</div>
  );
};

export default Prompt;