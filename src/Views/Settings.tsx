import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageWrapper from "../components/PageWrapper";
import ColorSelect from "../components/ColorSelect";
import { useTheme } from "@/Contexts/theme-provider";

const Settings: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const handleToggle = (checked: "light" | "dark") => {
        setTheme(checked);
    };
    return (
        <PageWrapper title="Settings" subTitle="Change the way your application feels">
            <div className="space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>App Theme</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Change Theme</span>
                        <Select value={theme} onValueChange={handleToggle}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>App Color</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Choose your preferred application color
                        </p>
                        <ColorSelect />
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    );
};

export default Settings;
