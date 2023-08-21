import { Store } from "@/store/store";
import { useStore } from "reto";

interface PromptProps {
    prompt: string;
};

const Prompt: React.FC<PromptProps> = ({ prompt }) => {
    const {userInfo} = useStore(Store);

    return (
        <div></div>
    );
}

export default Prompt;