import React, { useState } from "react";
import Card from "@mui/joy/Card";
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import PersonIcon from '@mui/icons-material/Person';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Button, CardActions, CardContent, Grid, Snackbar } from "@mui/joy";
import data from "../data.json";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function RideReq(props)
{
    const timestamp = new Date("2001-09-20T" + props.departure_time);
    const departure_time = timestamp.toLocaleTimeString();

    const[cookies] = useCookies(["token"]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    async function cancel()
    {
        if(!(cookies.token))
        {
            navigate("/login");
            return;
        }
        console.log(props.req_id);
        console.log(props.ride_id);

        try
        {
            const response = await axios.delete(data.apiurl + `/api/v1/passenger/ride_requests/${props.ride_id}/${props.req_id}/cancel`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });

            console.log(response);

            if(response)
            {
                setSuccess(true);
                props.getReqs();
            }
        }
        catch (err)
        {
            console.log(err);
            setError(true);
        }
    }

    return(
        <>
            <Card sx={{paddingTop: "0.77rem", paddingBottom: "0.5rem", width: "33rem"}}>
                <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid xs={8}>
                        <div>
                            <Typography level="body-lg" startDecorator = {<PersonIcon />}>{props.driver_id}</Typography>
                            <Typography level="body-sm" startDecorator = {<StarBorderIcon sx={{fontSize: "1rem"}} />} sx={{marginLeft: "2rem"}}>{props.review}</Typography>
                        </div>
                    </Grid>
                    <Grid xs={8}>
                        <div>
                            <Stack direction={"row-reverse"}>
                                <Typography level="body-md" sx={{marginTop: "0.2rem"}}>${props.price_per_seat}</Typography>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
                <CardContent>
                    <Stepper orientation="vertical">
                        <Step>
                            <Typography>{props.departure_region}, {props.departure_city}</Typography>
                            <Stack spacing={0} sx={{marginTop: "-0.7rem"}}>
                            <Typography level="body-sm">
                                {departure_time.includes("PM") || departure_time.includes("AM") ? departure_time.slice(0, 4) + " " + departure_time.slice(-2, departure_time.length) : props.departure_time}, {props.departure_date}
                            </Typography>
                            </Stack>
                        </Step>
                        <Step>
                            <Typography>{props.destination_region}, {props.destination_city}</Typography>
                        </Step>
                    </Stepper>
                    <Typography startDecorator = {<AirlineSeatReclineNormalIcon />} sx={{marginTop: "0.7rem"}}>{props.available_seats} {props.available_seats === 1 ? "seat" : "seats"} available</Typography>
                    <Typography startDecorator = {<CheckCircleIcon color="success" sx={{fontSize: "1.3rem"}} />} color="success" sx={{display: props.status === "ACCEPTED" ? "inline" : "none", mt: "0.5rem"}}>Request accepted</Typography>
                    <Typography startDecorator = {<PendingIcon sx={{color: "#EBB02D", fontSize: "1.3rem"}} />} sx={{display: props.status === "PENDING" ? "inline" : "none", color: "#EBB02D", mt: "0.5rem"}}>Waiting for approval</Typography>
                    <Typography startDecorator = {<DoDisturbIcon sx={{color: "#c71c1c", fontSize: "1.25rem"}} />} color="danger" sx={{display: props.status === "REFUSED" ? "inline" : "none", mt: "0.5rem"}}>Request refused</Typography>
                </CardContent>
                <CardActions sx={{margin: "0rem", padding: "0rem"}}>
                    <Button variant="solid" sx={{maxWidth: '8.7rem', margin: '0rem auto 0rem auto', backgroundColor: '#EA4D4E', "&:hover": {backgroundColor: '#E83F3F'}}} onClick={cancel}>
                        Cancel request
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
                sx={{backgroundColor: "#CDEFCF"}}
                autoHideDuration={3000}
                open={success}
                variant={"outlined"}
                startDecorator = {<CheckCircleOutlineIcon color="success" />}
                onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setSuccess(false);
                }}
            >
                Canceled request to ride with success.
            </Snackbar>
            <Snackbar
                sx={{backgroundColor: "#FFDFDF"}}
                autoHideDuration={3000}
                open={error}
                variant={"outlined"}
                startDecorator = {<ErrorOutlineIcon sx={{color: "#c71c1c"}} />}
                onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setError(false);
                }}
            >
                An error occured when canceling request to ride.
            </Snackbar>
        </>
    )
}