import { useState } from "react";
import { Button } from "@/components/ui/button";
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

const Settings: React.FC = () => {
    const [color, setColor] = useState(localStorage.getItem("APP_COLOR") || "#556cd6");

    const applyColorChange = () => {
        localStorage.setItem("APP_COLOR", color);
        window.location.reload();
    };

    const currentTheme = localStorage.getItem("theme") || "light";

    return (
        <PageWrapper title="Settings" subTitle="Change the way your application feels">
            <div className="space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>App Theme</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Change Theme</span>
                        <Select value={currentTheme} onValueChange={() => {}}>
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
                        <ColorSelect value={color} onSelect={setColor} />
                        <Button onClick={applyColorChange} className="mt-4">
                            Apply Color
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    );
};

export default Settings;
