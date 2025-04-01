import { useTheme } from "@/Contexts/theme-provider";
import { Check } from "lucide-react";

type ColorOption = {
    name: string;
    value: "blue" | "green" | "violet" | "yellow" | "red" | "orange" | "";
    background: string;
};

const colorOptions: ColorOption[] = [
    { name: "Slate", value: "", background: "bg-neutral-800" },
    { name: "Blue", value: "blue", background: "bg-blue-500" },
    { name: "Green", value: "green", background: "bg-green-500" },
    { name: "Violet", value: "violet", background: "bg-violet-500" },
    { name: "Yellow", value: "yellow", background: "bg-yellow-500" },
    { name: "Red", value: "red", background: "bg-red-500" },
    { name: "Orange", value: "orange", background: "bg-orange-500" },
];

function ColorSelect() {
    const { colorTheme, setColorTheme } = useTheme();

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Color Theme</p>
            <div className="flex gap-2">
                {colorOptions.map((option) => (
                    <button
                        key={option.value}
                        className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${option.background} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                        onClick={() => setColorTheme(option.value)}
                        title={option.name}
                        aria-label={`Change color theme to ${option.name}`}
                    >
                        {colorTheme === option.value && <Check className="h-4 w-4 text-white" />}
                        <span className="sr-only">{option.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
export default ColorSelect;
