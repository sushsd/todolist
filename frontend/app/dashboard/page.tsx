"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
//import "../globals.css";

function LargeCard({ title }: { title: any }) {
    return (
        <Card>
            <CardHeader>{title}</CardHeader>
            <CardBody>
                <p>{title}</p>
            </CardBody>
        </Card>
    );
}

function Page() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/task_overview")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTasks(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        //<LargeCard title="Hallo" />
        <div className="App">
            <ul
                role="list"
                className="divide-y divide-gray-200"
            >
                {tasks.tasks.map((task) => (
                    <li
                        key={task["id"]}
                        className="flex justify-between gap-x-6 py-5"
                    >
                        <div className="flex min-w-0 gap-x-4">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                {task["title"]}
                            </p>
                            <p className="task-description">
                                {task["description"]}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Page;
