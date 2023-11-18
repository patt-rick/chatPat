import "./App.css";
import Care from "./Care";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./routes";
import Prevent from "./Prevent";
import Authorize from "./Authorize";
import { GlobalStylesFn } from "./GlobalStylesFn";
import Login from "./Login";

function App() {
    return (
        <Router>
            <GlobalStylesFn />
            <Routes>
                <Route element={<Prevent />}>
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
