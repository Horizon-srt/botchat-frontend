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
  postCreatecustomization,
  postPresetTopic
} from '@/api/api';
import { useStore } from 'reto';
import { Store } from '@/store/store';

interface ThemesProp {
    topics: TopicProps[],
    topic: TopicProps,
    updateTopics: boolean,
    setTopic: (args: TopicProps) => void,
    setTopics: (args: TopicProps[]) => void,
    setUpdateTopics: (args: boolean) => void,
    visibleNew: boolean,
    setVisibleNew: (args: boolean) => void,
    setVisibleStart: (args: boolean) => void
}

const Themes: React.FC<ThemesProp> = ({
  topics,
  topic,
  updateTopics,
  setTopic,
  setTopics,
  setUpdateTopics,
  visibleNew,
  setVisibleNew,
  setVisibleStart
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  // const [visibleGo, setVisibleGo] = useState<boolean>(true);
  // const [visibleNew, setVisibleNew] = useState<boolean>(false);
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
        setUpdateTopics(!updateTopics);
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
        // setUpdateTopics(!updateTopics);
        Message.success('Create new topic success!');
        setVisibleNew(false);
        setVisibleStart(false);
      } else {
        Message.error('Create new topic failed!');
        setVisibleNew(false);
      }
    } catch (e) {
      Message.error('Create new topic failed!');
      setVisibleNew(false);
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
        setVisibleStart(false);
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

  const onCreateExist = async (theme: string) =>{
    setVisibleNew(false);
    try {
      const res = await postPresetTopic({
        user_id: userInfo.user_id,
        pre_theme: theme
      });
      if (res.topics) {
        setTopics(res.topics);
        Message.success('Create new topic success!');
        setVisibleStart(false);
      } else {
        Message.error('Create new topic failed!');
      }
    } catch (e) {
      Message.error('Create new topic failed!');
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

  const choiceList = (
    <Menu className={styles.choiceArea} onClickMenuItem={onCreateExist}>
      <Menu.Item key='Shopping'>Shopping</Menu.Item>
      <Menu.Item key='Tour'>Tour</Menu.Item>
      <Menu.Item key='Restaurant'>Restaurant</Menu.Item>
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