import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import Chat from "@/components/Chat";

const Configuration: React.FC = () => {
    const npmScript = "npm install @patt-rick/react-quickchat";
    const yarnScript = "yarn add @patt-rick/react-quickchat";
    const [copiedScript, setCopiedScript] = useState<string | null>(null);
    const [organisationId, setOrganisationId] = useState<string>("");
    const [organisationName, setOrganisationName] = useState<string>("");

    useEffect(() => {
        const data = localStorage.getItem("ORGANISATION") || "{}";
        const parsedData = JSON.parse(data);
        setOrganisationId(parsedData.id || "");
        setOrganisationName(parsedData.name || "");
    }, []);

    const copyToClipboard = async (text: string) => {
        console.log("Copied:", text);
        try {
            await navigator.clipboard.writeText(text);
            setCopiedScript(text);
            setTimeout(() => setCopiedScript(null), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const CodeBlock: React.FC<{ children: React.ReactNode; script: string }> = ({
        children,
        script,
    }) => (
        <Card className="mb-4 hover:shadow-lg transition-shadow duration-300 p-0 bg-secondary">
            <Chat
                primaryColor={"yellow"}
                clientDetails={{
                    clientName: "Emmanuel",
                    clientId: 6,
                    clientOrgName: "UPSA",
                }}
                adminDetails={{
                    adminOrgName: "Jeskin Org",
                    adminOrgId: "8v7EuKA4UYIyCzBwkei7",
                }}
            />
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <pre className="text-sm overflow-x-auto flex-grow">{children}</pre>
                    <TooltipProvider>
                        <Tooltip open={copiedScript === script ? true : undefined}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => copyToClipboard(script)}
                                    className="cursor-pointer"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {copiedScript === script ? "Copied!" : "Copy to clipboard"}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <PageWrapper title="Configuration" subTitle="Set up your chat widget">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Chat Widget Settings</h1>
                    <p className="text-muted-foreground">
                        A simple task to start using our live chat in your application
                    </p>
                </div>

                <section>
                    <h2 className="text-lg font-semibold mb-4">Add Widget to Your React App</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <CodeBlock script={npmScript}>{npmScript}</CodeBlock>
                        <CodeBlock script={yarnScript}>{yarnScript}</CodeBlock>
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-2">
                        Simply Follow These to Use Our Awesome Chat Widget
                    </h3>
                    <p className="text-muted-foreground max-w-2xl">
                        This live chat feature is designed specifically for SaaS business owners who
                        desire to provide their customers with consistent and high-quality
                        assistance.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-4">Sample Implementation</h3>
                    <CodeBlock script={`import { Chat } from '@patt-rick/react-quickchat'`}>
                        <code className="block whitespace-pre-wrap">
                            {`import React from 'react';
import { Chat } from '@patt-rick/react-quickchat'

function App() {
return (
    <Chat
    primaryColor=// any hex color or rgb (optional)
    clientDetails={{
        clientName: // name of client,
        clientId: // any id relating to client,
        clientOrgName: // name of organisation of client
    }}
    adminDetails={{
        adminOrgName: '${organisationName}',
        adminOrgId: '${organisationId}'
    }}
    />
);
}`}
                        </code>
                    </CodeBlock>
                </section>
            </div>
        </PageWrapper>
    );
};

export default Configuration;
