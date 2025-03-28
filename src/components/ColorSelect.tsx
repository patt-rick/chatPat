import { cn } from "@/lib/utils";

interface ColorSelectProps {
    value: string;
    onSelect: (x: string) => void;
}

const ColorSelect: React.FC<ColorSelectProps> = ({ value, onSelect }) => {
    const colors = [
        "#556cd6",
        "#FF5733",
        "#28B463",
        "#3498DB",
        "#F1C40F",
        "#683c7b",
        "#E67E22",
        "#e74c3c",
        "#2ecc71",
        "#9b59b6",
        "#1abc9c",
    ];

    return (
        <div
            className={cn("grid grid-cols-5 gap-4 p-4 border-2 rounded-lg", "max-w-md ")}
            style={{}}
        >
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => onSelect(color)}
                    className={cn(
                        "w-10 h-10 rounded-md cursor-pointer transition-all duration-200",
                        "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                        value === color ? "ring-4 ring-offset-2" : ""
                    )}
                    style={{
                        backgroundColor: color,
                    }}
                    aria-label={`Select ${color} color`}
                />
            ))}
        </div>
    );
};

export default ColorSelect;
