import { Box, Typography } from "@mui/joy";
import React from "react";
import carsbanner from "../images/carsbanner.jpg";

export function Home()
{
    return(
        <>
            <Box sx={{backgroundImage: `url(${carsbanner})`,
                height: "15rem",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}></Box>
            
            <Typography level="body-lg">Home page</Typography>
        </>
    )
}