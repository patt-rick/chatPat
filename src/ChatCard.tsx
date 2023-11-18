import "./care.css";
import ProfileImage from "./ProfileImage";
interface ChatCardProps {
    data: any;
    onSelect: (x: any) => void;
    selectedChatId: number | string | null;
}
const ChatCard = (props: ChatCardProps) => {
    return (
        <div
            onClick={() => props.onSelect(props.data)}
            className={`chat__wrapper ${props.data.id === props.selectedChatId ? "active" : " "}`}
        >
            <ProfileImage initial={props.data.school[0]} id={props.data.id} />
            <div>
                <div className="client">{props.data.clientName}</div>
                <span className="school">{props.data.school}</span>
            </div>
        </div>
    );
};

export default ChatCard;
