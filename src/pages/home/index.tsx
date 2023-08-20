import { useStore } from 'reto'
import mainStyles from '@/styles/main.module.css'
import { Store } from '@/store/store';
import { useEffect, useState } from 'react';
import router from 'next/router';
import TopBar from '@/components/TopBar';
import Dialog from '@/components/Dialog';
import Interaction from '@/components/Interaction';
import { DetailProps, TopicDetailProps, TopicProps } from '@/utils/appType';
import { getTopicDetail, getTopics } from '@/api/api';

const Home = () => {
    const {userInfo, loginState} = useStore(Store);
    const [topics, setTopics] = useState<TopicProps[]>([] as TopicProps[]);
    const [topic, setTopic] = useState<TopicProps>({} as TopicProps);
    const [details, setDetails] = useState<DetailProps[]>({} as DetailProps[]);
    
    useEffect(() => {
        if (!loginState) {
            router.push('/login');
        }
    }, [loginState]);

    useEffect(() => {
        const getData = async () => {
            const res = await getTopics({
                user_id: userInfo.user_id
            });
            if (res.topics) {
                setTopics(res.topics);
                setTopic(res.topics[0])
            }
        }
        getData();
    }, [userInfo]);

    useEffect(() => {
        const getData = async () => {
            const res = await getTopicDetail({
                topic_id: topic.topic_id
            });
            if (res.details) {
                setDetails(res.details);
            }
        }
        getData();
    }, [topic])

    return (
        <main className={mainStyles.background}>
            <TopBar topics={topics} topic={topic} setTopic={setTopic}/>
            <Dialog details={details}/>
            <Interaction />
        </main>
    )
}

export default Home;