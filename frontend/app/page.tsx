"use client";

import React, { useState } from "react";

import { NextUIProvider, Input, Button } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function App() {
    return (
        <NextUIProvider>
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
            >
                <LoginPage />
            </NextThemesProvider>
        </NextUIProvider>
    );
}

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

    async function onRegister() {
        console.log("registering new user");
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password }),
        });

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
                <div className="flex flex-col items-center justify-center space-y-3">
                    <h1 className="text-5xl pt-10 pb-6">Bachh-Do List</h1>
                    <div className="flex ">
                        <Input
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
                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="flex w-1/2 space-x-3 items-center justify-center">
                        <Button
                            onClick={onSubmit}
                            className="form-button"
                        >
                            Log In
                        </Button>
                        <Button
                            onClick={onSubmit}
                            className="form-button"
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
