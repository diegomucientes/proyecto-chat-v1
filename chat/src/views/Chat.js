
import "../chat.css";
import ChatUser from "../components/ChatUser";

const Chat = (props) => {
    const { room = "global" } = props;
    //const [newMessage, setNewMessage] = useState("");

    const {
        user
    } = ChatUser(room);

    return (
        <main>
            CHAT
        </main>
    );
};

export default Chat;