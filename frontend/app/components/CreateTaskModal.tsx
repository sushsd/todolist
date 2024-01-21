import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

export const CreateTaskModal = ({open, onClose}) => {
    const [newTaskTitle, setNewTaskTitle] = React.useState("");
    const [newTaskDescription, setNewTaskDescription] =
        React.useState("");

    const onCreateNewTask = async () => {
        const response = await fetch("/api/create_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newTaskTitle,
                description: newTaskDescription,
            }),
        });

        if (response.ok) {
            const message = await response.text();
        } else {
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                component={Card}
                elevation={5}
                sx={{
                    width: 300,
                    height: 300,
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
                    <Input
                        name="task-title"
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) =>
                            setNewTaskTitle(e.target.value)
                        }
                    />
                    <Input
                        name="task-description"
                        type="text"
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

//<Modal
//    open={isCreatingNewTask}
//    onClose={() => setIsCreatingNewTask(false)}
//    aria-labelledby="modal-modal-title"
//    aria-describedby="modal-modal-description"
//>
//    <Box
//        component={Card}
//        elevation={5}
//        sx={{
//            width: 300,
//            height: 300,
//            bgcolor: "background.paper",
//            borderRadius: "20px",
//            position: "absolute",
//            top: "50%",
//            left: "50%",
//            transform: "translate(-50%, -50%)",
//        }}
//    >
//        <Stack
//            direction="column"
//            spacing={4}
//            sx={{ padding: "30px" }}
//        >
//            <h1 className="text-center">Create a new Task</h1>
//            <Input
//                name="task-title"
//                type="text"
//                value={newTaskTitle}
//                onChange={(e) => setNewTaskTitle(e.target.value)}
//            />
//            <Input
//                name="task-description"
//                type="text"
//                value={newTaskDescription}
//                onChange={(e) =>
//                    setNewTaskDescription(e.target.value)
//                }
//            />
//            <Button
//                onClick={onCreateNewTask}
//                className="form-button"
//                color="primary"
//                variant="contained"
//            >
//                Create
//            </Button>
//        </Stack>
//    </Box>
//</Modal>
