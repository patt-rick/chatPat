import React from "react";
import { pickRandomAvatarColor } from "../utilities/utilities";

const ProfileImage = ({ initial, id }) => {
    return (
        <div
            style={{
                width: "45px",
                height: "45px",
                background: pickRandomAvatarColor(id),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
                borderRadius: "50%",
                color: "#555",
                fontWeight: 600,
            }}
        >
            {initial}
        </div>
    );
};

export default ProfileImage;
