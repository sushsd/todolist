"use client";

import React, { useState } from "react";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/navigation";
import { Providers } from "app/components/providers";

function App() {
    return (
        <Providers>
            <LoginPage />
        </Providers>
    );
}


function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function onLogin() {
        console.log("submitting");
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password }),
        });


        const data = await response.json();
        console.log(data.message);
        if (data.message === "success") {
            router.push("/dashboard");
        } else if (data.message === "Incorrect Password") {
            alert("Incorrect Password");
        } else if (data.message === "User not found") {
            alert("User not found");
        }
    }

    async function onRegister() {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password }),
        });

        const data = await response.json();
        console.log(data.message);
        if (data.message === "success") {
            router.push("/dashboard");
        } else if (data.message === "User already exists") {
            alert("User already exists");
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="flex flex-col items-center justify-center space-y-3">
                    <h1 className="text-5xl pt-10 pb-6">Bachh-Do List</h1>
                    <div className="flex ">
                        <TextField
                            name="name"
                            type="text"
                            label="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="flex">
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            required
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="flex w-1/2 space-x-3 items-center justify-center">
                        <Button
                            onClick={onLogin}
                            className="form-button"
                            variant="contained"
                        >
                            Log In
                        </Button>
                        <Button
                            onClick={onRegister}
                            className="form-button"
                            variant="contained"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
