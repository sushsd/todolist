"use client";
import React, { useState, useEffect } from "react";
import {
    NextUIProvider,
    Card,
    CardHeader,
    CardBody,
    Divider,
    Input,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "../globals.css";

function TaskCard({ task }: { task: any }) {
    return (
        <Card>
            <CardHeader>{task.title}</CardHeader>
            <CardBody>
                <p>{task.description}</p>
            </CardBody>
        </Card>
    );
}

function TaskOverview() {
    return (
        <NextUIProvider>
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
            >
                <Page />
            </NextThemesProvider>
        </NextUIProvider>
    );
}
const Page = () => {
    const [tasks, setTasks] = useState({ username: "", tasks: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const fetchTasks = async () => {
        setIsLoading(true);
        const response = await fetch("/api/task_overview");
        const data = await response.json();
        console.log(data);
        setTasks(data);
        setIsLoading(false);
    };

    async function onCreateNewTast() {
        const response = await fetch("/api/create_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newTaskTitle, newTaskDescription }),
        });

        if (response.ok) {
            const message = await response.text();
            fetchTasks();
        } else {
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        //<LargeCard title="Hallo" />
        <div className="App">
            <div className="py-10">
                <h1 className="text-4xl text-center">
                    Logged in as {tasks.username}
                </h1>
            </div>
            <ul
                role="list"
                //className="divide-y divide-gray-200"
            >
                {tasks.tasks.map((task) => (
                    <li
                        key={task["id"]}
                        className="columns justify-center py-5 px-10"
                    >
                        <TaskCard task={task} />
                    </li>
                ))}
            </ul>
            <div className="flex flex-col items-center justify-center px-10 space-y-4">
                <h1 className="text-4xl text-center">Create a new Task</h1>
                <Input
                    name="task-title"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    label="Task Title"
                />
                <Input
                    name="task-description"
                    type="text"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    label="Task Description"
                />
                <Button
                    onClick={onCreateNewTast}
                    className="form-button"
                >
                    Create
                </Button>
            </div>
        </div>
    );
};

export default TaskOverview;