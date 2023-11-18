import { Navigate, Outlet } from "react-router-dom";
const Prevent = () => {
    return <>{false ? <Navigate to="/" /> : <Outlet />}</>;
};

export default Prevent;
