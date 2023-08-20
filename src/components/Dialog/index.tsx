import mainStyles from '@/styles/main.module.css'
import styles from '@/components/Dialog/styles/style.module.css'
import { DetailProps } from '@/utils/appType';

interface DialogProps {
    details: DetailProps[]
};

const Dialog:React.FC<DialogProps> = ({ details }) => {
    // console.log(details)
    return (
        <div className={styles.container}>
            <div className={mainStyles.container} style={{height:'600px'}}>
                <p>Dialog</p>
            </div>
        </div>
    );
}

export default Dialog;