import React, { useContext, useState } from "react";
import { z } from "zod";
import { UserContext } from "../../Contexts/Usercontext";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Building2, Send, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const organizationSchema = z.object({
    organizationName: z.string().trim().min(1, "Organization name is required"),
    organizationEmail: z.string().trim().min(1, "Email is required").email("Invalid email address"),
});

const adminSchema = z.object({
    adminName: z.string().trim().min(1, "Admin name is required"),
    adminEmail: z.string().trim().min(1, "Email is required").email("Invalid email address"),
    adminPassword: z.string().trim().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
    const { createOrganization, loading } = useContext(UserContext);

    const [organizationName, setOrganizationName] = useState("");
    const [organizationEmail, setOrganizationEmail] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const [signupStep, setSignupStep] = useState<"organization" | "admin">("organization");

    const [errors, setErrors] = useState<{
        organizationName?: string;
        organizationEmail?: string;
        adminName?: string;
        adminEmail?: string;
        adminPassword?: string;
        root?: string;
    }>({});

    const handleNextStep = (e: React.MouseEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            organizationSchema.parse({
                organizationName,
                organizationEmail,
            });

            setSignupStep("admin");
        } catch (err) {
            if (err instanceof z.ZodError) {
                const formErrors = err.flatten().fieldErrors;
                setErrors({
                    organizationName: formErrors.organizationName?.[0],
                    organizationEmail: formErrors.organizationEmail?.[0],
                });
            }
        }
    };

    const handleSignUp = async (e: React.MouseEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const validatedOrgData = organizationSchema.parse({
                organizationName,
                organizationEmail,
            });

            const validatedAdminData = adminSchema.parse({
                adminName,
                adminEmail,
                adminPassword,
            });

            await createOrganization({
                organizationName: validatedOrgData.organizationName,
                organizationEmail: validatedOrgData.organizationEmail,
                adminName: validatedAdminData.adminName,
                adminEmail: validatedAdminData.adminEmail,
                adminPassword: validatedAdminData.adminPassword,
            });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const formErrors = err.flatten().fieldErrors;
                setErrors({
                    organizationName: formErrors.organizationName?.[0],
                    organizationEmail: formErrors.organizationEmail?.[0],
                    adminName: formErrors.adminName?.[0],
                    adminEmail: formErrors.adminEmail?.[0],
                    adminPassword: formErrors.adminPassword?.[0],
                });
            } else {
                setErrors({ root: "An unexpected error occurred" });
            }
        }
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    signupStep === "organization"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                }`}
                            >
                                1
                            </div>
                            <div className="h-1 w-12 bg-muted mx-2" />
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    signupStep === "admin"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                }`}
                            >
                                2
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Step {signupStep === "organization" ? "1/2" : "2/2"}
                        </p>
                    </div>
                    <h2 className="text-lg font-semibold">
                        {signupStep === "organization" ? "Organization Details" : "Admin Account"}
                    </h2>
                </div>

                {signupStep === "organization" ? (
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="orgName">Organization Name</Label>
                            <div className="relative">
                                <Input
                                    id="orgName"
                                    name="orgName"
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                    placeholder="Acme Inc."
                                    className="pl-10"
                                />
                                <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                            {errors.organizationName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.organizationName}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="orgEmail">Email</Label>
                            <Input
                                id="orgEmail"
                                name="orgEmail"
                                value={organizationEmail}
                                onChange={(e) => setOrganizationEmail(e.target.value)}
                                placeholder="e.g., TechnologyLtd@example.com"
                            />
                            {errors.organizationEmail && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.organizationEmail}
                                </p>
                            )}
                        </div>
                        <Button className="w-full" onClick={handleNextStep}>
                            Next Step
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                ) : (
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="adminName">Admin Name</Label>
                            <div className="relative">
                                <Input
                                    id="adminName"
                                    name="adminName"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                    placeholder="John Doe"
                                    className="pl-10"
                                />
                                <User2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                            {errors.adminName && (
                                <p className="text-red-500 text-sm mt-1">{errors.adminName}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="adminEmail">Email</Label>
                            <div className="relative">
                                <Input
                                    id="adminEmail"
                                    name="adminEmail"
                                    type="email"
                                    value={adminEmail}
                                    onChange={(e) => setAdminEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="pl-10"
                                />
                                <User2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                            {errors.adminEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.adminEmail}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="adminPassword">Password</Label>
                            <Input
                                id="adminPassword"
                                name="adminPassword"
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                            />
                            {errors.adminPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.adminPassword}</p>
                            )}
                        </div>
                        {errors.root && <p className="text-red-500 text-sm">{errors.root}</p>}
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSignupStep("organization");
                                }}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button onClick={handleSignUp} className="flex-1" disabled={loading}>
                                {loading ? "Creating..." : "Create Account"}
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};

export default SignUp;
