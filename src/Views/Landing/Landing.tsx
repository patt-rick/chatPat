import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background";
import LandingCard from "./LandingCard";

interface ChatMessage {
    text: string;
    isUser: boolean;
}

const THEMES = {
    red: "#EF4444",
    blue: "#3B82F6",
    yellow: "#F59E0B",
    orange: "#F97316",
};

function App() {
    const [activeTheme, setActiveTheme] = useState<keyof typeof THEMES>("blue");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const navigate = useNavigate();

    const demoMessages = [
        { text: "Hi there! How can I help you today?", isUser: false },
        { text: "I need help with a feature.", isUser: true },
        { text: "I'd be happy to help! What kind of feature are you working with?", isUser: false },
    ];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < demoMessages.length) {
                setMessages((prev) => [...prev, demoMessages[index]]);
                index++;
            } else {
                setMessages([]);
                index = 0;
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-900 to-white">
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                        Welcome to{" "}
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 text-transparent bg-clip-text">
                            QuickChat.
                        </span>
                    </div>
                    <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                        The right way to help your customers
                    </div>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 cursor-pointer"
                    >
                        Start now
                    </button>
                </motion.div>
            </AuroraBackground>
            <div className="  bg-[#fafafa] w-full">
                <div className="flex flex-wrap gap-16 justify-start py-24 pt-0 w-fit mx-auto">
                    <LandingCard color="green" text=" Lightning Fast" />
                    <LandingCard color="blue" text="Secure and Reliable" />
                    <LandingCard color="purple" text="Customizable" />
                </div>
            </div>
            {/* Hero Section */}
            <div className="w-full  px-4 pt-24 pb-16 bg-[#fafafa]">
                <div className="text-center">
                    <p className="text-xl text-black max-w-2xl mx-auto mb-12">
                        The next generation chatbot platform that transforms how you interact with
                        your customers. Fast, intelligent, and completely customizable.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="cursor-pointer px-8 py-3 border border-indigo-400 bg-white text-indigo-900 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white ">
                <div className="container mx-auto px-4 py-24">
                    <div className="flex justify-center gap-4 mb-12">
                        {Object.entries(THEMES).map(([name, color]) => (
                            <button
                                key={name}
                                onClick={() => setActiveTheme(name as keyof typeof THEMES)}
                                className={`w-12 h-12 rounded-full transition-transform ${
                                    activeTheme === name ? "scale-110 ring-4 ring-white" : ""
                                }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>

                    <div className="max-w-xl mx-auto bg-white/10 border border-blue/20 rounded-xl p-6 backdrop-blur-sm">
                        <div className="space-y-4 min-h-[300px]">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        message?.isUser ? "justify-end" : "justify-start"
                                    } animate-fade-in`}
                                >
                                    <div
                                        className={`max-w-[80%] p-4 rounded-2xl ${
                                            message?.isUser ? "text-white" : "text-white"
                                        }`}
                                        style={{ backgroundColor: THEMES[activeTheme] }}
                                    >
                                        {message?.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 bg-white/10 rounded-full px-6 py-3 text-gray-500 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2"
                                style={
                                    {
                                        "--tw-ring-color": THEMES[activeTheme],
                                    } as React.CSSProperties
                                }
                            />
                            <button
                                className="p-3 rounded-full text-white"
                                style={{ backgroundColor: THEMES[activeTheme] }}
                            >
                                <MessageSquare className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                        Join thousands of businesses already using QuickChat to transform their
                        customer service.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-8 py-3 bg-white text-indigo-900 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                    >
                        Start Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
