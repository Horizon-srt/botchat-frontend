/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from '@/components/Themes/styles/style.module.css';
import { TopicProps } from '@/utils/appType';
import { Dropdown, Form, Menu, Message } from '@arco-design/web-react';
import {
  IconApps,
  IconDown,
  IconEdit,
  IconPlus
} from '@arco-design/web-react/icon';
import FormModal from '../FromModal';
import { useState } from 'react';
import InputItem from '../InputItem';
import { postChangeTheme, postCreateTopic } from '@/api/api';
import { useStore } from 'reto';
import { Store } from '@/store/store';

interface ThemesProp {
    topics: TopicProps[];
    topic: TopicProps;
    setTopic: (args: TopicProps) => void,
    setTopics: (args: TopicProps[]) => void
}

const Themes: React.FC<ThemesProp> = ({
  topics,
  topic,
  setTopic,
  setTopics
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {userInfo} = useStore(Store);

  const onSubmit = async () => {
    try {
      const res = await postChangeTheme({
        topic_id: topic.topic_id,
        theme: form.getFieldValue('theme')
      });
      if (res) {
        Message.success('Change done!');
      } else {
        Message.error('Change failed!');
      }
    } catch (e) {
      Message.error('Change failed!');
    }
  };

  const handlemenu = async (topicIndex: string) => {
    if (topicIndex === 'new') {
      try {
        const res = await postCreateTopic({
          user_id: userInfo.user_id
        });
        if (res.topics) {
          setTopics(res.topics);
          Message.success('Create new topic success!');
        } else {
          Message.error('Create new topic failed!');
        }
      } catch (e) {
        Message.error('Create new topic failed!');
      }
    } else {
      setTopic(topics[topicIndex as unknown as number]);
    }
  };

  const dropList = (
    <Menu className={styles.menuarea} onClickMenuItem={handlemenu}>
      {
        topics.map((value, index) => {
          return (
            <Menu.Item key={index.toString()}>{value.theme}</Menu.Item>
          );
        })
      }
      <Menu.Item key={'new'} className={styles.newtopic}>
        New Topic
        <IconPlus style={{fontSize:'14px'}}/>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.themearea}>
      <IconApps fontSize='18px' className={styles.appicon} />
      <div className={styles.theme}>{topic.theme}</div>
      <IconEdit
        fontSize='18px'
        className={styles.editicon}
        onClick={() => setVisible(true)}
      />
      <Dropdown droplist={dropList} trigger='click' position='br'>
        <IconDown className={styles.downicon}/>
      </Dropdown>
      <FormModal
        title='Change theme name'
        form={form}
        visible={visible}
        onSubmit={onSubmit}
        setVisible={setVisible}
      >
        <InputItem
          field={'theme'}
          placeholder={'New name'}
          rules={[{
            required: true,
            type: 'string',
          },
          ]}
          password={false}
        />
      </FormModal>
    </div>
  );
};

export default Themes;