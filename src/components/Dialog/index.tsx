import React from 'react';
import mainStyles from '@/styles/main.module.css';
import styles from '@/components/Dialog/styles/style.module.css';
import { DetailProps } from '@/utils/appType';
import Prompt from '../Prompt';
import Response from '../Response';

interface DialogProps {
    details: DetailProps[];
}

const Dialog: React.FC<DialogProps> = ({ details }) => {
  return (
    <div className={styles.container}>
      <div className={mainStyles.container}>
        <div className={styles.dialog}>
          {details.map((value, index) => {
            return (
              <div key={index}>
                <Prompt
                  audio_assignment={value.audio_assessment}
                  prompt_word={value.prompt_word}
                  prompt_voice={value.prompt_voice}
                />
                <Response
                  response_voice={value.response_voice}
                  response_word={value.response_word}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dialog;