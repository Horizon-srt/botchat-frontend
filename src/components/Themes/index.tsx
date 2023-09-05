/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from '@/components/Themes/styles/style.module.css';
import mainStyles from '@/styles/main.module.css';
import { TopicProps } from '@/utils/appType';
import {
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  Message,
  Modal
} from '@arco-design/web-react';
import {
  IconApps,
  IconDown,
  IconEdit,
  IconPlus
} from '@arco-design/web-react/icon';
import FormModal from '../FromModal';
import { useState } from 'react';
import InputItem from '../InputItem';
import {
  postChangeTheme,
  postCreateTopic,
  postCreatecustomization
} from '@/api/api';
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
  const [visibleNew, setVisibleNew] = useState<boolean>(false);
  const [visibleCustom, setVisibleCustom] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [formCustom] = Form.useForm();
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

  const onCreateNew = async () => {
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
  };

  const onCreateCustom = async () => {
    try {
      const res = await postCreatecustomization({
        user_id: userInfo.user_id,
        instructions: formCustom.getFieldValue('instruction')
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
  };

  const handlemenu = async (topicIndex: string) => {
    if (topicIndex === 'new') {
      setVisibleNew(true);
      // try {
      //   const res = await postCreateTopic({
      //     user_id: userInfo.user_id
      //   });
      //   if (res.topics) {
      //     setTopics(res.topics);
      //     Message.success('Create new topic success!');
      //   } else {
      //     Message.error('Create new topic failed!');
      //   }
      // } catch (e) {
      //   Message.error('Create new topic failed!');
      // }
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
      <Modal
        visible={visibleNew}
        simple={true}
        footer={null}
        className={styles.modalStyle}
        maskClosable
        onCancel={() => setVisibleNew(false)}
      >
        <div className={styles.envTitle}>
          Chose an environment
        </div>
        <div className={styles.envModal}>
          <div className={styles.buttonArea}>
            <Button
              className={mainStyles.loginButton}
              style={{width:'380px', height:'40px', color:'white'}}
              onClick={onCreateNew}
            >
              Free conversation
            </Button>
          </div>
          <div
            className={styles.buttonArea}
            style={{width:'380px', height:'40px', color:'white'}}
          >
            <Button
              className={mainStyles.loginButton}
              style={{width:'380px', height:'40px', color:'white'}}
            >
              Choose exist conversation environment <IconDown />
            </Button>
          </div>
          <div
            className={styles.buttonArea}>
            <Button
              className={mainStyles.loginButton}
              style={{width:'380px', height:'40px', color:'white'}}
              onClick={() => setVisibleCustom(true)}
            >
              Build a new conversation environment
            </Button>
          </div>
          <div className={styles.buttonArea}>
            <Button
              className={mainStyles.loginButton}
              style={{width:'380px', height:'40px', color:'white'}}
              onClick={() => setVisibleNew(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        visible={visibleCustom}
        simple={true}
        footer={null}
        className={styles.modalStyle}
        maskClosable
        onCancel={() => setVisibleCustom(false)}
      >
        <div className={styles.customTitle}>Create your own environment!</div>
        <div className={styles.customText}>
          Do you have any instruction for chatbot?
        </div>
        <Form>
          <Form.Item field='instruction'>
            <Input.TextArea placeholder='Please enter...' />
          </Form.Item>
        </Form>
        <Button
          className={mainStyles.loginButton}
          style={{color:'white'}}
          onClick={onCreateCustom}
        >
          Confirm!
        </Button>
      </Modal>
    </div>
  );
};

export default Themes;