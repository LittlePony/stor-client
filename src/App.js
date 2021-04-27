import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "./Container";
import Login from "./Login";

function App() {
    const [access, setAccess] = useState("");
    const handleTokenUpdate = access => setAccess(access);

    return (
        <div className="App">
        {
            access ?
                <Container
                    access={access}/>
                :
                <Login
                    onTokenUpdate={handleTokenUpdate}/>
        }
        </div>
    );
}

export default App;
