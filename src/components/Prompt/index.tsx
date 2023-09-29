/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/components/Prompt/styles/style.module.css';
import Bjut from '@/assets/Bjut.jpg';
import AudioButton from '@/assets/AudioButton.png';
import Image from 'next/image';
import { Card, Message, Popover } from '@arco-design/web-react';
import { IconInfoCircle } from '@arco-design/web-react/icon';

interface PromptProps {
  audio_assessment: string;
  prompt_word: string;
  prompt_voice: string;
}

const Prompt: React.FC<PromptProps> = ({
  audio_assessment,
  prompt_word,
  prompt_voice,
}) => {
  const audioRef = useRef(null);
  const [play, setPlay] = useState<boolean>(false);

  const handleVoice = () => {
    if (!play) {
      // 播放音频
      audioRef.current.play();
      setPlay(!play);
    } else {
      // 结束播放
      audioRef.current.pause();
      setPlay(!play);
    }
  };

  return (
    <div className={styles.prompt}>
      <Card
        title='UserName'
        bordered={false}
        className={styles.card}
        extra={
          <Image
            src={AudioButton}
            alt='default avator'
            className={styles.audiobutton}
            onClick={handleVoice}
          />}
      >
        <div>{prompt_word}</div>
        <Popover
          position='br'
          title='Here is the comment'
          content={
            <span>
              <p>{audio_assessment ? audio_assessment : 'No comments'}</p>
            </span>
          }
        >
          <IconInfoCircle className={styles.iconInfo}/>
        </Popover>
      </Card>
      <Image src={Bjut} alt='default avator' className={styles.avator}></Image>
      <audio ref={audioRef}>
        <source
          src={`data:audio/mpeg;base64,${prompt_voice}`}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default Prompt;