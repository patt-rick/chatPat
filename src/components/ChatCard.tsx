import styled from "styled-components";
import ProfileImage from "./ProfileImage";
interface ChatCardProps {
    data: any;
    onSelect: (x: any) => void;
    selectedChatId: number | string | null;
}
const ChatCard = (props: ChatCardProps) => {
    return (
        <Wrapper
            onClick={() => props.onSelect(props.data)}
            className={`flex gap-2 m-2 cursor-pointer rounded-xl p-2 hover:bg-slate-50 ${
                props.data.id === props.selectedChatId ? "bg-slate-100" : " "
            }`}
        >
            <ProfileImage initial={props.data.clientName[0]} id={props.data.id} />
            <div>
                <div className="tex-lg">{props.data.clientName}</div>
                <span className="text-md">{props.data.organisationName}</span>
            </div>
        </Wrapper>
    );
};

export default ChatCard;

const Wrapper = styled.span``;
