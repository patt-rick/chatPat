import { ChangeEvent, useEffect, useRef, useState } from "react";

import {
    DocumentData,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import React from "react";
import { db, storage } from "../firebase-config";
import {
    ChatView,
    ChatView2,
    ChatWidget,
    ChatWrapper,
    FileUpload,
    Header,
    Input,
    ProgressBar,
    ReceiveTextWrapper,
    SendBtn,
    SendMessageWrapper,
    TextWrapper,
    UploadLabel,
} from "./chat.styled";
import Close from "../assets/figures/Close";
import Logo from "../assets/figures/Logo";
import SendMessage from "../assets/figures/SendMessage";
import UploadImage from "../assets/figures/UploadImage";

export type ChatProps = {
    clientDetails: {
        clientId: string | number;
        clientName: string;
        clientOrgName: string;
    };
    adminDetails: {
        adminOrgId: string;
        adminOrgName: string;
    };
    primaryColor?: string;
};
export function Chat(props: ChatProps) {
    const { clientDetails, adminDetails, primaryColor = "#556cd6" } = props;
    const themeColors = {
        accentBackground: "#efefef",
        accentForeground: "#888",
        background: "#fff",
        foreground: "#000",
        border: "#ddd",
    };

    const { clientName, clientId, clientOrgName } = clientDetails;
    const { adminOrgId, adminOrgName } = adminDetails;
    const [animate, setAnimate] = useState(false);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState<DocumentData[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const scrollTo = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, "chats"),
                where("clientId", "==", clientId),
                orderBy("timestamp", "asc")
            ),
            (snapshot) => {
                setChats(snapshot.docs.map((doc) => doc.data()));
                setTimeout(() => {
                    if (scrollTo.current) {
                        scrollTo.current.scrollIntoView({ behavior: "smooth" });
                    }
                }, 200);
            }
        );

        return () => unsubscribe();
    }, []);

    const sendMessage = async () => {
        if (!message || !message.trim()) return;
        if (chats.length === 0) {
            try {
                const docRef = doc(collection(db, "clients"), JSON.stringify(clientId));
                await setDoc(docRef, {
                    id: clientId,
                    clientName: clientName,
                    organisationId: adminOrgId,
                    organisationName: clientOrgName,
                    timestamp: serverTimestamp(),
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            await updateDoc(doc(db, "clients", JSON.stringify(clientId)), {
                lastMessage: message,
            });
        }
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                clientId: clientId,
                clientName: clientName,
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
            const storageRef = ref(storage, `images/${adminOrgId}/${image.name}`);
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
                            clientId: clientId,
                            clientName: clientName,
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
                    color: primaryColor,
                }}
                onClick={handleButtonClick}
            >
                {animate ? <Close /> : <Logo />}
            </ChatWidget>
            <ChatView
                animate={animate}
                style={{
                    backgroundColor: themeColors.accentBackground,
                }}
            >
                <ChatView2 className="chat-view">
                    <Header
                        style={{
                            background: primaryColor,
                            color: themeColors.foreground,
                            borderBottom: `1px solid ${themeColors.border}`,
                        }}
                    >
                        {adminOrgName}
                    </Header>
                    <div>
                        {chats.map((chat: DocumentData, i: React.Key) => (
                            <React.Fragment key={i}>
                                {chat.fromClient ? (
                                    <TextWrapper>
                                        <div
                                            style={{
                                                backgroundColor: primaryColor,
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
                                            <span style={{ color: themeColors.accentForeground }}>
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
                                            <span style={{ color: themeColors.accentForeground }}>
                                                {chat.timestamp
                                                    ?.toDate()
                                                    .toString()
                                                    .substring(0, 21)}
                                            </span>
                                        </div>
                                    </ReceiveTextWrapper>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div ref={scrollTo}></div>
                </ChatView2>
                <div>
                    {image ? (
                        <ProgressBar
                            className="progress__bar"
                            value={progress}
                            max="100"
                        ></ProgressBar>
                    ) : null}
                    <SendMessageWrapper style={{ borderColor: themeColors.border }}>
                        <Input
                            style={{
                                background: themeColors.accentBackground,
                                color: themeColors.foreground,
                            }}
                            disabled={!!image}
                            onKeyUp={handleKeyEnter}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setMessage(e.target.value)
                            }
                            value={message}
                            placeholder="Send a message"
                        ></Input>
                        <>
                            <UploadLabel className="upload__label" htmlFor="upload">
                                <UploadImage />
                            </UploadLabel>
                            <FileUpload
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
                                color: primaryColor,
                                background: themeColors.background,
                            }}
                            className="send__btn"
                        >
                            <SendMessage />
                        </SendBtn>
                    </SendMessageWrapper>
                </div>
            </ChatView>
        </ChatWrapper>
    );
}
