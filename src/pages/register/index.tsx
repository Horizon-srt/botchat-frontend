import { useState } from 'react';
import styles from '../register/styles/style.module.css'
import router from 'next/router';

const Register = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
    }

    const goBack = () => {
        router.back();
    };

    return (
        <main className={styles.main}>
            <div className={styles.contain}>
            <p className={styles.header}>Register</p>
            <div>
            <div className={styles.input}>
                    <div className={styles.inputlable}>{'E-Mail: '}</div>
                    <input
                        className={styles.inputBox}
                    />
                </div>
                <div className={styles.input}>
                    <div className={styles.inputlable}>{'Account: '}</div>
                    <input
                        className={styles.inputBox}
                    />
                </div>
                <div className={styles.input}>
                <div className={styles.inputlable}>{'Password: '}</div>
                    <input
                        className={styles.inputBox}
                        type="password"
                    />
                </div>
            </div>
            <button className={styles.registerButton} onClick={handleRegister}>Register</button>
            <button className={styles.goBack} onClick={goBack}>Return to login</button>
        </div>
        </main>
    )
}

export default Register;