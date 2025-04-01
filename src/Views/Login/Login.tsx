import SignUp from "./SignUp";
import SignIn from "./SignIn";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";

const Login = () => {
    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden lg:flex w-1/2 bg-primary/10 flex-col items-center justify-center p-12 relative">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center mb-8">
                        <MessageCircle className="h-16 w-16 text-primary" />
                    </div>
                    <h1 className="text-5xl font-bold text-primary mb-6">Quick Chat</h1>
                    <p className="text-xl text-muted-foreground max-w-md mx-auto">
                        Your intelligent conversation companion. Experience the future of
                        communication.
                    </p>

                    <div className="mt-12 space-y-4 max-w-sm mx-auto">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/20 p-3 rounded-2xl rounded-tl-none">
                                <p className="text-sm">Hello! How can I assist you today?</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 justify-end">
                            <div className="bg-primary p-3 rounded-2xl rounded-tr-none">
                                <p className="text-sm text-primary-foreground">
                                    I'd love to learn more about AI!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <SignIn />
                        </TabsContent>

                        <TabsContent value="signup">
                            <SignUp />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Login;
