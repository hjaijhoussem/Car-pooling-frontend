import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box, Button, Grid, Stack, Typography } from "@mui/joy";
import React from "react";
import { NavLink } from "react-router-dom";

export function Footer()
{
    return(
        <>
            <Box 
            sx={
                {
                    backgroundColor: '#F6F6F6',
                    height: '4.3rem'
                }
            }
            >
                <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid xs={8}>
                        <Stack sx={{paddingLeft: "7rem"}}>
                            <NavLink to = "/">
                                <Button startDecorator = {<DirectionsCarIcon sx={{color: "#393E46"}} />} variant="plain" sx={{marginTop: '0.75rem', "&:hover": {backgroundColor: "transparent"}}}>
                                    <Typography sx={{color: "#393E46"}}>
                                        MAH Carpools, 2023 ©
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Stack>
                    </Grid>
                    <Grid xs={8}>
                        <Stack direction={"row-reverse"} spacing={2} sx={{paddingRight: '7rem'}}>
                            <NavLink to = "/offerride">
                                <Button variant="plain" sx={{marginTop: '0.75rem', "&:hover": {backgroundColor: "transparent"}}}>
                                    <Typography>
                                        Offer ride
                                    </Typography>
                                </Button>
                            </NavLink>
                            <NavLink to = "/search">
                                <Button variant="plain" sx={{marginTop: '0.75rem', "&:hover": {backgroundColor: "transparent"}}}>
                                    <Typography>
                                        Search
                                    </Typography>
                                </Button>
                            </NavLink>
                            <NavLink to = "/search">
                                <Button variant="plain" sx={{marginTop: '0.75rem', "&:hover": {backgroundColor: "transparent"}}}>
                                    <Typography>
                                        Terms and Conditions
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}