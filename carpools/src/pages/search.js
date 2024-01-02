import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete, FormLabel, Stack } from "@mui/joy";
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PersonIcon from '@mui/icons-material/Person';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import data from "../data.json";
import { useParams } from "react-router-dom";
import { RideCard } from "../components/ridecard";
import { Pagination } from "../components/pagination";
import axios from "axios";

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
    const [filter, setFilter] = useState("earliest departure");

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

    const handleSubmit = useCallback(async () => {
        
        setDepInvalid(false);
        setArrivalInvalid(false);
        setDateInvalid(false);
        
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

        try
        {
            var response = await axios.get(data.apiurl + `/api/v1/user/rides?departureDate=${date}&availableSeats=${passengersnb}&departureRegion=${departure.toUpperCase()}&destinationRegion=${arrival.toUpperCase()}`);
            console.log(response);
            setRides(response.data);
        }
        catch (err)
        {
            console.log(err);
        }
    },[arrival, date, departure, passengersnb])

    useEffect(() => {
        if(params.departure)
        {
            handleSubmit();
        }
    }, [handleSubmit, params.departure]) // gotta add the function cuz later it will async, in which case it essential to put it in that array

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
                <Stack direction={"row"} spacing={11} justifyContent={"center"} sx={{margin: "1rem"}}>
                    
                    <FormControl>
                        <FormLabel sx={{fontSize: "1.77rem", color: "#555555"}}>Sort by</FormLabel>
                        <RadioGroup
                            defaultValue="earliest departure"
                            name="filters"
                            value={filter}
                            onChange={(event) => filterChange(event.target.value)}
                            sx={{ my: 0.1 }}
                        >
                            <Radio sx={{fontSize: "1.2rem"}} value="earliest departure" label="Earliest departure" />
                            <Radio sx={{fontSize: "1.2rem"}} value="lowest price" label="Lowest price" />
                            <Radio sx={{fontSize: "1.2rem"}} value="available seats" label="Available seats" />
                        </RadioGroup>
                    </FormControl>
                    
                    <Stack direction={"column"} spacing={2}>
                        {
                            currentRides.map((ride, index) => {
                                return(
                                    <RideCard
                                        key = {index}
                                        ride_id = {ride.id}
                                        driver_id = {ride.driver.firstname + " " + ride.driver.lastname}
                                        available_seats = {ride.availableSeats}
                                        departure_time = {ride.departureDate.slice(11, 16)}
                                        departure_date = {ride.departureDate.slice(0, 10)}
                                        price_per_seat = {ride.pricePerSeat}
                                        departure_city = {ride.departureCity}
                                        departure_region = {ride.departureRegion}
                                        destination_city = {ride.destinationCity}
                                        destination_region = {ride.destinationRegion}
                                        passengersnb = {passengersnb}
                                        review = {4.7}
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