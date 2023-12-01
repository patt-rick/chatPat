import styled from "styled-components";
import "../assets/css/care.css";
import ProfileImage from "./ProfileImage";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
interface ChatCardProps {
    data: any;
    onSelect: (x: any) => void;
    selectedChatId: number | string | null;
}
const ChatCard = (props: ChatCardProps) => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <Wrapper
            color={themeColors.accentBackground}
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
interface ChatProps {
    color: string;
}

const Wrapper = styled.span<ChatProps>`
    &:hover {
        background-color: ${(props: ChatProps) => props.color};
    }
    &.active {
        background-color: ${(props: ChatProps) => props.color};
    }
`;
