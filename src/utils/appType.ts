// 用户信息
export interface UserInfoProps {
  username: string;
  password: string;
  email: string;
  user_id: string;
};

// 用户登录信息
export interface UserLoginProps {
  username: string;
  password: string;
};

// 用户注册信息
export interface UserRegisterProps {
  username: string;
  password: string;
  email: string;
};

// 获取用户topic请求
export interface GetTopicsProps {
  user_id: string;
}

// 返回topic列表
export interface TopicsProps {
  topics: TopicProps[]
}

// topice简要信息列表项
export interface TopicProps {
  topic_id: string;
  theme: string;
}

// 发送声音
// export interface VoiceProps {
//   user_id: string;
//   prompt_voice: ;
// }

// 发送文字
export interface WordsProps {
  user_id: string;
  prompt_word: string;
}

// 处理结果
export interface response {
  response: string;
}