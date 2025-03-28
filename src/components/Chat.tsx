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
        accentBackground: "#f4f4f5", // Softer background
        accentForeground: "#71717a", // Subtle text color
        background: "#ffffff",
        foreground: "#18181b",
        border: "#e4e4e7",
    };

    const { clientName, clientId, clientOrgName } = clientDetails;
    const { adminOrgId, adminOrgName } = adminDetails;
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState<DocumentData[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const scrollTo = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

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
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Widget Button */}
            <button
                className={`
                    rounded-full w-14 h-14 shadow-lg transform transition-all duration-300 
                    flex items-center justify-center cursor-pointer
                    hover:scale-110 active:scale-95
                    ${isOpen ? "rotate-180" : ""}
                `}
                style={{
                    backgroundColor: primaryColor,
                    color: "white",
                }}
                onClick={handleButtonClick}
            >
                {isOpen ? <Close /> : <Logo />}
            </button>

            {isOpen && (
                <div
                    ref={chatContainerRef}
                    className={`
                        w-96 h-[500px] mt-4 rounded-2xl shadow-2xl border 
                        flex flex-col bg-white overflow-hidden
                        transform transition-all duration-500 ease-in-out
                        animate-fade-in-up
                    `}
                    style={{
                        borderColor: themeColors.border,
                        backgroundColor: themeColors.accentBackground,
                    }}
                >
                    {/* Header */}
                    <div
                        className="p-4 text-lg font-semibold border-b flex items-center justify-between"
                        style={{
                            backgroundColor: primaryColor,
                            color: "white",
                            borderColor: themeColors.border,
                        }}
                    >
                        <span>{adminOrgName}</span>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-hide">
                        {chats.map((chat: DocumentData, i: React.Key) => (
                            <div
                                key={i}
                                className={`
                                    flex w-full ${chat.fromClient ? "justify-end" : "justify-start"}
                                `}
                            >
                                <div
                                    className={`
                                        max-w-[80%] p-3 rounded-2xl 
                                        ${
                                            chat.fromClient
                                                ? "bg-blue-100 rounded-tr-sm"
                                                : "bg-gray-200 rounded-tl-sm"
                                        }
                                    `}
                                >
                                    {chat.image ? (
                                        <img
                                            src={chat.image}
                                            alt="Uploaded"
                                            className="max-w-full rounded-lg cursor-pointer hover:opacity-80 transition"
                                            onClick={() => window.open(chat.image, "_blank")}
                                        />
                                    ) : (
                                        <p className="text-sm">{chat.message}</p>
                                    )}
                                    <p className="text-xs mt-1 opacity-50 text-right">
                                        {chat.timestamp?.toDate().toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={scrollTo}></div>
                    </div>

                    {/* Message Input Area */}
                    <div
                        className="p-4 border-t flex items-center gap-2"
                        style={{
                            borderColor: themeColors.border,
                            backgroundColor: themeColors.background,
                        }}
                    >
                        <input
                            className="flex-grow p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <label className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
                            <UploadImage />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                            onClick={image ? handleUpload : sendMessage}
                        >
                            <SendMessage />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
