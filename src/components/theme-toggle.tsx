import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTheme } from "@/Contexts/theme-provider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleToggle = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex items-center justify-between space-x-2 p-2">
            <Label className="font-medium" htmlFor="theme-mode">
                Toggle dark mode
            </Label>
            <Switch id="theme-mode" checked={theme === "dark"} onCheckedChange={handleToggle} />
        </div>
    );
}
