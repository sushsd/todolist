"use client";
import React, { useState, useEffect } from "react";
import { Providers } from "app/components/providers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../globals.css";
import { Box, Stack} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { CreateTaskModal } from "app/components/CreateTaskModal";

function TaskOverview() {
    return (
        <Providers>
            <Page />
        </Providers>
    );
}

const Page = () => {
    const [tasks, setTasks] = useState({ username: "", tasks: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const getDrawerWidth = () => {
        const drawerWidth = 240;
        return isDrawerOpen ? drawerWidth : 0;
    }

    const fetchTasks = async () => {
        setIsLoading(true);
        const response = await fetch("/api/task_overview");
        const data = await response.json();
        console.log(data);
        setTasks(data);
        setIsLoading(false);
    };

    async function onCreateNewTask() {
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
        setIsCreatingNewTask(false);
    }

    function drawTasksTable(tasks: any[]) {
        return (
            <Box
                sx={{
                    height: 1,
                    width: 1 - getDrawerWidth() / window.innerWidth,
                    padding: "20px",
                    paddingLeft: "10px"
                }}
            >
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
                                        colSpan={4}
                                        align="center"
                                        style={{ userSelect: "none" }}
                                    >
                                        Add New Task
                                    </TableCell>
                                </TableRow>
                                {tasks.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {row.is_done}
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

    useEffect(() => {
        fetchTasks();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    }));

    return (
        <Box sx={{
            height: "100vh"
        }}>
            <CreateTaskModal open={isCreatingNewTask} onClose={() => setIsCreatingNewTask(false)} />
            <Stack direction="row" sx={{height: 1, padding: "10px"}}>
                <Box sx={{ flexGrow: 1 }}>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                    <MenuIcon />
                </IconButton>
                </Box>
            {drawTasksTable(tasks.tasks)}
            </Stack>
            <Drawer
                anchor="left"
                variant="persistent"
                open={isDrawerOpen}
                sx={{
                    width: getDrawerWidth(),
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: getDrawerWidth(),
                        boxSizing: "border-box",
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                        <MenuIcon />
                    </IconButton>
                </DrawerHeader>
            </Drawer>
        </Box >
    );
};

export default TaskOverview;
