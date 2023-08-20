import { GetTopicsProps, UserLoginProps, UserRegisterProps, GetTopicDetailProps, VoiceProps, WordsProps } from '@/utils/appType';
import axios from 'axios'

export const postUserLogin = async (args: UserLoginProps) => {
    // const { data } = await axios.post('http://localhost:80/botchat/user/login', {
    //     ...args
    // });
    const mockUserInfo = {
        username: 'aaa',
        password: 'aaa',
        email: 'aaa',
        user_id: 'aaa'
    };

    return mockUserInfo;
};

export const postUserRegister = async (args: UserRegisterProps) => {
    const { data } = await axios.post('http://localhost:80/botchat/user/register', {
        ...args
    });
    return data;
};

///
export const getTopics = async (args: GetTopicsProps) => {
    // const { data } = await axios.get('http://localhost:80/botchat/chat/gettopics', {
    //     params: {
    //         ...args
    //     }
    // });
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
    }
    return mockTopics;
}

export const getTopicDetail = async (args: GetTopicDetailProps) => {
    // const { data } = await axios.get('http://localhost:80/botchat/chat/getdetails', {
    //     params: {
    //         ...args
    //     }
    // });
    const mockDetails = {
        details: [{
            detail_id: 'a',
            prompt: 'a',
            response_word: 'a',
            response_voice: new Blob()
        }]
    };
    return mockDetails;
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