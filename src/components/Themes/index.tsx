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
  Modal,
  Tooltip,
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
  const [visibleGo, setVisibleGo] = useState<boolean>(true);
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
    setVisibleNew(false);
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
  // TODO: 补全创建场景功能
  const onUseHistory = async () =>{
    setVisibleGo(false);
  };

  const onCreateExist = async () =>{
    setVisibleNew(false);
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
  // TODO：同handleMenu
  const open = async () =>{
    setVisibleNew(true);
    setVisibleGo(false);
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

  const choiceList = (
    <Menu className={styles.choiceArea} onClickMenuItem={onCreateExist}>
      <Menu.Item key='Shopping'>Shopping</Menu.Item>
      <Menu.Item key='Tour'>Tour</Menu.Item>
      <Menu.Item key='Restaurant'>Restaurant</Menu.Item>
    </Menu>
  );

  const HistoryList = (
    <Menu className={styles.choiceArea} onClickMenuItem={onUseHistory}>
      <Menu.Item key='1'>History1</Menu.Item>
      <Menu.Item key='2'>History2</Menu.Item>
      <Menu.Item key='3'>History3</Menu.Item>
      <Menu.Item key='4'>History4</Menu.Item>
      <Menu.Item key='5'>History5</Menu.Item>
      <Menu.Item key='6'>History6</Menu.Item>
    </Menu>
  );

  const tri = (
    <div className='demo-trigger-popup' style={{ width:'300px' }}>

    </div>
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
        visible={visibleGo}
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
              onClick={open}
            >
                New conversation
            </Button>
          </div>
          <div
            className={styles.buttonArea}
            style={{width:'380px', height:'40px', color:'white'}}
          >
            <Dropdown
              droplist={HistoryList}
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
      <Modal
        visible={visibleNew}
        simple={true}
        footer={null}
        className={styles.modalStyle}
        maskClosable
        onCancel={() => setVisibleNew(false)}
      >
        <div className={styles.envTitle}>
          Choose an environment
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
            <Dropdown
              droplist={choiceList}
              trigger='click'
              position='bottom'
            >
              <Button
                className={mainStyles.loginButton}
                style={{width:'380px', height:'40px', color:'white'}}
              >
                Choose exist conversation environment <IconDown/>
              </Button>
            </Dropdown>
          </div>
          <div
            className={styles.buttonArea}>
            <Button
              className={mainStyles.loginButton}
              style={{width:'380px', height:'40px', color:'white'}}
              onClick={() => setVisibleCustom(true)}
            >
              start talking!!!
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
        <Form >
          <Form.Item field='instruction' className={styles.textArea}>
            <Input.TextArea
              placeholder='Please enter...'
              style={{ minHeight: 250, width: 370 }}
            />
          </Form.Item>
        </Form>
        <div className={styles.confirmButton}>
          <Button
            className={mainStyles.loginButton}
            style={{color:'white'}}
            onClick={onCreateCustom}
          >
            Confirm!
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Themes;