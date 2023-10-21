import ChatCard from "./ChatCard";
import { useEffect, useState, useRef } from "react";
import "./care.css";

import { initializeApp } from "firebase/app";
import {
    doc,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import React from "react";
import { size } from "lodash";

const firebaseConfig = {
    //FIREBASE CONFIG
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const Care = () => {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChatName, setSelectedChatName] = useState("");
    const [selectedClientName, setSelectedClientName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const scrollTo = useRef(null);

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
                setMessages(snapshot.docs.map((doc) => doc.data()));
                if (scrollTo.current) {
                    scrollTo.current.scrollIntoView({ behavior: "smooth" });
                }
            }
        );

        return () => unsubscribe();
    }, [selectedChatId]);

    const onSelectChat = (chat) => {
        setSelectedChatId(chat.id);
        setSelectedChatName(chat.school);
        setSelectedClientName(chat.clientName);
    };
    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(db, "chats"), {
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
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const handleUpload = async () => {
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
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        );
    };
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setMessage(`UPLOAD ${e.target.files[0].name}`);
        }
    };
    const handleKeyEnter = (event) => {
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
            <div className="chat__view">
                <div className="chat__header">{selectedChatName || "Please Select a Chat"}</div>
                <div className="chat__main">
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={`message__contain ${
                                message.fromClient ? "receive" : "send"
                            }`}
                        >
                            <div className="message">
                                {message.image ? (
                                    <div>
                                        <img
                                            style={{ cursor: "pointer" }}
                                            onClick={() => window.open(message.image, "_blank")}
                                            width={"100%"}
                                            src={message.image}
                                            alt="image"
                                        ></img>
                                    </div>
                                ) : (
                                    <div>{message.message}</div>
                                )}
                                <span>
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
                    <div className="message__send">
                        <input
                            disabled={image}
                            onKeyUp={handleKeyEnter}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            value={message}
                            placeholder="Send a message"
                        />
                        <>
                            <label className="upload__label" htmlFor="upload">
                                <i class="fa-solid fa-image"></i>
                            </label>
                            <input
                                id="upload"
                                className="file__upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </>
                        <button onClick={image ? handleUpload : sendMessage} className="send__btn">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Care;
