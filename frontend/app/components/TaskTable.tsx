import { Box, Checkbox, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "./src/Task";
import { CreateTaskModal } from "./CreateTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import ClearIcon from '@mui/icons-material/Clear';


export const TaskTable = ({
    isDrawerOpen,
    drawerWidth,
}: {
    isDrawerOpen: boolean;
    drawerWidth: number;
}) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [tasks, setTasks] = useState([Task]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);
    const [editedTask, setEditedTask] = useState(new Task({}));

    const fetchTasks = async () => {
        setIsLoading(true);
        const response = await fetch("/api/task_overview");
        const data = await response.json();
        setTasks(data.tasks.map((task: any) => new Task(task)));
        setIsLoading(false);
    };

    //TODO: Many places need to not use this, instead update the state.
    async function onDeletedTask(task: Task) {
        const response = await fetch("/api/deleted_task", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: task.id }),
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
        <Box
            sx={{
                height: 1,
                width: 1 - drawerWidth / window.innerWidth,
                padding: "20px",
                paddingLeft: "10px"
            }}
        >
            <CreateTaskModal
                open={isCreatingNewTask}
                onConfirm={() => {
                    setIsCreatingNewTask(false)
                    fetchTasks();
                }}
                onCancel={() => {
                    setIsCreatingNewTask(false);
                }}
            />
            <EditTaskModal
                open={isEditingTask}
                onConfirm={() => {
                    setIsEditingTask(false);
                    setEditedTask(new Task({}));
                    fetchTasks();
                }}
                onCancel={() => {
                    setIsEditingTask(false);
                    setEditedTask(new Task({}));
                }} task={editedTask} />
            <TableContainer
                component={Paper}
                sx={{
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    //marginLeft: `${getDrawerWidth()}px`,
                }}
            >
                <Box sx={{ height: 0.95, overflow: "auto" }}>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">
                                    Created At
                                </TableCell>
                                <TableCell align="left">
                                    Updated At
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                                hover
                                onClick={() => setIsCreatingNewTask(true)}
                            >
                                <TableCell
                                    colSpan={5}
                                    align="center"
                                    style={{ userSelect: "none" }}
                                >
                                    Add New Task
                                </TableCell>
                            </TableRow>
                            {tasks.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th":
                                            { border: 0 },
                                    }}
                                    hover
                                    onClick={() => {
                                        setIsEditingTask(true);
                                        setEditedTask(row);
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                    >
                                        <Checkbox
                                            onClick={(event) => {
                                                event.stopPropagation();
                                            }}
                                            checked={row.is_done}
                                            onChange={() => {
                                                fetch("/api/set_done", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        id: row.id,
                                                        done: !row.is_done,
                                                    }),
                                                });
                                                row.is_done = !row.is_done;
                                                const newTasks = tasks.map(
                                                    (task: any) => {
                                                        if (
                                                            task.id === row.id
                                                        ) {
                                                            return row;
                                                        }
                                                        return task;
                                                    }
                                                );
                                                setTasks(newTasks);
                                            }} />
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        size="small"
                                    >
                                        {row.title}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ minWidth: 150 }}
                                    >
                                        {new Date(
                                            row.created_time
                                        ).toDateString()}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ minWidth: 150 }}
                                    >
                                        {new Date(
                                            row.updated_time
                                        ).toDateString()}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ paddingRight: 5 }}>
                                        <IconButton
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onDeletedTask(row)
                                            }}>
                                            <ClearIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Divider />
                <TablePagination
                    component="div"
                    count={tasks.length}
                    page={0}
                    onPageChange={() => { }}
                    rowsPerPage={10}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        </Box>
    );
}

