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
  const [voiceUrl, setVoiceUrl] = useState<string>('');

  useEffect(() => {
    try {
      const base64Data = response_voice;
      const binaryData = atob(base64Data);
      const uint8Array = new Uint8Array(new ArrayBuffer(binaryData.length));
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const blobData = new Blob(
        [uint8Array],
        { type: 'application/octet-stream' }
      );
      setVoiceUrl(URL.createObjectURL(blobData));
    } catch (e) {
      Message.error('Resolve voice failed... Please try again');
    }
  }, [response_voice]);

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
      if (voiceUrl) {
        URL.revokeObjectURL(voiceUrl);
      }
      setVoiceUrl('');
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
            src={voiceUrl}
            type="audio/mpeg"
          />
        </audio>
      </Card>
    </div>
  );
};

export default Response;