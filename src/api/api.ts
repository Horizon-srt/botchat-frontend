/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetTopicsProps,
  UserLoginProps,
  UserRegisterProps,
  GetTopicDetailProps,
  VoiceProps, WordsProps,
  ChangeInfoProps,
  ChangeThemeProps,
  CreateTopicProps
} from '@/utils/appType';
import axios from 'axios';

export const postUserLogin = async (args: UserLoginProps) => {
  // const { data } = await axios.post(
  //   'http://localhost:3306/botchat/user/login',
  //   {
  //     ...args
  //   });
  const mockUserInfo = {
    username: 'aaa',
    password: 'aaa',
    email: 'aaa',
    user_id: 'aaa'
  };

  return mockUserInfo;
};

export const postUserRegister = async (args: UserRegisterProps) => {
  const { data } = await axios.post(
    'http://localhost:3306/botchat/userregister',
    {
      ...args
    });
  return data;
};

///
export const getTopics = async (args: GetTopicsProps) => {
  // const { data } = await axios.get(
  //   'http://localhost:3306/botchat/chat/gettopics',
  //   {
  //     params: {
  //       ...args
  //     }
  //   });
  const mockTopics = {
    topics: [{
      topic_id: '100',
      theme: 'How to use Java'
    },
    {
      topic_id: '200',
      theme: 'pronunciation test'
    },
    {
      topic_id: '300',
      theme: 'Hello World'
    }]
  };
  return mockTopics;
};

export const getTopicDetail = async (args: GetTopicDetailProps) => {
  // const { data } = await axios.get(
  //   'http://localhost:3306/botchat/chat/getdetails',
  //   {
  //     params: {
  //       ...args
  //     }
  //   });
  const mockDetails = {
    details: [{
      detail_id: '1',
      prompt: 'Hello',
      response_word: 'Hi',
      response_voice: new Blob()
    },
    {
      detail_id: '2',
      prompt: 'how to learn js',
      response_word: 'god can help you',
      response_voice: new Blob()
    },
    {
      detail_id: '3',
      prompt: 'Really?',
      response_word: 'Really',
      response_voice: new Blob()
    }]
  };
  return mockDetails;
};

export const postVoice = async (args: VoiceProps) => {
  const { data } = await axios.post(
    'http://localhost:3306/botchat/chat/sendvoice',
    {
      ...args
    });
  return data;
};

export const postWords = async (args: WordsProps) => {
  const { data } = await axios.post(
    'http://localhost:3306/botchat/chat/sendword',
    {
      ...args
    });
  return data;
};

export const postChangeTheme = async (args: ChangeThemeProps) => {
  const { data } = await axios.post(
    'http://localhost:3306/botchat/chat/change/theme',
    {
      ...args
    });
  return data;
};

export const postChangeInfo = async (args: ChangeInfoProps) => {
  const { data } = await axios.post(
    'http://localhost:3306/botchat/user/change/info',
    {
      ...args
    });
  return data;
};

export const postCreateTopic = async (args: CreateTopicProps) => {
  const { data } = await axios.post(
    'http://localhost:3306/botchat/chat/newtopic',
    {
      ...args
    }
  );
  return data;
};