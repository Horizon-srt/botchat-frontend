import React from 'react';
import { useStore } from 'reto';
import mainStyles from '@/styles/main.module.css';
import styles from '@/pages/home/styles/style.module.css';
import { Store } from '@/store/store';
import { useEffect, useState } from 'react';
import router from 'next/router';
import TopBar from '@/components/TopBar';
import Dialog from '@/components/Dialog';
import Interaction from '@/components/Interaction';
import { DetailProps, TopicProps } from '@/utils/appType';
import { getTopicDetail, getTopics } from '@/api/api';
import { Button, Dropdown, Menu, Message, Modal } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';

const Home = () => {
  const {userInfo, loginState} = useStore(Store);
  const [topics, setTopics] = useState<TopicProps[]>([] as TopicProps[]);
  const [topic, setTopic] = useState<TopicProps>({topic_id: '-1', theme: ''});
  const [details, setDetails] = useState<DetailProps[]>([] as DetailProps[]);
  const [updateTopics, setUpdateTopics] = useState<boolean>(false);
  const [updateTopic, setUpdateTopic] = useState<boolean>(false);
  const [visibleStart, setVisibleStart] = useState<boolean>(true);
  const [visibleNew, setVisibleNew] = useState<boolean>(false);

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
          setTopics(res.topics);
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
          Message.error('Get topics failed!');
        }
      };
      getData();
    } catch (e) {
      Message.error('Get topics failed!');
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
            Message.error('Get topic detail failed!');
          }
        };
        getData();
      } catch (e) {
        Message.error('Get topic detail failed!');
      }
    }

  }, [topic, topics, updateTopic]);

  const droplist = (
    <Menu
      className={styles.menuarea}
      onClickMenuItem={
        (index: string) => {
          setTopic(topics[index as unknown as number]);
          setVisibleStart(false);
        }
      }
    >
      {
        topics.map((value, index) => {
          return (
            <Menu.Item key={index.toString()}>{value.theme}</Menu.Item>
          );
        })
      }
    </Menu>
  );

  return (
    <main className={mainStyles.background}>
      <Modal
        visible={visibleStart}
        simple={true}
        footer={null}
        className={styles.startModalStyle}
      >
        <div className={styles.envTitle}>
          Let’s Get Started!
        </div>
        <div className={styles.chooseTitle}>
          Chose a conversation or make a new one
        </div>
        <div className={styles.envModal}>
          <div className={styles.buttonArea}>
            <Button
              className={mainStyles.loginButton}
              style={{width:'380px', height:'40px', color:'white'}}
              onClick={() => setVisibleNew(true)}
            >
                New conversation
            </Button>
          </div>
          <div
            className={styles.buttonArea}
            style={{width:'380px', height:'40px', color:'white'}}
          >
            <Dropdown
              droplist={droplist}
              trigger='click'
              position='bottom'
            >
              <Button
                className={mainStyles.loginButton}
                style={{width:'380px', height:'40px', color:'white'}}
              >
                View History Conversation <IconDown/>
              </Button>
            </Dropdown>
          </div>
        </div>
      </Modal>
      <TopBar
        topics={topics}
        topic={topic}
        updateTopics={updateTopics}
        setTopic={setTopic}
        setTopics={setTopics}
        setUpdateTopics={setUpdateTopics}
        visibleNew={visibleNew}
        setVisibleNew={setVisibleNew}
        setVisibleStart={setVisibleStart}
      />
      <Dialog details={details}/>
      <Interaction
        topic={topic}
        // updateTopics={updateTopics}
        // setUpdateTopics={setUpdateTopics}
        updateTopic={updateTopic}
        setUpdateTopic={setUpdateTopic}
        // details={details}
        // setDetails={setDetails}
      />
    </main>
  );
};

export default Home;