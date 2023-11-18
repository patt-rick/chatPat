import React, { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "./contextTypes";

export const UserContext = React.createContext<any>(null);

const UserContextProvider = (props: any) => {
    const [profile, setProfile] = useState<User | any>(null);
    const [currentUserName, setCurrentUserName] = useState("");
    const [profileDetails, setProfileDetails] = useState<any>();
    const [error, setError] = useState("");

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email: string, password: string) => {
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
                error,
                createUser,
                signIn,
                logout,
                setUser,
                writeUserData,
                fetchProfileDetails,
                resetPassword,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
