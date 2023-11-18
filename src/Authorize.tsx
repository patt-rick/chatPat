import { Navigate, Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";

const Authorize = () => {
    return (
        <>
            {false ? (
                <Navigate to="/login" />
            ) : (
                <div className="main__wrapper">
                    <SideNav />
                    <div className="app__wrapper">
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    );
};

export default Authorize;
