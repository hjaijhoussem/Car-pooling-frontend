import React, { useCallback, useEffect, useState } from "react";
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
import { Button, CardActions, CardContent, Grid, Snackbar } from "@mui/joy";
import data from "../data.json";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Ride(props)
{
    const timestamp = new Date("2001-09-20T" + props.departure_time);
    const departure_time = timestamp.toLocaleTimeString();

    const[cookies] = useCookies(["token"]);

    const [success, setSuccess] = useState(false);
    const [alreadyRequested, setAlreadyRequested] = useState(false);
    const [error, setError] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState(0);

    const navigate = useNavigate();

    async function cancel()
    {
        // if(!(cookies.token))
        // {
        //     navigate("/login");
        //     return;
        // }
        // console.log(props.req_id);
        // console.log(props.ride_id);

        // try
        // {
        //     const response = await axios.delete(data.apiurl + `/api/v1/passenger/ride_requests/${props.ride_id}/${props.req_id}/cancel`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${cookies.token}`
        //         }
        //     });

        //     console.log(response);

        //     if(response)
        //     {
        //         setSuccess(true);
        //         props.getReqs();
        //     }
        // }
        // catch (err)
        // {
        //     console.log(err);
        //     setError(true);
        // }
    }

    const getReviews = useCallback(async () => {
        try
        {
            var response = await axios.get(data.apiurl + `/api/v1/user/ride/${props.ride_id}/reviews`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            console.log(response);
            setReviews(response.data);
        }
        catch (err)
        {
            console.log(err);
        }
    },[cookies.token, props.ride_id])

    useEffect(() => {
        if(!(cookies.token))
        {
            navigate("/login");
            return;
        }
        getReviews();
    }, [cookies.token, navigate, getReviews]);

    useEffect(() => {
        if(reviews.length === 0)
        {
            return;
        }

        let sum = 0;
        reviews.forEach( rev => {
        sum += rev.stars;
        });

        setReview(sum / reviews.length);

    }, [reviews]);

    return(
        <>
            <Card sx={{paddingTop: "0.77rem", paddingBottom: "0.5rem", width: "33rem"}}>
                <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid xs={8}>
                        <div>
                            <Typography level="body-lg" startDecorator = {<PersonIcon />}>{props.driver_id}</Typography>
                            <Typography level="body-sm" startDecorator = {<StarBorderIcon sx={{fontSize: "1rem"}} />} sx={{marginLeft: "2rem"}}>{(Math.round(review * 10) / 10).toString()}</Typography>
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
                </CardContent>
                <CardActions sx={{margin: "0rem", padding: "0rem"}}>
                    <Button variant="solid" sx={{minWidth: "8rem", maxWidth: '8.7rem', margin: '0rem auto 0rem auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}} onClick={() => navigate(`/checkreqs/${props.ride_id}`)}>
                        Check requests
                    </Button>
                    <Button variant="solid" sx={{minWidth: "8rem", maxWidth: '8.7rem', margin: '0rem auto 0rem auto', backgroundColor: '#FF9843', "&:hover": {backgroundColor: '#EE9843'}}} onClick={() => navigate(`/editride/${props.ride_id}`)}>
                        Edit ride
                    </Button>
                    <Button variant="solid" sx={{minWidth: "8rem", maxWidth: '8.7rem', margin: '0rem auto 0rem auto', backgroundColor: '#EA4D4E', "&:hover": {backgroundColor: '#E83F3F'}}} onClick={cancel}>
                        Cancel ride
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
                Ride canceled with success.
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
                An error occured when canceling ride.
            </Snackbar>
        </>
    )
}