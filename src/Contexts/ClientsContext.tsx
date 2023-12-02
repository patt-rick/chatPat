import React, { ReactNode, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserContext } from "./Usercontext";

export const ClientsContext = React.createContext<{
    clientsList: Array<any>;
    clientsLoading: boolean;
}>({
    clientsList: [],
    clientsLoading: false,
});
const ClientsContextProvider = ({ children }: { children: ReactNode }) => {
    const { orgInfo } = useContext(UserContext);
    const [chats, setChats] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        if (orgInfo.id) {
            const unsubscribe = onSnapshot(
                query(
                    collection(db, "clients"),
                    where("organisationId", "==", orgInfo.id),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setChats(snapshot.docs.map((doc) => doc.data()));
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        }
    }, [orgInfo]);

    return (
        <ClientsContext.Provider value={{ clientsList: chats, clientsLoading: loading }}>
            {children}
        </ClientsContext.Provider>
    );
};

export default ClientsContextProvider;
