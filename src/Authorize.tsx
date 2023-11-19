import { Navigate, Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import { useContext } from "react";
import { ThemeContext } from "./Contexts/ThemeContext";

const Authorize = () => {
    const { themeColors } = useContext(ThemeContext);
    return (
        <>
            {false ? (
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
