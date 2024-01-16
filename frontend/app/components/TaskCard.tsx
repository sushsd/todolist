import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Checkbox,
} from "@nextui-org/react";

export function TaskCard({ task }: { task: any }) {
    const setDone = async (done: boolean) => {
        console.log(`set done to ${done}`);
        const response = await fetch("/api/set_done", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: task.id, done: done }),
        });

        if (response.ok) {
            const message = await response.text();
        } else {
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <Checkbox
                        color="primary"
                        checked={task.done}
                        onChange={(e) => setDone(e.target.checked)}
                    ></Checkbox>
                    <p>{task.title}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{task.description}</p>
            </CardBody>
        </Card>
    );
}
