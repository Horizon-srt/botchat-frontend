import React from 'react';
import styles from '@/components/TopBar/styles/style.module.css';
import Themes from '../Themes';
import UserButton from '../UserButton';
import { TopicProps } from '@/utils/appType';

interface TopBarProps {
    topics: TopicProps[],
    topic: TopicProps,
    setTopic: (arge: TopicProps) => void,
    setTopics: (args: TopicProps[]) => void
}

const TopBar: React.FC<TopBarProps> = ({
  topics,
  topic,
  setTopic,
  setTopics
}) => {
  return (
    <div className={styles.barArea}>
      <Themes
        topics={topics}
        topic={topic}
        setTopic={setTopic}
        setTopics={setTopics}
      />
      <UserButton />
    </div>
  );
};

export default TopBar;