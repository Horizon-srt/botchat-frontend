import { GetTopicsProps, UserLoginProps, UserRegisterProps, GetTopicDetailProps, VoiceProps, WordsProps } from '@/utils/appType';
import axios from 'axios'

export const postUserLogin = async (args: UserLoginProps) => {
    const { data } = await axios.post('http://localhost:80/botchat/user/login', {
        ...args
    });
    return data;
};

export const postUserRegister = async (args: UserRegisterProps) => {
    const { data } = await axios.post('http://localhost:80/botchat/user/register', {
        ...args
    });
    return data;
};

export const getTopics = async (args: GetTopicsProps) => {
    const { data } = await axios.get('http://localhost:80/botchat/chat/gettopics', {
        params: {
            ...args
        }
    });
    return data;
}

export const getTopicDetail = async (args: GetTopicDetailProps) => {
    const { data } = await axios.get('http://localhost:80/botchat/chat/getdetails', {
        params: {
            ...args
        }
    });
    return data;
}

export const postVoice = async (args: VoiceProps) => {
    const { data } = await axios.post('http://localhost:80/botchat/chat/sendvoice', {
        ...args
    });
    return data;
}

export const postWords = async (args: WordsProps) => {
    const { data } = await axios.post('http://localhost:80/botchat/chat/sendword', {
        ...args
    });
    return data;
}