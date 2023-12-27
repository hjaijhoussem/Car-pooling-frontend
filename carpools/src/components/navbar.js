import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box, Button, Grid, Stack, Typography } from "@mui/joy";
import React from "react";
import { NavLink } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export function Navbar()
{
    return(
        <>
            <Box 
            sx={
                {
                    backgroundColor: '#00A9FF',
                    height: '4.3rem'
                }
            }
            >
                <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid xs={8}>
                        <Stack sx={{paddingLeft: "7rem"}}>
                            <NavLink to = "/">
                                <Button startDecorator = {<DirectionsCarIcon sx={{color: "#FEFEFE"}} />} variant="plain" sx={{marginTop: '0.75rem', "&:hover": {backgroundColor: "transparent"}}}>
                                    <Typography sx={{color: '#FEFEFE'}}>
                                        MAH Carpools
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Stack>
                    </Grid>
                    <Grid xs={8}>
                        <Stack direction={"row-reverse"} spacing={2} sx={{paddingRight: '7rem'}}>
                            <NavLink to = "/login">
                                <Button startDecorator = {<PersonIcon />} variant="outlined" sx={{color: '#FEFEFE', marginTop: '0.75rem', paddingLeft: "0.5rem", "&:hover": {backgroundColor: "#0099FF"}}}>
                                    <Typography sx={{color: '#FEFEFE'}}>
                                        Login
                                    </Typography>
                                </Button>
                            </NavLink>
                            <NavLink to = "/offerride">
                                <Button startDecorator = {<AddIcon />} variant="outlined" sx={{color: '#FEFEFE', marginTop: '0.75rem', paddingLeft: "0.5rem", "&:hover": {backgroundColor: "#0099FF"}}}>
                                    <Typography sx={{color: '#FEFEFE'}}>
                                        Offer ride
                                    </Typography>
                                </Button>
                            </NavLink>
                            <NavLink to = "/search">
                                <Button startDecorator = {<SearchIcon />} variant="outlined" sx={{color: '#FEFEFE', marginTop: '0.75rem', paddingLeft: "0.5rem", "&:hover": {backgroundColor: "#0099FF"}}}>
                                    <Typography sx={{color: '#FEFEFE'}}>
                                        Search
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