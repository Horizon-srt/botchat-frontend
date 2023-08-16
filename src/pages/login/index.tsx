import { useEffect, useState } from 'react';
import styles from '../Login/styles/style.module.css'
import router from 'next/router';
import { Store } from '@/store/store';
import { useStore } from 'reto';

const Login = () => {
    const {setUserInfo, setLoginState, loginState} = useStore(Store);

    useEffect(() => {
        if (loginState) {
            router.push('/home');
        }
    }, [loginState]);

    const handleLogin = async () => {
    }

    return (
        <main className={styles.main}>
        <div className={styles.contain}>
            <p className={styles.header}>Login</p>
            <div>
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
            <button className={styles.loginButton}>Login</button>
            <button className={styles.registerButton} onClick={() => {router.push('/register');}}>Register</button>
        </div>
        </main>
    )
}

export default Login;