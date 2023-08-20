import styles from '@/components/TopBar/styles/style.module.css'
import Themes from '../Themes';
import UserButton from '../UserButton';
import { TopicProps } from '@/utils/appType';

interface TopBarProps {
    topics: TopicProps[],
    topic: TopicProps,
    setTopic: (arge: TopicProps) => void
}

const TopBar: React.FC<TopBarProps> = ({ topics, topic, setTopic }) => {
    return (
        <div className={styles.barArea}>
            <Themes topics={topics} topic={topic} setTopic={setTopic}/>
            <UserButton />
        </div>
    );
}

export default TopBar;