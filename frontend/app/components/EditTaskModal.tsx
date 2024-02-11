import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { Task } from "app/components/src/Task";

//TODO: Create shared Create/Edit Task Modal
export const EditTaskModal = ({
    open,
    onConfirm,
    onCancel,
    task,
}: {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    task: Task;
}) => {
    const [editedTaskTitle, setEditedTaskTitle] = React.useState(task.title);
    const [editedTaskDescription, setEditedTaskDescription] = React.useState(
        task.description
    );
    const [editedTaskTags, setEditedTaskTags] = React.useState(task.tags);

    React.useEffect(() => {
        setEditedTaskTitle(task.title);
        setEditedTaskDescription(task.description);
        setEditedTaskTags(task.tags);
    }, [task]);

    const onConfirmTask = async () => {
        const response = await fetch("/api/modified_task", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: task.id,
                title: editedTaskTitle,
                description: editedTaskDescription,
                tags: editedTaskTags,
            }),
        });

        if (response.ok) {
            const message = await response.text();

            onConfirm();
        } else {
        }
    };

    return (
        <Modal
            open={open}
            onClose={onCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                component={Card}
                elevation={5}
                sx={{
                    width: 0.5,
                    bgcolor: "background.paper",
                    borderRadius: "20px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Stack
                    direction="column"
                    spacing={4}
                    sx={{ padding: "30px" }}
                >
                    <TextField
                        id="title"
                        variant="outlined"
                        value={editedTaskTitle}
                        maxRows={1}
                        onChange={(e) => setEditedTaskTitle(e.target.value)}
                    />
                    <TextField
                        id="tags"
                        variant="outlined"
                        value={editedTaskTags}
                        maxRows={1}
                        onChange={(e) => setEditedTaskTags(e.target.value)}
                        />
                    <TextField
                        id="description"
                        multiline
                        rows={20}
                        value={editedTaskDescription}
                        onChange={(e) =>
                            setEditedTaskDescription(e.target.value)
                        }
                    />
                    <Button
                        onClick={onConfirmTask}
                        className="form-button"
                        color="primary"
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};
