import React from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import "./bootstrap";
import Main from "./Main";

if (document.getElementById("app")) {
    const root = createRoot(document.getElementById("app"));
    root.render(
        <Router>
            <Main />
        </Router>
    );
}
