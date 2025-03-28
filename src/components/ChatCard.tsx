import styled from "styled-components";
import "../assets/css/care.css";
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
            className={`chat__wrapper ${props.data.id === props.selectedChatId ? "active" : " "}`}
        >
            <ProfileImage initial={props.data.clientName[0]} id={props.data.id} />
            <div>
                <div className="client">{props.data.clientName}</div>
                <span className="school">{props.data.organisationName}</span>
            </div>
        </Wrapper>
    );
};

export default ChatCard;

const Wrapper = styled.span``;
