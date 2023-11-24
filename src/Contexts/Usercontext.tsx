import React, { ReactNode, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { User } from "./contextTypes";

type UserContextType = {
    profile: User | null;
    currentUserName: string;
    profileDetails: any;
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
};
const defaultUserContext: UserContextType = {
    profile: null,
    currentUserName: "",
    profileDetails: null,
    createUser: async () => Promise.resolve(),
    createOrganization: async () => Promise.resolve(),
    signIn: async () => Promise.resolve(),
    logout: async () => Promise.resolve(),
    setUser: () => {},
    writeUserData: async () => Promise.resolve(),
    resetPassword: async () => Promise.resolve(),
};

export const UserContext = React.createContext<UserContextType>(defaultUserContext);

const UserContextProvider = (props: { children: ReactNode }) => {
    const [profile, setProfile] = useState<User | any>(null);
    const [currentUserName, setCurrentUserName] = useState("");
    const [profileDetails, setProfileDetails] = useState<any>();
    const [error, setError] = useState("");

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
                await sendEmailVerification(newAdmin.user);
                await setDoc(doc(db, "admin", newAdmin.user.uid), {
                    email: newAdmin.user.email,
                    name: adminName,
                });
                // Sign out the user
                await signOut(auth);
                return newAdmin.user;
            } else throw new Error();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const signIn = ({ email, password }: { email: string; password: string }) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
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

    const fetchProfileDetails = async () => {
        try {
            if (auth.currentUser) {
                const docRef = doc(db, "profiles", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfileDetails(docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    setError("No such document!");
                }
            }
        } catch (error: any) {
            setError(error.message);
        }
    };
    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

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
                profileDetails,
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
