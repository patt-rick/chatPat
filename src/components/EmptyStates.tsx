import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

import NoInternet from "../assets/figures/NoInternet";
import AddChat from "../assets/figures/AddChat";
import Empty from "../assets/figures/Empty";
import InProgress from "../assets/figures/InProgress";

type ImgKeys = "noInternet" | "empty" | "noMessage" | "notReady";
interface Props {
    msg?: string;
    imgToUse?: ImgKeys;
}
const EmptyStates = (props: Props) => {
    const { themeColors } = useContext(ThemeContext);
    const { imgToUse = "noMessage" } = props;
    const Img: { [index: string]: React.ReactElement } = {
        noInternet: <NoInternet />,
        empty: <Empty />,
        noMessage: <AddChat />,
        notReady: <InProgress />,
    };
    return (
        <div className="empty__states">
            {Img[String(imgToUse)]}
            <p style={{ color: themeColors.accentForeground }}>{props.msg}</p>
        </div>
    );
};

export default EmptyStates;
