import { postChangeInfo } from "@/api/api";
import { Store } from "@/store/store";
import { Message } from "@arco-design/web-react";
import useForm from "@arco-design/web-react/es/Form/useForm";
import router from "next/router";
import { useEffect } from "react";
import { useStore } from "reto";

const Profile = () => {
    const {loginState, userInfo, setUserInfo} = useStore(Store);
    const [form] = useForm();

    useEffect(() => {
        if (!loginState) {
            router.push('/login');
        }
    }, [loginState]);

    const handleSave = async () => {
        try {
            const res = await postChangeInfo({
                user_id: userInfo.user_id,
                username: form.getFieldValue('username'),
                password: form.getFieldValue('password'),
                email: form.getFieldValue('email')
            });
            if (res) {
                setUserInfo({...res});
                Message.success('Save information success!')
            } else {
                Message.error('Save information failed!')
            }
        } catch (e) {
            Message.error('Save information failed!')
        }
    }

    return (
        <div></div>
    );
}

export default Profile;