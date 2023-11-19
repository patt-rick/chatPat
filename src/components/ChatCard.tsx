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

    const Wrapper = styled.span`
        &:hover {
            background-color: ${themeColors.accentBackground};
        }
        &.active {
            background-color: ${themeColors.accentBackground};
        }
    `;
    return (
        <Wrapper
            onClick={() => props.onSelect(props.data)}
            className={`chat__wrapper ${props.data.id === props.selectedChatId ? "active" : " "}`}
        >
            <ProfileImage initial={props.data.school[0]} id={props.data.id} />
            <div>
                <div className="client">{props.data.clientName}</div>
                <span className="school">{props.data.school}</span>
            </div>
        </Wrapper>
    );
};

export default ChatCard;
