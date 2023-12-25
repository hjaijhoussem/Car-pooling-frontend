import React from "react";
import Card from "@mui/joy/Card";
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import PersonIcon from '@mui/icons-material/Person';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Button, CardActions, CardContent, Grid } from "@mui/joy";

export function RideCard(props)
{
    return(
        <>
            <Card sx={{paddingTop: "0.77rem", paddingBottom: "0.5rem", width: "25rem"}}>
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
                                {props.departure_time}
                            </Typography>
                            </Stack>
                        </Step>
                        <Step>
                            <Typography>{props.destination_region}, {props.destination_city}</Typography>
                        </Step>
                    </Stepper>
                </CardContent>
                <CardActions sx={{margin: "0rem", padding: "0rem"}}>
                    <Button variant="solid" sx={{maxWidth: '8.7rem', margin: '0rem auto 0rem auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}}>
                        Request to ride
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}