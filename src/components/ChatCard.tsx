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
            className={`flex gap-2 m-2 cursor-pointer rounded-xl p-2 hover:bg-accent ${
                props.data.id === props.selectedChatId ? "bg-secondary" : " "
            }`}
        >
            <ProfileImage initial={props.data.clientName[0]} id={props.data.id} />
            <div>
                <div className="tex-lg">{props.data.clientName}</div>
                <span className="text-sm">{props.data.organisationName}</span>
            </div>
        </div>
    );
};

export default ChatCard;
