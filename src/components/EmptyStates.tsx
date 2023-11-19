import noInternet from "../assets/img/no-internet.png";
import noMessage from "../assets/img/no-messages.png";
import empty from "../assets/img/empty.png";
import noInternet2 from "../assets/img/no-internet2.png";
import notReady from "../assets/img/notReady.png";

type ImgKeys = "noInternet" | "empty" | "noMessage" | "noInternet2" | "notReady";
interface Props {
    msg?: string;
    imgToUse?: ImgKeys;
}
const EmptyStates = (props: Props) => {
    const { imgToUse = "noMessage" } = props;
    const img = {
        noInternet: noInternet,
        empty: empty,
        noMessage: noMessage,
        noInternet2: noInternet2,
        notReady: notReady,
    };
    return (
        <div className="empty__states">
            <img width={500} src={img[imgToUse]} alt="" />
            <p>this is the message</p>
        </div>
    );
};

export default EmptyStates;
