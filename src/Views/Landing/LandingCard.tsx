import { MessageSquare, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const LandingCard = ({ color, text }: { color: "green" | "blue" | "purple"; text: string }) => {
    const gradientColor = {
        green: "from-green-400 ",
        blue: "from-blue-400 ",
        purple: "from-purple-400 ",
    };
    const [hovered, setHovered] = useState(false);

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };
    return (
        <div className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  w-[13rem]  mx-auto  relative h-[20rem]">
            <Plus size={16} className="absolute -top-2 -left-2  m-auto text-black" />
            <Plus size={16} className="absolute -top-2 -right-2  m-auto text-black" />
            <Plus size={16} className="absolute -bottom-2 -left-2  m-auto text-black" />
            <Plus size={16} className="absolute -bottom-2 -right-2  m-auto text-black" />
            <MessageSquare size={28} />
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`absolute top-0 left-0 right-0 bottom-0  bg-gradient-to-b ${gradientColor[color]}  to-black  opacity-0 group-hover/canvas-card:opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center`}
            >
                <motion.h1
                    key={hovered ? "visible" : "hidden"}
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.6,
                        ease: "easeInOut",
                    }}
                    className="text-xl font-bold text-white"
                >
                    {text}
                </motion.h1>
            </div>
        </div>
    );
};

export default LandingCard;
