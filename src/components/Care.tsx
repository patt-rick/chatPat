import ChatCard from "./ChatCard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState, useRef, useContext } from "react";
import "../assets/css/care.css";
import { onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import React, { ChangeEvent, KeyboardEvent } from "react"; // Imported ChangeEvent and KeyboardEvent from 'react'
import { ThemeContext } from "../Contexts/ThemeContext";
import { theme } from "../theme";
import EmptyStates from "./EmptyStates";
import darkBg from "../assets/img/darkBg.png";
import lightBg from "../assets/img/lightBg.png";
import { db, storage } from "../firebase-config";
import Loader from "./Loader";
import { size } from "lodash";
import { UserContext } from "../Contexts/Usercontext";
import { ClientsContext } from "../Contexts/ClientsContext";
import { openDB } from "idb";
import { convertTimestampToDate } from "../_helpers/utilites";

interface Message {
    clientId: string;
    clientName: string;
    adminId: string;
    message: string | null;
    image: string | URL | undefined;
    fromClient: boolean;
    timestamp: any; // Change 'any' to appropriate type for timestamp
}

const Care: React.FC = () => {
    const { orgInfo } = useContext(UserContext);
    const { clientsList, clientsLoading } = useContext(ClientsContext);
    const { themeColors, isLightTheme } = useContext(ThemeContext);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [selectedChatName, setSelectedChatName] = useState<string>("");
    const [selectedClientName, setSelectedClientName] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const scrollTo = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const indexDb = await openDB("chatDB", 1, {
                upgrade(indexDb) {
                    indexDb.createObjectStore("messages");
                },
            });
            if (!selectedChatId) return;

            let messages = await indexDb.get("messages", selectedChatId as any);
            if (!messages) {
                const unsubscribe = onSnapshot(
                    query(
                        collection(db, "chats"),
                        where("clientId", "==", selectedChatId),
                        where("organisationId", "==", orgInfo.id),
                        orderBy("timestamp", "asc")
                    ),
                    (snapshot) => {
                        messages = snapshot.docs.map((doc) => doc.data() as Message);
                        indexDb.put("messages", messages, selectedChatId as any);
                        setMessages(messages);
                        setTimeout(() => {
                            if (scrollTo.current) {
                                scrollTo.current.scrollIntoView({ behavior: "smooth" });
                            }
                        }, 200);
                    }
                );

                return () => unsubscribe();
            } else {
                setMessages(messages);
            }
        };

        fetchMessages();
    }, [selectedChatId]);

    const onSelectChat = (chat: any) => {
        setSelectedChatId(chat.id);
        setSelectedChatName(chat.organisationName);
        setSelectedClientName(chat.clientName);
    };

    const sendMessage = async () => {
        try {
            const now = new Date();

            const timestamp = {
                seconds: Math.floor(now.getTime() / 1000),
                nanoseconds: (now.getTime() % 1000) * 1000000,
            };
            const newMessage = {
                clientId: selectedChatId,
                clientName: selectedClientName,
                organisationId: orgInfo.id,
                adminId: "2328Dfs4",
                message: message,
                image: null,
                fromClient: false,
                timestamp: serverTimestamp(),
            };
            //@ts-ignore
            setMessages((prevMessages) => [
                ...prevMessages,
                { ...newMessage, timestamp: timestamp },
            ]);
            await addDoc(collection(db, "chats"), newMessage);
            setMessage("");
            if (scrollTo.current) {
                scrollTo.current.scrollIntoView({ behavior: "smooth" });
            }
            const indexDb = await openDB("chatDB", 1, {
                upgrade(indexDb) {
                    indexDb.createObjectStore("messages");
                },
            });
            let storedMessages = await indexDb.get("messages", selectedChatId as any);
            if (!storedMessages) {
                storedMessages = [];
            }
            storedMessages.push(newMessage);
            await indexDb.put("messages", storedMessages, selectedChatId as any);
        } catch (e: any) {
            console.error("Error adding document: ", e);
        }
    };

    const handleUpload = async () => {
        const storageRef = ref(storage, `images/${image!.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image!);

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
                    const now = new Date();

                    const timestamp = {
                        seconds: Math.floor(now.getTime() / 1000),
                        nanoseconds: (now.getTime() % 1000) * 1000000,
                    };
                    const imageMessage = {
                        clientId: selectedChatId,
                        clientName: selectedClientName,
                        organisationId: orgInfo.id,
                        adminId: "2328Dfs4",
                        image: url,
                        message: null,
                        fromClient: false,
                        timestamp: serverTimestamp(),
                    };

                    //@ts-ignore
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { ...imageMessage, timestamp: timestamp },
                    ]);
                    await addDoc(collection(db, "chats"), imageMessage);
                    setMessage("");
                    setImage(null);
                    if (scrollTo.current) {
                        scrollTo.current.scrollIntoView({ behavior: "smooth" });
                    }
                    const indexDb = await openDB("chatDB", 1, {
                        upgrade(indexDb) {
                            indexDb.createObjectStore("messages");
                        },
                    });
                    let storedMessages = await indexDb.get("messages", selectedChatId as any);
                    if (!storedMessages) {
                        storedMessages = [];
                    }
                    storedMessages.push(imageMessage);
                    await indexDb.put("messages", storedMessages, selectedChatId as any);
                } catch (e: any) {
                    console.error("Error adding document: ", e);
                }
            }
        );
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setMessage(`UPLOAD ${e.target.files[0].name}`);
        }
    };

    const handleKeyEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (!image) sendMessage();
            else handleUpload();
        }
    };

    return (
        <div className="care-wrapper">
            <div className="chat-list">
                {clientsLoading ? (
                    <Loader />
                ) : !size(clientsList) ? (
                    <div style={{ height: "100%", display: "grid" }}>
                        <EmptyStates msg="No messages yet" imgToUse="empty" />
                    </div>
                ) : (
                    <>
                        {clientsList.map((chat, i) => (
                            <ChatCard
                                selectedChatId={selectedChatId}
                                onSelect={onSelectChat}
                                key={i}
                                data={chat}
                            />
                        ))}
                    </>
                )}
            </div>
            {selectedChatId ? (
                <div style={{ borderColor: themeColors.border }} className="chat__view">
                    <div
                        style={{
                            background: theme.palette.primary.main,
                            zIndex: 3,
                            borderBottom: `1px solid ${themeColors.border}`,
                        }}
                        className="chat__header"
                    >
                        {selectedChatName || "Please Select a Chat"}
                        <CloseIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedChatId(null)}
                        />
                    </div>
                    <div
                        style={{
                            zIndex: 2,
                            backgroundImage: `${themeColors.chatBackgroundGradient},url(${
                                isLightTheme ? lightBg : darkBg
                            })`,
                        }}
                        className="chat__main"
                    >
                        {messages.map((message, i) => (
                            <div
                                key={i}
                                className={`message__contain ${
                                    message.fromClient ? "receive" : "send"
                                }`}
                            >
                                <div
                                    style={{
                                        color: themeColors.foreground,
                                        background: message.fromClient
                                            ? themeColors.background
                                            : theme.palette.primary.main,
                                        borderRadius: message.fromClient
                                            ? " 8px 8px 8px 0px"
                                            : "8px 8px 0px",
                                    }}
                                    className="message"
                                >
                                    {message.image ? (
                                        <div>
                                            <img
                                                style={{ cursor: "pointer" }}
                                                onClick={() => window.open(message.image, "_blank")}
                                                width={"100%"}
                                                src={message.image as string}
                                                alt="image"
                                            ></img>
                                        </div>
                                    ) : (
                                        <div>{message.message}</div>
                                    )}
                                    <span style={{ color: themeColors.accentForeground }}>
                                        {convertTimestampToDate(message.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div ref={scrollTo}></div>
                    </div>
                    <div>
                        {image ? (
                            <progress
                                className="progress__bar"
                                value={progress}
                                max="100"
                            ></progress>
                        ) : null}
                        <div style={{ borderColor: themeColors.border }} className="message__send">
                            <input
                                style={{
                                    background: themeColors.accentBackground,
                                    color: themeColors.foreground,
                                }}
                                disabled={!!image}
                                onKeyUp={handleKeyEnter}
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                                value={message}
                                placeholder="Send a message"
                            />
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
                            <button
                                onClick={image ? handleUpload : sendMessage}
                                style={{
                                    color: theme.palette.primary.main,
                                    backgroundColor: themeColors.background,
                                }}
                                className="send__btn"
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        borderLeft: `1px solid ${themeColors.border}`,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <EmptyStates msg="Please select a chat" imgToUse="noMessage" />
                </div>
            )}
        </div>
    );
};

export default Care;
