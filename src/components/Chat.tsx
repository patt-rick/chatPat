import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import "../assets/css/chat.css";

import {
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import React from "react";
import { size } from "lodash";
import { theme } from "../theme";
import { ThemeContext } from "../Contexts/ThemeContext";
import { db, storage } from "../firebase-config";

type ChatProps = {
    details: any;
};
function Chat(props: ChatProps) {
    const { themeColors } = useContext(ThemeContext);

    const { name, id, schoolName } = props?.details;
    const [animate, setAnimate] = useState(false);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState<any>([]);
    const [image, setImage] = useState<any>(null);
    const [progress, setProgress] = useState(0);

    const scrollTo = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, "chats"),
                where("clientId", "==", id),
                orderBy("timestamp", "asc")
            ),
            (snapshot) => {
                setChats(snapshot.docs.map((doc) => doc.data()));
                if (scrollTo.current) {
                    scrollTo.current.scrollIntoView({ behavior: "smooth" });
                }
            }
        );

        return () => unsubscribe();
    }, []);

    const sendMessage = async () => {
        if (size(chats) === 0) {
            try {
                const docRef = doc(collection(db, "clients"), JSON.stringify(id));
                await setDoc(docRef, {
                    id: id,
                    clientName: name,
                    school: schoolName,
                    timestamp: serverTimestamp(),
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                clientId: id,
                clientName: name,
                adminId: "2328Dfs4",
                message: message,
                fromClient: true,
                timestamp: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
            setMessage("");
            if (scrollTo.current) {
                scrollTo.current.scrollIntoView({ behavior: "smooth" });
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleUpload = async () => {
        if (image) {
            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    try {
                        await addDoc(collection(db, "chats"), {
                            clientId: id,
                            clientName: name,
                            adminId: "2328Dfs4",
                            image: url,
                            message: null,
                            fromClient: true,
                            timestamp: serverTimestamp(),
                        });
                        setMessage("");
                        setImage(null);
                        if (scrollTo.current) {
                            scrollTo.current.scrollIntoView({ behavior: "smooth" });
                        }
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                }
            );
        }
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setMessage(`UPLOAD ${e.target.files[0].name}`);
        }
    };

    const handleKeyEnter = (event: { key: string }) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };
    const handleButtonClick = () => {
        setAnimate((value) => !value);
    };
    return (
        <ChatWrapper>
            <ChatWidget
                style={{
                    backgroundColor: themeColors.accentBackground,
                    color: theme.palette.primary.main,
                }}
                onClick={handleButtonClick}
            >
                {animate ? <CloseIcon /> : <ChatBubbleIcon />}
            </ChatWidget>
            <ChatView
                style={{
                    border: theme.palette.primary.main,
                    backgroundColor: themeColors.accentBackground,
                }}
                className={animate ? "open" : "close"}
            >
                <div className="chat-view">
                    <Header
                        style={{
                            background: theme.palette.primary.main,
                            color: themeColors.foreground,
                            borderBottom: `1px solid ${themeColors.border}`,
                        }}
                    >
                        Chat Header
                    </Header>
                    <div>
                        {chats.map(
                            (
                                chat: {
                                    fromClient: boolean;
                                    adminId: string;
                                    message: string;
                                    timestamp: any;
                                    clientName: string;
                                    image: any;
                                },
                                i: React.Key
                            ) => (
                                <React.Fragment key={i}>
                                    {chat.fromClient ? (
                                        <TextWrapper>
                                            <div
                                                style={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: themeColors.foreground,
                                                }}
                                                className="msg"
                                            >
                                                {chat.image ? (
                                                    <div>
                                                        <img
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() =>
                                                                window.open(chat.image, "_blank")
                                                            }
                                                            width={"100%"}
                                                            src={chat.image}
                                                            alt="image"
                                                            //@ts-ignore
                                                            crossOrigin="cross-origin"
                                                        ></img>
                                                    </div>
                                                ) : (
                                                    <div>{chat.message}</div>
                                                )}
                                                <span
                                                    style={{ color: themeColors.accentForeground }}
                                                >
                                                    {chat.timestamp
                                                        ?.toDate()
                                                        .toString()
                                                        .substring(0, 21)}
                                                </span>
                                            </div>
                                        </TextWrapper>
                                    ) : (
                                        <ReceiveTextWrapper>
                                            <div
                                                style={{
                                                    backgroundColor: themeColors.background,
                                                    color: themeColors.foreground,
                                                }}
                                                className="msg"
                                            >
                                                {chat.image ? (
                                                    <div>
                                                        <img
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() =>
                                                                window.open(chat.image, "_blank")
                                                            }
                                                            width={"100%"}
                                                            src={chat.image}
                                                            alt="image"
                                                        ></img>
                                                    </div>
                                                ) : (
                                                    <div>{chat.message}</div>
                                                )}
                                                <span
                                                    style={{ color: themeColors.accentForeground }}
                                                >
                                                    {chat.timestamp
                                                        ?.toDate()
                                                        .toString()
                                                        .substring(0, 21)}
                                                </span>
                                            </div>
                                        </ReceiveTextWrapper>
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </div>
                    <div ref={scrollTo}></div>
                </div>
                <div>
                    {image ? (
                        <progress className="progress__bar" value={progress} max="100"></progress>
                    ) : null}
                    <SendMessageWrapper style={{ borderColor: themeColors.border }}>
                        <Input
                            style={{
                                background: themeColors.accentBackground,
                                color: themeColors.foreground,
                            }}
                            disabled={!!image}
                            onKeyUp={handleKeyEnter}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            placeholder="Send a message"
                        ></Input>
                        <>
                            <label className="upload__label" htmlFor="upload">
                                <AddPhotoAlternateIcon />
                            </label>
                            <input
                                id="upload"
                                className="file__upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </>

                        <SendBtn
                            onClick={image ? handleUpload : sendMessage}
                            style={{
                                color: theme.palette.primary.main,
                                background: themeColors.background,
                            }}
                            className="send__btn"
                        >
                            <SendIcon sx={{ fontSize: "20px" }} />
                        </SendBtn>
                    </SendMessageWrapper>
                </div>
            </ChatView>
        </ChatWrapper>
    );
}

export default Chat;
const Input = styled.input`
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    flex-grow: 1;
`;
const SendMessageWrapper = styled.div`
    padding: 10px 0.6rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px dashed;
    gap: 1rem;
`;
const SendBtn = styled.button`
    padding: 8px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Header = styled.div`
    position: sticky;
    top: 0;
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
    border-radius: 20px 20px 0px;
`;
const TextWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;

    .msg {
        border-radius: 8px 8px 0px;
        padding: 6px 8px;
        margin-left: 2rem;

        span {
            opacity: 0;
            max-height: 0;
            font-size: 0.7rem;
            text-align: right;
            text-align: right;
            display: block;
            transition: opacity 0.5s, max-height 0.5s;
        }
    }
    .msg:hover span {
        opacity: 1;
        max-height: 20px;
    }
`;
const ReceiveTextWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 5px 10px;

    .msg {
        border-radius: 8px 8px 8px 0px;
        padding: 6px 8px;
        margin-right: 2rem;

        span {
            opacity: 0;
            max-height: 0;
            font-size: 0.7rem;
            text-align: right;
            text-align: right;
            display: block;
            transition: opacity 0.5s, max-height 0.5s;
        }
    }
    .msg:hover span {
        opacity: 1;
        max-height: 20px;
    }
`;

const ChatWrapper = styled.div`
    font-family: Inter;
    bottom: 2rem;
    right: 2rem;
    width: fit-content;
    gap: 0.5rem;
    margin: 1rem;
    position: fixed;
`;

const ChatView = styled.div`
    border-radius: 20px 20px 0px;
    position: absolute;
    bottom: 50%;
    right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    /* z-index: -1; */
`;

const ChatWidget = styled.div`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    box-shadow: 1px 1px 5px #00000050;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 3;
`;
