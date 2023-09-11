/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import {
  postChatWithOpenAI,
  postHandleAudio,
  postTextToSpeech
} from '@/api/api';
import styles from '@/components/Interaction/styles/style.module.css';
import { Store } from '@/store/store';
import useMediaRecorder from '@/utils/useMediaRecorder';
import { Button, Input, Message } from '@arco-design/web-react';
import { IconVoice } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { useStore } from 'reto';
import { DetailProps, TopicProps } from '@/utils/appType';

interface InteractionProps {
  topic: TopicProps,
  updateTopics: boolean,
  setUpdateTopics: (args: boolean) => void,
  updateTopic: boolean,
  setUpdateTopic: (args: boolean) => void,
  details: DetailProps[],
  setDetails: (args: DetailProps[]) => void
}

const Interaction: React.FC<InteractionProps> = ({
  topic,
  updateTopics,
  updateTopic,
  setUpdateTopics,
  setUpdateTopic,
  details,
  setDetails
}) => {
  const [prompt_word, setPrompt_word] = useState('');
  const [onRecord, setOnRecord] = useState(false);
  const {userInfo} = useStore(Store);
  const {mediaBlob, startRecord, stopRecord} = useMediaRecorder();
  // 语音转文字后处理对话
  const [shouldHandleChat, setShouldHandleChat] = useState(false);
  // 文字转为语音
  const [shouldHandleWord, setShouldHandleWord] = useState(false);

  useEffect(() => {
    if (shouldHandleChat) {
      const getChat = async () => {
        const tempDetails = details;
        const tempDetail = tempDetails.pop();
        try {
          const res = await handleChat(
            prompt_word,
            '-1',
            tempDetail as DetailProps
          );
          if (res) {
            // tempDetails = details;
            tempDetails.push(tempDetail as DetailProps);
            setDetails(tempDetails);
          } else {
            Message.error('Submit failed!');
          }
        } catch (e) {
          Message.error('Submit failed!');
        }
      };
      getChat();
      setShouldHandleChat(false);
    }
  }, [details]);

  useEffect(() => {
    if (shouldHandleWord) {
      const getVoice = async () => {
        const tempDetails = details;
        const tempDetail = tempDetails.pop();
        if (!tempDetail) return;
        try {
          const res = await postTextToSpeech({
            conversation_id: tempDetail.conversation_id,
            response_word: tempDetail.response_word
          });
          tempDetail.response_voice = res.response_voice;
          tempDetails.push(tempDetail);
        } catch (e) {
          Message.error('Submit failed!');
        }
      };
      getVoice();
      setShouldHandleWord(false);
    }
  }, [details]);

  const handleChat = async (
    prompt: string,
    conversation_id: string,
    detail: DetailProps
  ) => {
    const tempDetail = {} as DetailProps;
    // let tempDetails = [];
    try {
      const res = await postChatWithOpenAI({
        user_id: userInfo.user_id,
        prompt_word: prompt,
        topic_id: topic.topic_id,
        conversation_id: conversation_id
      });
      if (res) {
        tempDetail.conversation_id = res.conversation_id;
        tempDetail.prompt_word = prompt;
        tempDetail.prompt_voice = detail.prompt_voice;
        tempDetail.response_voice = new Blob();
        tempDetail.response_word = res.response_word;
        tempDetail.audio_assessment = '';

        // tempDetails = details;
        // tempDetails.push(tempDetail);
        // setDetails(tempDetails);
        return tempDetail;
      } else {
        Message.error('Submit failed!');
        return null;
      }
    } catch (e) {
      Message.error('Submit failed!');
      return null;
    }
  };

  const handleSubmit = async () => {
    const tempDetail = {} as DetailProps;
    let tempDetails = [];
    try {
      const res = await handleChat(prompt_word, '-1', tempDetail);
      if (res) {
        tempDetails = details;
        tempDetails.push(tempDetail);
        setShouldHandleWord(true);
        setDetails(tempDetails);
      } else {
        Message.error('Submit failed!');
      }
    } catch (e) {
      Message.error('Submit failed!');
    }

    // const tempDetail = {} as DetailProps;
    // let tempDetails = [];
    // try {
    //   const res = await postChatWithOpenAI({
    //     user_id: userInfo.user_id,
    //     prompt_word: prompt_word,
    //     topic_id: topic.topic_id,
    //     conversation_id: '-1'
    //   });
    //   if (res) {
    //     tempDetail.conversation_id = res.conversation_id;
    //     tempDetail.prompt = prompt_word;
    //     tempDetail.response_voice = new Blob();
    //     tempDetail.response_word = res.response_word;
    //     tempDetail.audio_assessment = '';

    //     tempDetails = details;
    //     tempDetails.push(tempDetail);
    //     setDetails(tempDetails);
    //   } else {
    //     Message.error('Submit failed!');
    //   }
    // } catch (e) {
    //   Message.error('Submit failed!');
    // }
    // try {
    //   const res = await postWords({
    //     user_id: userInfo.user_id,
    //     topic_id: topic.topic_id,
    //     prompt_word: prompt_word
    //   });
    //   if (res) {
    //     if (res.topic_id !== topic.topic_id) {
    //       setUpdateTopics(!updateTopics);
    //     } else {
    //       setUpdateTopic(!updateTopic);
    //     }
    //   } else {
    //     Message.error('Submit failed!');
    //   }
    // } catch (e) {
    //   Message.error('Submit failed!');
    // }
  };

  const handleVoice = async () => {
    const tempDetail = {} as DetailProps;
    let tempDetails = [];
    try {
      if (onRecord) {
        stopRecord();
        setOnRecord(false);
        const res = await postHandleAudio({
          user_id: userInfo.user_id,
          prompt_voice: mediaBlob,
          topic_id: topic.topic_id
        });
        if (res) {
          tempDetail.audio_assessment = '';
          tempDetail.conversation_id = res.conversation_id;
          tempDetail.prompt_word = res.prompt;
          tempDetail.prompt_voice = mediaBlob;
          tempDetail.response_voice = new Blob();
          tempDetail.response_word = '';

          tempDetails = details;
          tempDetails.push(tempDetail);
          setShouldHandleWord(true);
          setShouldHandleChat(true);
          setDetails(tempDetails);
        }
        // const res = await postVoice({
        //   user_id: userInfo.user_id,
        //   topic_id: topic.topic_id,
        //   prompt_voice: mediaBlob.toString()
        // });
        // if (res) {
        //   if (res.topic_id !== topic.topic_id) {
        //     setUpdateTopics(!updateTopics);
        //   } else {
        //     setUpdateTopic(!updateTopic);
        //   }
        // } else {
        //   Message.error('Submit failed!');
        // }
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