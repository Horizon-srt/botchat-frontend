/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetTopicsProps,
  UserLoginProps,
  UserRegisterProps,
  GetTopicDetailProps,
  VoiceProps, WordsProps,
  ChangeInfoProps,
  ChangeThemeProps,
  CreateTopicProps,
  ChatCustomizationProps,
  ReRecordVoiceProps
} from '@/utils/appType';
import axios from 'axios';

const ip_address = '192.168.43.239';
const port = '80';

export const postUserLogin = async (args: UserLoginProps) => {
  // const { data } = await axios.post(
  //   'http://' + ip_address + ':' + port + '/botchat/user/login/',
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
  // return data;
};

export const postUserRegister = async (args: UserRegisterProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/user/register/',
    {
      ...args
    });
  return data;
};

///
export const getTopics = async (args: GetTopicsProps) => {
  // const { data } = await axios.get(
  //   'http://' + ip_address + ':' + port + '/botchat/chat/gettopics/',
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

  // return data;
};

export const getTopicDetail = async (args: GetTopicDetailProps) => {
  const { data } = await axios.get(
    'http://' + ip_address + ':' + port + '/botchat/chat/getdetails/',
    {
      params: {
        ...args
      }
    });
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

  // return data;
};

export const postVoice = async (args: VoiceProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/sendvoice/',
    {
      ...args
    });
  return data;
};

export const postWords = async (args: WordsProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/sendword/',
    {
      ...args
    });
  return data;
};

export const postChangeTheme = async (args: ChangeThemeProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/change/theme/',
    {
      ...args
    });
  return data;
};

export const postChangeInfo = async (args: ChangeInfoProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/user/change/info/',
    {
      ...args
    });
  return data;
};

export const postCreateTopic = async (args: CreateTopicProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/newtopic/',
    {
      ...args
    }
  );
  return data;
};

export const postCreatecustomization = async (args: ChatCustomizationProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/customtopic/',
    {
      ...args
    }
  );
  return data;
};

export const postReRecordVoice = async (args: ReRecordVoiceProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/rerecord_voice/',
    {
      ...args
    }
  );
  return data;
};