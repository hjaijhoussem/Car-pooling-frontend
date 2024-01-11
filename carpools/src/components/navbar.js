import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box, Button, Dropdown, Grid, ListDivider, Menu, MenuButton, MenuItem, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useCookies } from 'react-cookie';

export function Navbar()
{

    const [cookies, setCookies, removeCookies] = useCookies(["token", "MAHCemail"]);

    const navigate = useNavigate();

    const [loggedin, setLoggedin] = useState(cookies.MAHCemail ? cookies.MAHCemail : "login");
    
    function logout()
    {
        removeCookies("token");
        removeCookies("MAHCemail");
        navigate(0);
    };

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
                            <Box sx={loggedin === "login" ? {display: "none"} : {}}>
                                <Dropdown>
                                    <MenuButton startDecorator = {<PersonIcon />} variant="outlined" sx={{color: '#FEFEFE', marginTop: '0.75rem', paddingLeft: "0.5rem", "&:hover": {backgroundColor: "#0099FF"}}}>
                                        <Typography sx={{color: '#FEFEFE'}}>
                                            {loggedin === "login" ? "Login" : loggedin}
                                        </Typography>
                                    </MenuButton>
                                    <Menu sx={{minWidth: "12.3rem", backgroundColor: "#EFEFFF"}}>
                                        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                                        <ListDivider />
                                        <MenuItem onClick={() => navigate("/myrides")}>Rides</MenuItem>
                                        <MenuItem onClick={() => navigate("/myridereqs")}>Ride requests</MenuItem>
                                        <ListDivider />
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </Menu>
                                </Dropdown>
                            </Box>
                            <Box sx={loggedin === "login" ? {} : {display: "none"}}>
                                <NavLink to = {loggedin === "login" ? "/login" : "/"}>
                                    <Button startDecorator = {<PersonIcon />} variant="outlined" sx={{color: '#FEFEFE', marginTop: '0.75rem', paddingLeft: "0.5rem", "&:hover": {backgroundColor: "#0099FF"}}}>
                                        <Typography sx={{color: '#FEFEFE'}}>
                                            {loggedin === "login" ? "Login" : loggedin}
                                        </Typography>
                                    </Button>
                                </NavLink>
                            </Box>
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