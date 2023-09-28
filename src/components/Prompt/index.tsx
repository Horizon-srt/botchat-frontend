/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/components/Prompt/styles/style.module.css';
import Bjut from '@/assets/Bjut.jpg';
import AudioButton from '@/assets/AudioButton.png';
import Image from 'next/image';
import { Card, Message, Popover } from '@arco-design/web-react';
import { IconInfoCircle } from '@arco-design/web-react/icon';

interface PromptProps {
  audio_assignment: string;
  prompt_word: string;
  prompt_voice: string;
}

const Prompt: React.FC<PromptProps> = ({
  audio_assignment,
  prompt_word,
  prompt_voice,
}) => {
  const audioRef = useRef(null);
  const [play, setPlay] = useState<boolean>(false);
  const [voiceUrl, setVoiceUrl] = useState<string>('');

  useEffect(() => {
    try {
      const base64Data = prompt_voice;
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
  }, [prompt_voice]);

  const handleVoice = () => {
    if (!play) {
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
              <p>{audio_assignment ? 'No comments' : audio_assignment}</p>
            </span>
          }
        >
          <IconInfoCircle className={styles.iconInfo}/>
        </Popover>
      </Card>
      <Image src={Bjut} alt='default avator' className={styles.avator}></Image>
      <audio ref={audioRef}>
        <source
          src={voiceUrl}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default Prompt;