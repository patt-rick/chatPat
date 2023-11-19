import { pickRandomAvatarColor } from "../_helpers/utilites";

interface ImageProps {
    initial: string;
    id: number;
}
const ProfileImage = (props: ImageProps) => {
    return (
        <div
            style={{
                width: "45px",
                height: "45px",
                background: pickRandomAvatarColor(props.id),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
                borderRadius: "50%",
                color: "#555",
                fontWeight: 600,
            }}
        >
            {props.initial}
        </div>
    );
};

export default ProfileImage;
