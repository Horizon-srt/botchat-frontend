/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useEffect, useState } from 'react';

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
    <div>{response_word}</div>
  );
};

export default Response;