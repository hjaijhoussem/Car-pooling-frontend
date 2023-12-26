import React, { useEffect, useState } from "react";
import { Autocomplete, Stack } from "@mui/joy";
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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import data from "../data.json";
import { useParams } from "react-router-dom";
import { RideCard } from "../components/ridecard";
import { Pagination } from "../components/pagination";

export function Search()
{

    const params = useParams();

    const [rides, setRides] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ridesPerPage, setRidesPerPage] = useState(4);

    const lastRideIndex = currentPage * ridesPerPage;
    const firstRideIndex = lastRideIndex - ridesPerPage;
    const currentRides = rides.slice(firstRideIndex, lastRideIndex);

    const [departure, setDeparture] = useState(params.departure);
    const [arrival, setArrival] = useState(params.arrival);
    const [date, setDate] = useState(params.date);
    const [passengersnb, setPassengersnb] = useState(params.passengersnb ? params.passengersnb : "1");
    const [filter, setFilter] = useState("Earliest departure")

    const [depInvalid, setDepInvalid ] = useState(false);
    const [arrivalInvalid, setArrivalInvalid ] = useState(false);
    const [dateInvalid, setDateInvalid ] = useState(false);

    const handleChange = (event, newValue) => {
        setPassengersnb(newValue);
    };

    function filterChange(item)
    {
        setFilter(item);
        handleSubmit();
    }

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

        setDepInvalid(false);
        setArrivalInvalid(false);
        setDateInvalid(false);

        setRides(data.rides);
    }

    useEffect(() => {
        if(params.departure)
        {
            handleSubmit();
        }
    }, [])

    return(
        <>
                        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '67rem',
                mx: 'auto',
                marginTop: '2rem',
                marginBottom: '3rem'
            }}
            >
                <CardContent>
                    <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                        <FormControl>
                            <Autocomplete color={depInvalid ? "danger" : "neutral"} size="lg" options={data.locations} defaultValue={departure} sx={{maxWidth: "14rem"}} startDecorator={<LocationSearchingIcon />} placeholder="Leaving from" onChange={(event, newValue) => setDeparture(newValue)} required />
                        </FormControl>
                        <FormControl>
                            <Autocomplete color={arrivalInvalid ? "danger" : "neutral"} size="lg" options={data.locations} defaultValue={arrival} sx={{maxWidth: "14rem"}} startDecorator={<LocationSearchingIcon />} placeholder="Going to" onChange={(event, newValue) => setArrival(newValue)} required />
                        </FormControl>
                        <FormControl>
                            <Input color={dateInvalid ? "danger" : "neutral"} size="lg" defaultValue={date} type='date' onChange={(event) => setDate(event.target.value)} />
                        </FormControl>
                        <Select size="lg" startDecorator={<PersonIcon />} defaultValue={passengersnb} onChange={handleChange}>
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
                            <Button size="lg" variant="solid" sx={{ width: "7rem", backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}} onClick={handleSubmit}>
                                Search
                            </Button>
                        </CardActions>
                    </Stack>
                </CardContent>
            </Card>

            {
                rides.length > 0 ?
                <Stack direction={"row"} spacing={2} justifyContent={"center"} sx={{margin: "1rem"}}>
                    <Card variant="plain" sx={{ maxWidth: "19rem", backgroundColor: "transparent" }}>
                        <Typography level="h3" sx={{ mb: 0.5, color: "#555555" }}>
                            Sort by
                        </Typography>
                        <RadioGroup aria-label="Your plan" name="people" defaultValue={filter}>
                            <List
                                sx={{
                                minWidth: 240,
                                '--List-gap': '0.5rem',
                                '--ListItem-paddingY': '0rem',
                                '--ListItem-radius': '8px',
                                '--ListItemDecorator-size': '32px',
                                }}
                            >
                                {
                                    ["Earliest departure", "Lowest price", "Available seats"].map((item, index) => (
                                    <ListItem variant="plain" key={item} sx={{ boxShadow: 'none' }}>
                                        <ListItemDecorator>
                                            {[<AccessTimeIcon />, <AttachMoneyIcon />, <AirlineSeatReclineNormalIcon />][index]}
                                        </ListItemDecorator>
                                        <Radio
                                            overlay
                                            value={item}
                                            label={item}
                                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                            slotProps={{
                                                action: ({ checked }) => ({
                                                    sx: (theme) => ({
                                                        ...(checked && {
                                                        inset: -1,
                                                        border: '0px solid',
                                                        borderColor: 'transparent',
                                                        }),
                                                    }),
                                                    onClick: filterChange(item)
                                                }),
                                            }}
                                        />
                                    </ListItem>
                                    ))
                                }
                            </List>
                        </RadioGroup>
                    </Card>
                    <Stack direction={"column"} spacing={2}>
                        {
                            currentRides.map((ride, index) => {
                                return(
                                    <RideCard
                                        key = {index}
                                        driver_id = {ride.driver_id}
                                        available_seats = {ride.available_seats}
                                        departure_time = {ride.departure_time}
                                        price_per_seat = {ride.price_per_seat}
                                        departure_city = {ride.departure_city}
                                        departure_region = {ride.departure_region}
                                        destination_city = {ride.destination_city}
                                        destination_region = {ride.destination_region}
                                        review = {ride.review}
                                    />
                                )
                            })
                        }
                        <Pagination
                            totalRides={rides.length}
                            ridesPerPage={ridesPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </Stack>
                </Stack> :
                <></>
            }
        </>
    )
}