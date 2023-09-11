import React from 'react';
import { useStore } from 'reto';
import mainStyles from '@/styles/main.module.css';
import { Store } from '@/store/store';
import { useEffect, useState } from 'react';
import router from 'next/router';
import TopBar from '@/components/TopBar';
import Dialog from '@/components/Dialog';
import Interaction from '@/components/Interaction';
import { DetailProps, TopicProps } from '@/utils/appType';
import { getTopicDetail, getTopics } from '@/api/api';
import { Message } from '@arco-design/web-react';

const Home = () => {
  const {userInfo, loginState} = useStore(Store);
  const [topics, setTopics] = useState<TopicProps[]>([] as TopicProps[]);
  const [topic, setTopic] = useState<TopicProps>({topic_id: '-1', theme: ''});
  const [details, setDetails] = useState<DetailProps[]>([] as DetailProps[]);
  const [updateTopics, setUpdateTopics] = useState<boolean>(false);
  const [updateTopic, setUpdateTopic] = useState<boolean>(false);

  useEffect(() => {
    if (!loginState) {
      router.push('/login');
    }
  }, [loginState]);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await getTopics({
          user_id: userInfo.user_id
        });
        if (res) {
          if (res.topics.length !== 0) {
            setTopics(res.topics);
            setTopic(res.topics[0]);
          } else if (res.topics.length == 0) {
            setTopics(res.topics);
            setTopic({
              topic_id: '-1',
              theme: ''
            });
          }
        } else {
          Message.error('Get topic failed!');
        }
      };
      getData();
    } catch (e) {
      Message.error('Get topic failed!');
    }

  }, [userInfo, updateTopics]);

  useEffect(() => {
    if (topic.topic_id !== '-1') {
      try {
        const getData = async () => {
          const res = await getTopicDetail({
            topic_id: topic.topic_id
          });
          if (res.details) {
            setDetails(res.details);
          } else {
            Message.error('Get topic failed!');
          }
        };
        getData();
      } catch (e) {
        Message.error('Get topic failed!');
      }
    }

  }, [topic, topics, updateTopic]);

  return (
    <main className={mainStyles.background}>
      <TopBar
        topics={topics}
        topic={topic}
        setTopic={setTopic}
        setTopics={setTopics}
      />
      <Dialog details={details}/>
      <Interaction
        topic={topic}
        updateTopics={updateTopics}
        setUpdateTopics={setUpdateTopics}
        updateTopic={updateTopic}
        setUpdateTopic={setUpdateTopic}
        details={details}
        setDetails={setDetails}
      />
    </main>
  );
};

export default Home;