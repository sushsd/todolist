"use client";
import React, { useState, useEffect } from "react";
import { Providers } from "app/components/providers";
import "../globals.css";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { TaskTable } from "../components/TaskTable";
import { SearchBar } from "../components/SearchBar";

import { Task } from "../components/src/Task";

function TaskOverview() {
    return (
        <Providers>
            <Page />
        </Providers>
    );
}

const Page = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("All Tasks");
    const [tasks, setTasks] = useState<Task[]>([]);

    const getDrawerWidth = () => {
        const drawerWidth = 240;
        return isDrawerOpen ? drawerWidth : 0;
    }

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    }));


    const fetchTasks = async (searchTerm: string = "") => {
        if (searchTerm === "") {
            const response = await fetch("/api/task_overview");
            const data = await response.json();
            setTasks(data.tasks.map((task: any) => new Task(task)));
        } else {
            const response = await fetch("/api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: searchTerm,
                }),
            });
            const data = await response.json();
            if (data.message === "No matching result") {
                setTasks([]);
            }
            else {
                setTasks(data.tasks.map((task: any) => new Task(task)));
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Box sx={{
            height: "100vh"
        }}>
            <Modal open={isSearchBarOpen} onClose={() => setIsSearchBarOpen(false)}>
                <SearchBar
                    onSearch={(searchTitle) => {
                        setPageTitle(searchTitle);
                        fetchTasks(searchTitle);
                        setIsSearchBarOpen(false);
                    }} />
            </Modal>
            <Stack direction="row" sx={{ height: 1, padding: "10px", justifyContent: "space-evenly" }}>
                <Box sx={{}}>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Stack direction="column" sx={{ alignItems: "end", flex: 1 }}>
                    <Box sx={{ width: '100%', alignItems: "center" }}>
                        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                            {`Results for "${pageTitle}"`}
                        </Typography>
                    </Box>
                    <TaskTable isDrawerOpen={isDrawerOpen} drawerWidth={getDrawerWidth()} fetchTasks={fetchTasks} tasks={tasks} />
                </Stack>
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
                <Divider />
                <Button variant="text" sx={{ padding: 1 }} onClick={() => setIsSearchBarOpen(true)}>
                    Search
                </Button>

            </Drawer>
        </Box >
    );
};

export default TaskOverview;
