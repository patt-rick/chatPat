import { useState, useRef, useContext, useEffect, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileImage, Send, X } from "lucide-react";
import { onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { openDB } from "idb";
import { UserContext } from "../Contexts/Usercontext";
import { ClientsContext } from "../Contexts/ClientsContext";
import { convertTimestampToDate } from "../_helpers/utilites";
import { db, storage } from "../firebase-config";
import ChatCard from "./ChatCard";
import EmptyStates from "./EmptyStates";
import Loader from "./Loader";

interface Message {
    clientId: string;
    clientName: string;
    adminId: string;
    message: string | null;
    image: string | URL | undefined;
    fromClient: boolean;
    timestamp: any;
}

const Care = () => {
    const { orgInfo } = useContext(UserContext);
    const { clientsList, clientsLoading } = useContext(ClientsContext);

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

    return (
        <div className="flex h-full">
            <div className="w-1/3 border-r p-2 overflow-y-auto">
                {clientsLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader />
                    </div>
                ) : clientsList.length === 0 ? (
                    <EmptyStates msg="No messages yet" imgToUse="empty" />
                ) : (
                    <div className="space-y-2">
                        {clientsList.map((chat, i) => (
                            <ChatCard
                                key={i}
                                selectedChatId={selectedChatId}
                                onSelect={onSelectChat}
                                data={chat}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Chat View */}
            <div className="flex-1 flex flex-col">
                {selectedChatId ? (
                    <Card className="flex flex-col h-full w-full">
                        {/* Chat Header */}
                        <CardHeader className="flex flex-row justify-between items-center border-b">
                            <CardTitle>{selectedChatName || "Please Select a Chat"}</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedChatId(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>

                        {/* Chat Messages */}
                        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${
                                        msg.fromClient ? "justify-start" : "justify-end"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] p-3 rounded-lg ${
                                            msg.fromClient
                                                ? "bg-gray-100 text-black"
                                                : "bg-primary text-white"
                                        }`}
                                    >
                                        {msg.image ? (
                                            <img
                                                src={msg.image as string}
                                                alt="Uploaded"
                                                className="max-w-full rounded-md cursor-pointer"
                                                onClick={() => window.open(msg.image, "_blank")}
                                            />
                                        ) : (
                                            <p>{msg.message}</p>
                                        )}
                                        <small className="block text-xs mt-1 opacity-70">
                                            {convertTimestampToDate(msg.timestamp)}
                                        </small>
                                    </div>
                                </div>
                            ))}
                            <div ref={scrollTo} />
                        </CardContent>

                        {/* Message Input */}
                        <div className="p-4 border-t flex items-center space-x-2">
                            {image && (
                                <div className="w-full">
                                    <progress value={progress} max="100" className="w-full h-1" />
                                </div>
                            )}
                            <Input
                                placeholder="Send a message"
                                value={message}
                                disabled={!!image}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyUp={(e) =>
                                    e.key === "Enter" && (image ? handleUpload() : sendMessage())
                                }
                                className="flex-1"
                            />

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" asChild>
                                            <label
                                                htmlFor="image-upload"
                                                className="cursor-pointer"
                                            >
                                                <FileImage className="h-5 w-5" />
                                            </label>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Upload Image</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                            <Button
                                onClick={image ? handleUpload : sendMessage}
                                disabled={!message && !image}
                            >
                                <Send className="h-4 w-4 mr-2" /> Send
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="flex-1 flex items-center justify-center border-l">
                        <EmptyStates msg="Please select a chat" imgToUse="noMessage" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Care;
