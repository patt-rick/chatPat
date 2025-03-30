import React, { useState, useEffect } from "react";
import { MessageSquare, Zap, Shield, Palette } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

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
        { text: "I need help with my project.", isUser: true },
        { text: "I'd be happy to help! What kind of project are you working on?", isUser: false },
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
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    the right way to help your customers
                </motion.h1>
            </LampContainer>
            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="text-center">
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                        The next generation chatbot platform that transforms how you interact with
                        your customers. Fast, intelligent, and completely customizable.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-8 py-3 bg-white text-indigo-900 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="container mx-auto px-4 py-24">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                            <Zap className="w-12 h-12 text-white mb-4" />
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                Lightning Fast
                            </h3>
                            <p className="text-gray-300">
                                Instant responses powered by cutting-edge AI technology. No more
                                keeping your customers waiting.
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                            <Shield className="w-12 h-12 text-white mb-4" />
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                Secure & Reliable
                            </h3>
                            <p className="text-gray-300">
                                Enterprise-grade security with end-to-end encryption. Your
                                conversations are always protected.
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                            <Palette className="w-12 h-12 text-white mb-4" />
                            <h3 className="text-2xl font-semibold text-white mb-3">Customizable</h3>
                            <p className="text-gray-300">
                                Match your brand identity with customizable themes and interfaces.
                            </p>
                        </div>
                    </div>
                </div>

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

                    {/* Chat Demo */}
                    <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
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
                                className="flex-1 bg-white/10 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2"
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
