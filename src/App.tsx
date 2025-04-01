import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./routes";
import Prevent from "./Prevent";
import Authorize from "./Authorize";
import Login from "./Views/Login/Login";
import Landing from "./Views/Landing/Landing";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Prevent />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<Authorize />}>
                    {AppRoutes.map((route) => {
                        return (
                            <Route
                                key={route.id}
                                path={route.url}
                                element={<route.component />}
                            ></Route>
                        );
                    })}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
