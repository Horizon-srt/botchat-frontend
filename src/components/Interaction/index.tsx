import { postVoice, postWords } from '@/api/api';
import styles from '@/components/Interaction/styles/style.module.css'
import { Store } from '@/store/store';
import useMediaRecorder from '@/utils/useMediaRecorder';
import { Button, Input } from '@arco-design/web-react';
import { IconVoice } from '@arco-design/web-react/icon'
import { useEffect, useState } from 'react';
import { useStore } from 'reto';

const Interaction = () => {
    const [prompt_word, setPrompt_word] = useState('');
    const [onRecord, setOnRecord] = useState(false);
    const {userInfo} = useStore(Store);
    const {mediaBlob, startRecord, stopRecord} = useMediaRecorder();

    const handleSubmit = async () => {
        const res = await postWords({
            user_id: userInfo.user_id,
            prompt_word: prompt_word
        });
    };

    const handleVoice = async () => {
        try {
            if (onRecord) {
                stopRecord();
                setOnRecord(false);
                const res = await postVoice({
                    user_id: userInfo.user_id,
                    prompt_voice: mediaBlob
                })
            } else {
                setOnRecord(true);
                startRecord();
            }
        } catch (e) {
            alert('Record audio failed... Please try again')
        }
    };

    return (
        <div className={styles.interaction}>
            <Input.TextArea className={styles.area} onChange={e => {setPrompt_word(e)}} value={prompt_word} />
            <IconVoice className={styles.icon} onClick={handleVoice}/>
            <Button type='primary' shape='round' className={styles.submitButton} style={{backgroundColor:'#04B000'}} onClick={handleSubmit}>Submit</Button>
        </div>
    );
}

export default Interaction;