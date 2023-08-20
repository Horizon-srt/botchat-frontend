import styles from '@/components/Themes/styles/style.module.css'
import { TopicProps } from '@/utils/appType';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconApps, IconDown, IconEdit } from '@arco-design/web-react/icon';

interface ThemesProp {
    topics: TopicProps[];
    topic: TopicProps;
    setTopic: (args: TopicProps) => void
}

const Themes: React.FC<ThemesProp> = ({ topics, topic, setTopic }) => {

    const handlemenu = (topicIndex: string) => {
        setTopic(topics[topicIndex as unknown as number]);
    }

    const dropList = (
        <Menu className={styles.menuarea} onClickMenuItem={handlemenu}>
            {
                topics.map((value, index) => {
                    return (
                        <Menu.Item key={index.toString()}>{value.theme}</Menu.Item>
                    );
                })
            }
        </Menu>
    )

    return (
        <div className={styles.themearea}>
            <IconApps fontSize='18px' className={styles.appicon} />
            <div className={styles.theme}>{topic.theme}</div>
            <IconEdit fontSize='18px' className={styles.editicon}/>
            <Dropdown droplist={dropList} trigger='click' position='br'>
                <IconDown className={styles.downicon}/>
            </Dropdown>
        </div>
    );
}

export default Themes;