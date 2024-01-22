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
import { Box, Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Checkbox from "@mui/material/Checkbox";

import { CreateTaskModal } from "app/components/CreateTaskModal";
import { Task } from "app/components/src/Task";
import { EditTaskModal } from "app/components/EditTaskModal";
import { TaskTable } from "../components/TaskTable";

function TaskOverview() {
    return (
        <Providers>
            <Page />
        </Providers>
    );
}

const Page = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


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

    return (
        <Box sx={{
            height: "100vh"
        }}>
            <Stack direction="row" sx={{ height: 1, padding: "10px" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <TaskTable isDrawerOpen={isDrawerOpen} drawerWidth={getDrawerWidth()} />
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
