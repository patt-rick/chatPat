import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useContext } from "react";
import { UserContext } from "./Contexts/Usercontext";

const Authorize = () => {
    const { profile } = useContext(UserContext);
    return (
        <>
            {!profile ? (
                <Navigate to="/login" />
            ) : (
                <SidebarProvider>
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <Outlet />
                    </SidebarInset>
                </SidebarProvider>
            )}
        </>
    );
};

export default Authorize;
