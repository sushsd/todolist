import React from "react";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({
    onSearch,
}: {
    onSearch: (searchTerm: string) => void;
}) => {
    const [searchTerm, setSearchTerm] = React.useState("");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                margin: "5px",
                transform: "translate(0%, 200%)",
            }}
        >
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                }}
            >
                <InputBase
                    sx={{ padding: 1, flex: 1 }}
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchTerm(event.target.value);
                    }}
                />
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    onClick={() => onSearch(searchTerm)}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};
