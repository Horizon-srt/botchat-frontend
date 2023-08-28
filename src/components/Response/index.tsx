/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import Audio from 'react-audio-player';
import styles from '@/components/Response/styles/style.module.css';

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

  const handleVoice = () => {
    if (play) {
      setVoiceUrl(URL.createObjectURL(response_voice));
      // 播放音频
    } else {
      // 结束播放
      if (voiceUrl) {
        URL.revokeObjectURL(voiceUrl);
      }
      setVoiceUrl('');
    }
  };

  return (
    <div className={styles.response}>
      {response_word}
      <Audio controls src={voiceUrl}/>
    </div>
  );
};

export default Response;