import React, { useContext, useState } from "react";
import { z } from "zod";
import { UserContext } from "../../Contexts/Usercontext";
import { useNavigate } from "react-router-dom";
import { showInfo } from "../../NotificationService/NotificationService";
import { User2, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required"),
});

const SignIn = () => {
    const navigate = useNavigate();
    const { signIn } = useContext(UserContext);

    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        root?: string;
    }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});

        try {
            const validatedData = loginSchema.parse({
                email: adminEmail,
                password: adminPassword,
            });

            setIsLoading(true);
            const resp = await signIn({
                email: validatedData.email,
                password: validatedData.password,
            });

            if (resp.success) {
                navigate("/dashboard");
                showInfo(`Welcome ${resp.name}`, 3000);
            } else {
                setErrors({ root: resp.message || "Login failed" });
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const formErrors = err.flatten().fieldErrors;
                setErrors({
                    email: formErrors.email?.[0],
                    password: formErrors.password?.[0],
                });
            } else {
                setErrors({ root: "An unexpected error occurred" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="pl-10"
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                            />
                            <User2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {errors.root && <p className="text-red-500 text-sm">{errors.root}</p>}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                        <Send className="w-4 h-4 ml-2" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default SignIn;
