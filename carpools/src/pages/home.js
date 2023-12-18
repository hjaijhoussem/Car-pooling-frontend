import { Autocomplete, Box, Stack } from "@mui/joy";
import React, { useState } from "react";
import carsbanner from "../images/carsbanner.jpg";
import driverpassengers from "../images/driver_passengers.svg";
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PersonIcon from '@mui/icons-material/Person';
import SignpostIcon from '@mui/icons-material/Signpost';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import data from "../data.json";
import { Footer } from "../components/footer";
import { NavLink } from "react-router-dom";

export function Home()
{

    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState("");
    const [passengersnb, setPassengersnb] = useState(1);

    const [depInvalid, setDepInvalid ] = useState(false);
    const [arrivalInvalid, setArrivalInvalid ] = useState(false);
    const [dateInvalid, setDateInvalid ] = useState(false);

    // how to get values and handle change of select inputs
    const handleChange = (event, newValue) => {
        setPassengersnb(newValue);
    };

    function handleSubmit()
    {
        if (!(departure))
        {
            if (!(arrival))
            {
                if (!(date))
                {
                    setDateInvalid(true);
                }
                setArrivalInvalid(true);
            }
            setDepInvalid(true);
            return;
        }
        if (!(arrival))
        {
            if (!(date))
            {
                setDateInvalid(true);
            }
            setArrivalInvalid(true);
            return;
        }
        if (!(date))
        {
            setDateInvalid(true);
            return;
        }
        alert(`values are: ${departure} ${arrival} ${date} ${passengersnb}`)
    }

    return(
        <>
            <Box sx={{backgroundImage: `url(${carsbanner})`,
                height: "15rem",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}></Box>

            <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '67rem',
                mx: 'auto',
                marginTop: '2.7rem',
                marginBottom: '3rem'
            }}
            >
                <CardContent>
                    <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                        <FormControl>
                            <Autocomplete color={depInvalid ? "danger" : "neutral"} size="lg" options={data.locations} sx={{maxWidth: "14rem"}} startDecorator={<LocationSearchingIcon sx={depInvalid ? { color: "#d86d6e" } : {}} />} placeholder="Leaving from"  onChange={(event, newValue) => setDeparture(newValue)} required />
                        </FormControl>
                        <FormControl>
                            <Autocomplete color={arrivalInvalid ? "danger" : "neutral"} size="lg" options={data.locations} sx={{maxWidth: "14rem"}} startDecorator={<LocationSearchingIcon sx={arrivalInvalid ? { color: "#d86d6e" } : {}} />} placeholder="Going to" onChange={(event, newValue) => setArrival(newValue)} required />
                        </FormControl>
                        <FormControl>
                            <Input color={dateInvalid ? "danger" : "neutral"} size="lg" type='date' onChange={(event) => setDate(event.target.value)} required />
                        </FormControl>
                        <Select size="lg" startDecorator={<PersonIcon />} defaultValue="1" onChange={handleChange}>
                            <Option value="1">1 passenger</Option>
                            <Option value="2">2 passengers</Option>
                            <Option value="3">3 passengers</Option>
                            <Option value="4">4 passengers</Option>
                            <Option value="5">5 passengers</Option>
                            <Option value="6">6 passengers</Option>
                            <Option value="7">7 passengers</Option>
                            <Option value="8">8 passengers</Option>
                        </Select>
                        <CardActions sx={{padding: "0rem"}}>
                            <NavLink to = {`/search/${departure}/${arrival}/${date}/${passengersnb}`}>
                                <Button size="lg" variant="solid" sx={{ width: "7rem", backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}} onClick={handleSubmit}>
                                    Search
                                </Button>
                            </NavLink>
                        </CardActions>
                    </Stack>
                </CardContent>
            </Card>

            <Stack direction={"row"} spacing={2} justifyContent={"center"} sx={{margin: "1rem"}}>
                <Card variant="plain" sx={{ maxWidth: "19rem", backgroundColor: "transparent" }}>
                    <Typography level="h1" startDecorator={<SignpostIcon />}></Typography>
                    <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
                        Travel at low prices
                    </Typography>
                    <Typography>
                        Wherever you’re going, there’s a carpool that will get you there for less.
                    </Typography>
                </Card>
                <Card variant="plain" sx={{ maxWidth: "19rem", backgroundColor: "transparent" }}>
                    <Typography level="h1" startDecorator={<HowToRegIcon />}></Typography>
                    <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
                        Trustworthy and simple
                    </Typography>
                    <Typography>
                    We check reviews, profiles and IDs, so you know who you’re travelling with; and our app is both simple and secure thanks to powerful technology.
                    </Typography>
                </Card>
                <Card variant="plain" sx={{ maxWidth: "19rem", backgroundColor: "transparent" }}>
                    <Typography level="h1" startDecorator={<LocationOnIcon />}></Typography>
                    <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
                        Proximity makes it easier
                    </Typography>
                    <Typography>
                    There is always a ride close to you. Now you can find the closest ride among the largest carpool network ever with a simple filter.
                    </Typography>
                </Card>
            </Stack>

            <Stack direction={"row"} spacing={2} justifyContent={"center"} sx={{margin: "1rem"}}>
                <Box sx={{backgroundImage: `url(${driverpassengers})`,
                    height: "21rem",
                    width: "25rem",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}></Box>
                <Card variant="plain" sx={{ maxWidth: "31rem", backgroundColor: "transparent" }}>
                    <Typography level="h2" sx={{marginTop: "2rem"}}>
                        Where do you want to drive to?
                    </Typography>
                    <Typography level="body-md">
                        Sharing a carpool is a great way to travel. It's affordable, comfortable and eco-friendly! If you're driving with an empty car, consider publishing a carpool ride on BlaBlaCar to save costs and travel with some company. Our community of carpoolers is the most trustworthy in the world.
                    </Typography>
                    <CardActions sx={{padding: "0rem"}}>
                        <Box sx={{margin: "auto"}}>
                            <Button variant="solid" size="lg" sx={{maxWidth: '11rem', margin: 'auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}}>
                                Offer a ride
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Stack>

            <Footer />
        </>
    )
}
// maybe change the date input to not only day and manth input