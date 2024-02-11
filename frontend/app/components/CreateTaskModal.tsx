import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { TextField, Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export const CreateTaskModal = (
    {
        open,
        onConfirm,
        onCancel,
    }: {
        open: boolean;
        onConfirm: () => void;
        onCancel: () => void;
    }) => {
    const [newTaskTitle, setNewTaskTitle] = React.useState("");
    const [newTaskDescription, setNewTaskDescription] =
        React.useState("");
    const [newTaskTags, setNewTaskTags] = React.useState("");

    const onCreateNewTask = async () => {
        const response = await fetch("/api/create_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newTaskTitle,
                newTaskDescription,
                newTaskTags,
            }),
        });
        console.log(JSON.stringify({
            newTaskTitle,
            newTaskDescription,
            newTaskTags,
        }));

        if (response.ok) {
            await response.text();
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
                    <h1 className="text-center">Create a new Task</h1>
                    <TextField
                        id="title"
                        label="Title"
                        value={newTaskTitle}
                        maxRows={1}
                        onChange={(e) =>
                            setNewTaskTitle(e.target.value)
                        }
                    />
                    <TextField
                        id="tags"
                        label="Tags"
                        value={newTaskTags}
                        onChange={(e) =>
                            setNewTaskTags(e.target.value)
                        }
                    />
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={20}
                        value={newTaskDescription}
                        onChange={(e) =>
                            setNewTaskDescription(e.target.value)
                        }
                    />
                    <Button
                        onClick={onCreateNewTask}
                        className="form-button"
                        color="primary"
                        variant="contained"
                    >
                        Create
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
