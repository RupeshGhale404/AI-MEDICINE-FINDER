import React from "react";
import ReactDOM from "react-dom/client";
import "highlight.js/styles/github.css";
import App from "./App";
import "./index.css";

import {
AuthProvider
} from "./context/AuthContext";


ReactDOM.createRoot(
document.getElementById("root")!
)
.render(

<React.StrictMode>

<AuthProvider>

<App />

</AuthProvider>

</React.StrictMode>

);