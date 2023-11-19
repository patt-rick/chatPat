import ChatCard from "./ChatCard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState, useRef, useContext } from "react";
import "../assets/css/care.css";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import React, { ChangeEvent, KeyboardEvent } from "react"; // Imported ChangeEvent and KeyboardEvent from 'react'
import { ThemeContext } from "../Contexts/ThemeContext";
import { theme } from "../theme";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    authDomain: "jeskin-app.firebaseapp.com",
    projectId: "jeskin-app",
    messagingSenderId: "121247162860",
    appId: "1:121247162860:web:ed272c4ede78be9a7820c9",
    measurementId: "G-X3VEFGEVVK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

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
    const { themeColors } = useContext(ThemeContext);
    const [chats, setChats] = useState<any[]>([]); // Change 'any[]' to a more specific type if possible
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [selectedChatName, setSelectedChatName] = useState<string>("");
    const [selectedClientName, setSelectedClientName] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const scrollTo = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "clients"), orderBy("timestamp", "desc")),
            (snapshot) => {
                setChats(snapshot.docs.map((doc) => doc.data()));
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, "chats"),
                where("clientId", "==", selectedChatId),
                orderBy("timestamp", "asc")
            ),
            (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data() as Message));
                if (scrollTo.current) {
                    scrollTo.current.scrollIntoView({ behavior: "smooth" });
                }
            }
        );

        return () => unsubscribe();
    }, [selectedChatId]);

    const onSelectChat = (chat: any) => {
        setSelectedChatId(chat.id);
        setSelectedChatName(chat.school);
        setSelectedClientName(chat.clientName);
    };

    const sendMessage = async () => {
        try {
            await addDoc(collection(db, "chats"), {
                clientId: selectedChatId,
                clientName: selectedClientName,
                adminId: "2328Dfs4",
                message: message,
                image: null,
                fromClient: false,
                timestamp: serverTimestamp(),
            });
            setMessage("");
            if (scrollTo.current) {
                scrollTo.current.scrollIntoView({ behavior: "smooth" });
            }
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
                    await addDoc(collection(db, "chats"), {
                        clientId: selectedChatId,
                        clientName: selectedClientName,
                        adminId: "2328Dfs4",
                        image: url,
                        message: null,
                        fromClient: false,
                        timestamp: serverTimestamp(),
                    });
                    setMessage("");
                    setImage(null);
                    if (scrollTo.current) {
                        scrollTo.current.scrollIntoView({ behavior: "smooth" });
                    }
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
                {chats.map((chat, i) => (
                    <ChatCard
                        selectedChatId={selectedChatId}
                        onSelect={onSelectChat}
                        key={i}
                        data={chat}
                    />
                ))}
            </div>
            <div style={{ borderColor: themeColors.border }} className="chat__view">
                <div style={{ background: theme.palette.primary.main }} className="chat__header">
                    {selectedChatName || "Please Select a Chat"}
                </div>
                <div style={{ background: themeColors.accentBackground }} className="chat__main">
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
                                    {message.timestamp?.toDate().toString().substring(0, 21)}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div ref={scrollTo}></div>
                </div>
                <div>
                    {image ? (
                        <progress className="progress__bar" value={progress} max="100"></progress>
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
        </div>
    );
};

export default Care;
