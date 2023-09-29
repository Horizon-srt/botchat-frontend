/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Aiphoto from '@/assets/Aiphoto.jpg';
import AudioButton from '@/assets/AudioButton.png';
import styles from '@/components/Response/styles/style.module.css';
import { Card, Message } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

interface ResponseProps {
  response_voice: string,
  response_word: string
}

const Response: React.FC<ResponseProps> = ({
  response_voice,
  response_word
}) => {
  const audioRef = useRef(null);
  const [play, setPlay] = useState<boolean>(false);

  const handleVoice = () => {
    if (!play) {
      // setVoiceUrl(URL.createObjectURL(response_voice));
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
    <div className={styles.response}>
      <IconUser className={styles.avator}/>
      <Card
        title='Chatbot'
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
        <div style={{ fontSize: '20px' }}>
          {response_word}
        </div>
        <audio ref={audioRef}>
          <source
            src={`data:audio/mpeg;base64,${response_voice}`}
            type="audio/mpeg"
          />
        </audio>
      </Card>
    </div>
  );
};

export default Response;