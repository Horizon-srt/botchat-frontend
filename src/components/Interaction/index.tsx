/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { postVoice, postWords } from '@/api/api';
import styles from '@/components/Interaction/styles/style.module.css';
import { Store } from '@/store/store';
import useMediaRecorder from '@/utils/useMediaRecorder';
import { Button, Input, Message } from '@arco-design/web-react';
import { IconVoice } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { useStore } from 'reto';
import { TopicProps } from '@/utils/appType';

interface InteractionProps {
  topic: TopicProps,
  updateTopics: boolean,
  setUpdateTopics: (args: boolean) => void,
  updateTopic: boolean,
  setUpdateTopic: (args: boolean) => void
}

const Interaction: React.FC<InteractionProps> = ({
  topic,
  updateTopics,
  updateTopic,
  setUpdateTopics,
  setUpdateTopic
}) => {
  const [prompt_word, setPrompt_word] = useState('');
  const [onRecord, setOnRecord] = useState(false);
  const {userInfo} = useStore(Store);
  const {mediaBlob, startRecord, stopRecord} = useMediaRecorder();

  const handleSubmit = async () => {
    try {
      const res = await postWords({
        user_id: userInfo.user_id,
        topic_id: topic.topic_id,
        prompt_word: prompt_word
      });
      if (res) {
        if (res.topic_id !== topic.topic_id) {
          setUpdateTopics(!updateTopics);
        } else {
          setUpdateTopic(!updateTopic);
        }
      } else {
        Message.error('Submit failed!');
      }
    } catch (e) {
      Message.error('Submit failed!');
    }

  };

  const handleVoice = async () => {
    try {
      if (onRecord) {
        stopRecord();
        setOnRecord(false);
        const res = await postVoice({
          user_id: userInfo.user_id,
          topic_id: topic.topic_id,
          prompt_voice: mediaBlob
        });
        if (res) {
          if (res.topic_id !== topic.topic_id) {
            setUpdateTopics(!updateTopics);
          } else {
            setUpdateTopic(!updateTopic);
          }
        } else {
          Message.error('Submit failed!');
        }
      } else {
        setOnRecord(true);
        startRecord();
      }
    } catch (e) {
      Message.error('Record audio failed... Please try again');
    }
  };

  return (
    <div className={styles.interaction}>
      <Input.TextArea
        className={styles.area}
        onChange={e => {setPrompt_word(e);}}
        value={prompt_word}
      />
      <IconVoice className={styles.icon} onClick={handleVoice}/>
      <Button
        type='primary'
        shape='round'
        className={styles.submitButton}
        style={{backgroundColor:'#04B000'}}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Interaction;