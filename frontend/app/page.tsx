"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import "./globals.css";

function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function onSubmit() {
        console.log("submitting");
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password }),
        });
        console.log(response);
        //const body = await response.json();
        //console.log(body);

        if (response.ok) {
            const message = await response.text();
            console.log(message);
            router.push("/dashboard");
        } else {
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Bachh-Do List</h1>
                <input
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />
                <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />
                <button
                    onClick={onSubmit}
                    className="form-button"
                >
                    Log In
                </button>
            </header>
        </div>
    );
}

export default LoginPage;
