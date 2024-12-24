import "./index.css";
import App from "./App.tsx";
import { CurrentMapProvider } from "./CurrentMapContext.tsx";
import { FoundProvider } from "./FoundContext.tsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FoundProvider>
            <CurrentMapProvider>
                <App />
            </CurrentMapProvider>
        </FoundProvider>
    </React.StrictMode>,
);
