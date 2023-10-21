import React from "react";
import "./care.css";
import ProfileImage from "../../Components/ProfileImage";
const ChatCard = ({ data, onSelect, selectedChatId }) => {
    return (
        <div
            onClick={() => onSelect(data)}
            className={`chat__wrapper ${data.id === selectedChatId ? "active" : " "}`}
        >
            <ProfileImage initial={data.school[0]} id={data.id} />
            <div>
                <div className="client">{data.clientName}</div>
                <span className="school">{data.school}</span>
            </div>
        </div>
    );
};

export default ChatCard;
