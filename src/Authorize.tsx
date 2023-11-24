import { Navigate, Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import { useContext } from "react";
import { ThemeContext } from "./Contexts/ThemeContext";
import { UserContext } from "./Contexts/Usercontext";

const Authorize = () => {
    const { profile } = useContext(UserContext);
    const { themeColors } = useContext(ThemeContext);
    return (
        <>
            {!profile ? (
                <Navigate to="/login" />
            ) : (
                <div
                    style={{
                        backgroundColor: themeColors.background,
                        color: themeColors.foreground,
                    }}
                    className="main__wrapper"
                >
                    <SideNav />
                    <div style={{ borderColor: themeColors.border }} className="app__wrapper">
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    );
};

export default Authorize;
