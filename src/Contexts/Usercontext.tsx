import React, { ReactNode, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import {
    doc,
    setDoc,
    addDoc,
    collection,
    serverTimestamp,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { User } from "./contextTypes";
import { showError, showSuccess, showWarning } from "../NotificationService/NotificationService";

type UserContextType = {
    profile: User | null;
    currentUserName: string;
    createUser: (email: string, password: string) => Promise<any>;
    createOrganization: (organization: {
        organizationName: string;
        organizationEmail: string;
        adminName: string;
        adminEmail: string;
        adminPassword: string;
    }) => Promise<any>;
    signIn: ({ email, password }: { email: string; password: string }) => Promise<any>;
    logout: () => Promise<void>;
    setUser: (name: React.SetStateAction<string>) => void;
    writeUserData: (name: any, email: any) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    loading: boolean;
};
const defaultUserContext: UserContextType = {
    profile: null,
    currentUserName: "",
    createUser: async () => Promise.resolve(),
    createOrganization: async () => Promise.resolve(),
    signIn: async () => Promise.resolve(),
    logout: async () => Promise.resolve(),
    setUser: () => {},
    writeUserData: async () => Promise.resolve(),
    resetPassword: async () => Promise.resolve(),
    loading: false,
};

export const UserContext = React.createContext<UserContextType>(defaultUserContext);

const UserContextProvider = (props: { children: ReactNode }) => {
    const [profile, setProfile] = useState<User | any>(null);
    const [currentUserName, setCurrentUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const createOrganization = async ({
        organizationName,
        organizationEmail,
        adminName,
        adminEmail,
        adminPassword,
    }: {
        organizationName: string;
        organizationEmail: string;
        adminName: string;
        adminEmail: string;
        adminPassword: string;
    }) => {
        setLoading(true);
        try {
            const organisationResp = await addDoc(collection(db, "organisations"), {
                name: organizationName,
                email: organizationEmail,
                admins: [],
                dateCreated: serverTimestamp(),
            });
            if (organisationResp.id) {
                const newAdmin = await createUserWithEmailAndPassword(
                    auth,
                    adminEmail,
                    adminPassword
                );
                await signOut(auth);
                await updateProfile(newAdmin.user, {
                    displayName: adminName,
                });
                await sendEmailVerification(newAdmin.user);
                await setDoc(doc(db, "admins", newAdmin.user.uid), {
                    email: newAdmin.user.email,
                    name: adminName,
                    organisations: [organisationResp.id],
                });
                const orgRef = doc(db, "organisations", organisationResp.id);
                await updateDoc(orgRef, {
                    admins: arrayUnion(newAdmin.user.uid),
                });

                // Sign out the user

                if (newAdmin.user) showSuccess("Success. please verify your email to login", 10000);
                else showError("Something went wrong");
                setLoading(false);
                return newAdmin.user;
            }
        } catch (e: any) {
            showError(handleAuthError(e));
        }
        setLoading(false);
    };

    const signIn = async ({ email, password }: { email: string; password: string }) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user.emailVerified) {
                localStorage.setItem("CURRENT_USER", JSON.stringify(user));
                setLoading(false);
                return { success: true, name: user.displayName };
            } else {
                showWarning("Please verify your email to login");
                await signOut(auth);
                setLoading(false);
                return { success: false };
            }
        } catch (error: any) {
            showError(handleAuthError(error));
            setLoading(false);
            return { error: true };
        }
    };

    const logout = () => {
        localStorage.removeItem("CURRENT_USER");
        return signOut(auth);
    };

    const setUser = (name: React.SetStateAction<string>) => {
        setCurrentUserName(name);
    };

    const writeUserData = async (name: any, email: any) => {
        if (auth.currentUser)
            await setDoc(doc(db, "profiles", auth.currentUser.uid), {
                username: name,
                email: email,
                userId: auth.currentUser.uid,
                privileges: [],
            });
    };

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };
    function handleAuthError(error: { code: any; message: string }) {
        let errorMessage;

        switch (error.code) {
            case "auth/invalid-email":
                errorMessage = "The email address is invalid.";
                break;
            case "auth/user-disabled":
                errorMessage = "The user corresponding to the given email has been disabled.";
                break;
            case "auth/user-not-found":
                errorMessage = "There is no user found with the given email.";
                break;
            case "auth/wrong-password":
                errorMessage = "The password is invalid for the given email.";
                break;
            case "auth/email-already-in-use":
                errorMessage = "The email address is already in use by another account.";
                break;
            case "auth/operation-not-allowed":
                errorMessage = "Email/password accounts are not enabled.";
                break;
            case "auth/weak-password":
                errorMessage = "The password is too weak.";
                break;
            default:
                errorMessage = "An unknown error occurred: " + error.message;
        }

        return errorMessage;
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setProfile(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider
            value={{
                profile,
                currentUserName,
                loading,
                createUser,
                createOrganization,
                signIn,
                logout,
                setUser,
                writeUserData,
                resetPassword,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
