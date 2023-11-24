import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./Contexts/Usercontext";
const Prevent = () => {
    const { profile } = useContext(UserContext);
    return <>{profile ? <Navigate to="/" /> : <Outlet />}</>;
};

export default Prevent;
