/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Aiphoto from '@/assets/Aiphoto.jpg';
import AudioButton from '@/assets/AudioButton.png';
import styles from '@/components/Response/styles/style.module.css';
import { Card } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

interface ResponseProps {
  response_voice: Blob,
  response_word: string
}

const Response: React.FC<ResponseProps> = ({
  response_voice,
  response_word
}) => {
  const [play, setPlay] = useState<boolean>(false);
  const [voiceUrl, setVoiceUrl] = useState<string>('');
  useEffect(() => {
    setVoiceUrl(URL.createObjectURL(response_voice));
  }, [response_voice]);
  const audioRef = useRef(null);

  const handleVoice = () => {
    if (!play) {
      setVoiceUrl(URL.createObjectURL(response_voice));
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
        extra={<Image src={AudioButton}  alt='default avator' className={styles.audiobutton} onClick={handleVoice}/>}
      >
        <div style={{ fontSize: '20px' }}>
          {response_word}
        </div>
        <audio ref={audioRef}>
          <source src="http://streaming.tdiradio.com:8000/house.mp3" type="audio/mpeg" />
        </audio>
      </Card>
    </div>
  );
};

export default Response;