import React from 'react';
import styles from '@/components/TopBar/styles/style.module.css';
import Themes from '../Themes';
import UserButton from '../UserButton';
import { TopicProps } from '@/utils/appType';

interface TopBarProps {
    topics: TopicProps[],
    topic: TopicProps,
    updateTopics: boolean,
    setTopic: (arge: TopicProps) => void,
    setTopics: (args: TopicProps[]) => void,
    setUpdateTopics: (args: boolean) => void,
    visibleNew: boolean,
    setVisibleNew: (args: boolean) => void,
    setVisibleStart: (args: boolean) => void
}

const TopBar: React.FC<TopBarProps> = ({
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
  return (
    <div className={styles.barArea}>
      <Themes
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
      <UserButton />
    </div>
  );
};

export default TopBar;