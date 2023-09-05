// 用户信息
export interface UserInfoProps {
  username: string;
  password: string;
  email: string;
  user_id: string;
}

// 用户登录信息
export interface UserLoginProps {
  username: string;
  password: string;
}

// 用户注册信息
export interface UserRegisterProps {
  username: string;
  password: string;
  email: string;
}

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

// 传入主题id，返回对话内容列表，包含每次问答
export interface GetTopicDetailProps {
  topic_id: string;
}

export interface TopicDetailProps {
  details: DetailProps[]
}

export interface DetailProps {
  detail_id: string
  prompt: string;
  response_word: string;
  response_voice: Blob;
}

// 发送声音
export interface VoiceProps {
  user_id: string;
  topic_id: string;
  prompt_voice: string;
}

// 发送文字
export interface WordsProps {
  user_id: string;
  topic_id: string;
  prompt_word: string;
}

// 处理结果
export interface Response {
  topic_id: string;
  response_word: string;
  response_voice: Blob;
}

// 修改主题名称
export interface ChangeThemeProps {
  topic_id: string;
  theme: string;
}

//
export interface ChangeInfoProps {
  username: string;
  password: string;
  email: string;
  user_id: string;
}

// 创建新主题
export interface CreateTopicProps {
  user_id: string;
}

// 创建自定义主题
export interface ChatCustomizationProps { // 请求体中的JSON数据:
  user_id: string;
  // topic_theme: string;
  instructions: string;
}

// 重新录制
export interface ReRecordVoiceProps { // 请求体中的JSON数据:
  conversation_id: string; // Conversation的主键ID
  prompt_voice: Blob; // 用户的新语音
}

export interface ReRecordVoiceResponseProps { // 后端返回的JSON数据:
  success: boolean; // 是否成功替换
  message: string; // 返回的消息，例如"Voice replaced successfully"或"Failed to replace voice"
}

export interface TextToSpeechProps { // 请求体中的JSON数据:
  conversation_id: string;
  response_word: string;
}

export interface TextToSpeechResponseProps { // 后端返回的JSON数据:
  response_voice: Blob;
}

export interface GetAudioAssessmentProps { // 请求参数:
  conversation_id: string;
}

export interface GetAudioAssessmentResponseProps { // 后端返回的JSON数据:
  audio_assessment: string;
}