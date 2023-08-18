import { useStore } from 'reto'
import styles from '../home/styles/style.module.css'
import mainStyles from '../../styles/main.module.css'
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
        <main className={mainStyles.background}>
            
        </main>
    )
}

export default Home;