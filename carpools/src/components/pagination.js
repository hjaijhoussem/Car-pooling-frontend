import { Button, ButtonGroup } from "@mui/joy";
import React from "react";

export function Pagination ({totalRides, ridesPerPage, setCurrentPage, currentPage}) 
{
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalRides / ridesPerPage); i++) {
        pages.push(i);
    }

    return (
        <ButtonGroup spacing={"0.5rem"} sx={{ justifyContent: 'center' }}>
            {pages.map((page, index) => {
                return (
                    <Button
                        variant={page === currentPage ? "solid" : "outlined"}
                        sx={page === currentPage ? { backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}} : { color: "#777777" }}
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        >
                        {page}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};