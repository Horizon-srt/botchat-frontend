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
  ReRecordVoiceProps,
  ChatWithOpenAIProps,
  HandleAudioProps,
  GetAudioAssessmentProps,
  TextToSpeechProps
} from '@/utils/appType';
import axios from 'axios';

const ip_address = '192.168.43.239';
const port = '80';

// 用户的登录功能
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

// 注册新用户
export const postUserRegister = async (args: UserRegisterProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/user/register/',
    {
      ...args
    });
  return data;
};

// 获取用户历史Topic
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

// 获取指定Topic的详细对话内容
export const getTopicDetail = async (args: GetTopicDetailProps) => {
  // const { data } = await axios.get(
  //   'http://' + ip_address + ':' + port + '/botchat/chat/getdetails/',
  //   {
  //     params: {
  //       ...args
  //     }
  //   });
  const mockDetails = {
    details: [{
      conversation_id: '1',
      prompt_word: 'Hello',
      prompt_voice: new Blob(),
      response_word: 'Hi',
      audio_assessment: 'a',
      response_voice: new Blob()
    },
    {
      conversation_id: '2',
      prompt_word: 'Hello',
      prompt_voice: new Blob(),
      response_word: 'god can help you',
      audio_assessment: 'a',
      response_voice: new Blob()
    },
    {
      conversation_id: '3',
      prompt_word: 'Hello',
      prompt_voice: new Blob(),
      response_word: 'Really',
      audio_assessment: 'a',
      response_voice: new Blob()
    }]
  };

  return mockDetails;

  // return data;
};

// 发送语音并获取处理结果（废弃）
export const postVoice = async (args: VoiceProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/sendvoice/',
    {
      ...args
    });
  return data;
};

//发送文字并获取处理结果（废弃）
export const postWords = async (args: WordsProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/sendword/',
    {
      ...args
    });
  return data;
};

// 修改主题内容
export const postChangeTheme = async (args: ChangeThemeProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/change/theme/',
    {
      ...args
    });
  return data;
};

// 修改用户信息
export const postChangeInfo = async (args: ChangeInfoProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/user/change/info/',
    {
      ...args
    });
  return data;
};

// 创建新topic
export const postCreateTopic = async (args: CreateTopicProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/newtopic/',
    {
      ...args
    }
  );
  return data;
};

// 提交用户的定制聊天信息
export const postCreatecustomization = async (args: ChatCustomizationProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/customtopic/',
    {
      ...args
    }
  );
  return data;
};

// 重新录制用户的语音
export const postReRecordVoice = async (args: ReRecordVoiceProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/rerecord_voice/',
    {
      ...args
    }
  );
  return data;
};

// 提供文本获取回复文本
export const postChatWithOpenAI = async (args: ChatWithOpenAIProps) => {
  const { data } = await axios.post(
    'http://' +
    ip_address +
    ':' +
    port +
    '/botchat/chat/obtain_openai_response/',
    {
      ...args
    }
  );
  return data;
};

// 提供音频获取文本信息
export const postHandleAudio = async (args: HandleAudioProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/handle_audio/',
    {
      ...args
    }
  );
  return data;
};

// 提供文本获取音频
export const postTextToSpeech = async (args: TextToSpeechProps) => {
  const { data } = await axios.post(
    'http://' + ip_address + ':' + port + '/botchat/chat/tts/',
    {
      ...args
    }
  );
  return data;
};

// 用户语音的评价
export const getAudioAssessment = async (args: GetAudioAssessmentProps) => {
  const { data } = await axios.get(
    'http://' + ip_address + ':' + port + '/botchat/chat/get_audio_assessment/',
    {
      params: {
        ...args
      }
    }
  );
  return data;
};