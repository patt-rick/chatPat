import styled from "styled-components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";

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
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import React from "react";
import { size } from "lodash";

const firebaseConfig = {
    //FIREBBASE CONFIG
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

type ChatProps = {
    details: any;
};
function Chat(props: ChatProps) {
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
            <ChatWidget onClick={handleButtonClick}>
                {animate ? (
                    <button style={{ fontSize: "1.3rem" }} name="cancel">
                        cancel
                    </button>
                ) : (
                    <button style={{ fontSize: "1.3rem" }} name="chat">
                        chat
                    </button>
                )}
            </ChatWidget>
            <ChatView className={animate ? "open" : "close"}>
                <div className="chat-view">
                    <Header>SCHOOLDESK service helpLine</Header>
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
                                            <div className="msg">
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
                                                <span>
                                                    {chat.timestamp
                                                        ?.toDate()
                                                        .toString()
                                                        .substring(0, 21)}
                                                </span>
                                            </div>
                                        </TextWrapper>
                                    ) : (
                                        <ReceiveTextWrapper>
                                            <div className="msg">
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
                                                <span>
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
                    <SendMessageWrapper>
                        <Input
                            disabled={!!image}
                            onKeyUp={handleKeyEnter}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            placeholder="Send a message"
                        ></Input>
                        <>
                            <label className="upload__label" htmlFor="upload">
                                <button name="image">upload</button>
                            </label>
                            <input
                                id="upload"
                                className="file__upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </>
                        <SendBtn onClick={image ? handleUpload : sendMessage}>
                            <button style={{ fontSize: "1.3rem" }} name="send" />
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
    padding: 10px 0.5rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px dashed #ccc;
    gap: 1rem;
`;
const SendBtn = styled.div`
    padding: 4px;
    border-radius: 50%;
    color: #fff;
    background-color: #303144;
    box-shadow: 1px 1px 5px #00000061;
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
    background-color: #303144;
    color: #fff;
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
`;
const TextWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;

    .msg {
        background-color: #303144;
        color: #fff;
        border-radius: 5px;
        padding: 6px 8px;
        margin-left: 2rem;

        span {
            opacity: 0;
            max-height: 0;
            font-size: 0.7rem;
            text-align: right;
            color: #aaa;
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
        background-color: #fff;
        color: #444;
        border-radius: 5px;
        padding: 6px 8px;
        margin-right: 2rem;

        span {
            opacity: 0;
            max-height: 0;
            font-size: 0.7rem;
            text-align: right;
            color: #aaa;
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
    border-radius: 5px;
    background-color: #efefef;
    border: 3px solid #303144;
    position: absolute;
    bottom: 50%;
    right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    /* z-index: -1; */
`;

const ChatWidget = styled.div`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: #303144;
    color: #fff;
    box-shadow: 1px 1px 5px #00000050;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 3;
`;
