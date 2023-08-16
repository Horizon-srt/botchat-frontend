import { useStore } from 'reto'
import styles from '../home/styles/style.module.css'
import { Store } from '@/store/store';
import { useEffect } from 'react';
import router from 'next/router';

const Home = () => {
    const {userInfo, loginState} = useStore(Store);
    useEffect(() => {
        if (!loginState) {
            router.push('/login');
        }
    }, [loginState]);

    return (
        <main className={styles.main}>
            
        </main>
    )
}

export default Home;