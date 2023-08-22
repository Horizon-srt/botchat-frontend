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
      <div className={mainStyles.container} style={{height:'600px'}}>
        {details.map((value, index) => {
          return (
            <div key={index}>
              <Prompt prompt={value.prompt} />
              <Response
                response_voice={value.response_voice}
                response_word={value.response_word}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dialog;