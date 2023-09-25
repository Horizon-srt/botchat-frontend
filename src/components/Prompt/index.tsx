/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Store } from '@/store/store';
import { useStore } from 'reto';
import styles from '@/components/Prompt/styles/style.module.css';
import Bjut from '@/assets/Bjut.jpg';
import AudioButton from '@/assets/AudioButton.png';
import Image from 'next/image';
import { Card, Popover, Skeleton, Trigger } from '@arco-design/web-react';
import { IconInfoCircle } from '@arco-design/web-react/icon';

interface PromptProps {
    prompt: string;
    response_voice: Blob,
    response_word: string
}

const Prompt: React.FC<PromptProps> = ({
  prompt,
  response_voice,
}) => {
  const {userInfo} = useStore(Store);
  const audioRef = useRef(null);
  const [play, setPlay] = useState<boolean>(false);
  const [voiceUrl, setVoiceUrl] = useState<string>('');
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
    <div className={styles.prompt}>
      <Card style={{ width: 360 }}
        title='UserName'
        bordered={false}
        className={styles.card}
        extra={<Image src={AudioButton}  alt='default avator' className={styles.audiobutton} onClick={handleVoice}/>}
      >
        {prompt}
        <Popover
          position='br'
          title='Here is the comment'
          content={
            <span>
              <p>Here is the text content</p>
              <p>Here is the text content</p>
            </span>
          }
        >
          <IconInfoCircle className={styles.iconInfo}/>
        </Popover>
      </Card>
      <Image src={Bjut} alt='default avator' className={styles.avator}></Image>
      <audio ref={audioRef}>
        <source src="http://streaming.tdiradio.com:8000/house.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Prompt;