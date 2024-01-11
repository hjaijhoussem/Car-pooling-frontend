import React, { useCallback, useEffect, useState } from "react";
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Option, Select, Snackbar } from '@mui/joy';
import data from "../data.json";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from '../components/navbar';

export function EditRide()
{

    const params = useParams();

    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [passengersnb, setPassengersnb] = useState("1");
    const [price, setPrice] = useState("");

    const [depInvalid, setDepInvalid ] = useState(false);
    const [arrivalInvalid, setArrivalInvalid ] = useState(false);
    const [dateInvalid, setDateInvalid ] = useState(false);
    const [timeInvalid, setTimeInvalid ] = useState(false);
    const [priceInvalid, setPriceInvalid ] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [cookies] = useCookies(["token"]);

    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setPassengersnb(newValue);
    };

    async function handleSubmit()
    {
        let shouldReturn = false;

        if (!(departure))
        {
            setDepInvalid(true);
            shouldReturn = shouldReturn ? shouldReturn : !shouldReturn;
        }
        if (!(arrival))
        {
            setArrivalInvalid(true);
            shouldReturn = shouldReturn ? shouldReturn : !shouldReturn;
        }
        if (!(date))
        {
            setDateInvalid(true);
            shouldReturn = shouldReturn ? shouldReturn : !shouldReturn;
        }
        if (!(time))
        {
            setTimeInvalid(true);
            shouldReturn = shouldReturn ? shouldReturn : !shouldReturn;
        }
        if (!(price))
        {
            setPriceInvalid(true);
            shouldReturn = shouldReturn ? shouldReturn : !shouldReturn;
        }
        if(shouldReturn)
        {
            return;
        }
        try
        {
            const response = await axios.put(data.apiurl + `/api/v1/user/rides/${params.rideid}`,
            {
                availableSeats: passengersnb,
                pricePerSeat: price,
                departureDate: `${date}T${time}`,
                departureRegion: departure.toUpperCase(),
                destinationRegion: arrival.toUpperCase(),
                departureCity: "main city",
                destinationCity: "main city"
            },
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });

            console.log(response);

            if(response.status === 201)
            {
                setSuccess(true);
            }
        }
        catch (err)
        {
            console.log(err);
            if(err.response.data.departureDate === "must be a future date")
            {
                setDateInvalid(true);
            }
            setError(true);
        }
    }

    const getRide = useCallback(async () => {
        try
        {
            var response = await axios.get(data.apiurl + `/api/v1/user/rides/${params.rideid}`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            console.log(response);
            setDeparture(response.data.departureRegion);
            setArrival(response.data.destinationRegion);
            setDate(response.data.departureDate.slice(0, 10));
            setTime(response.data.departureDate.slice(11, 16));
            setPassengersnb(response.data.availableSeats.toString());
            setPrice(response.data.pricePerSeat.toString());
        }
        catch (err)
        {
            console.log(err);
        }
    },[cookies.token, params.rideid]);

    useEffect(() => {
        if(!(cookies.token))
        {
            navigate("/login");
            return;
        }
        getRide();
    }, [cookies.token, navigate, getRide]);

    return (
        <>
            <Navbar />
            <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '28rem',
                mx: 'auto',
                marginTop: '3.1rem'
            }}
            >
                <Typography sx={{margin: 'auto'}} level="title-lg" startDecorator={<EditIcon />}>
                    Edit ride
                </Typography>
                <Divider inset="none" />
                <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                    gap: 1.5,
                }}
                >
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Departure</FormLabel>
                        <Autocomplete color={depInvalid ? "danger" : "neutral"} size="md" options={data.locations} value={departure === "" ? "Sousse" : departure} startDecorator={<LocationSearchingIcon sx={depInvalid ? { color: "#d86d6e" } : {}} />} placeholder="Leaving from" onChange={(event, newValue) => setDeparture(newValue)} required />
                    </FormControl>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Destination</FormLabel>
                        <Autocomplete color={arrivalInvalid ? "danger" : "neutral"} size="md" options={data.locations} value={arrival === "" ? "Sousse" : arrival} startDecorator={<LocationSearchingIcon sx={arrivalInvalid ? { color: "#d86d6e" } : {}} />} placeholder="Going to" onChange={(event, newValue) => setArrival(newValue)} required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Dep. Date</FormLabel>
                        <Input color={dateInvalid ? "danger" : "neutral"} size="md" type="date" value={date === "" ? "" : date} onChange={(event) => setDate(event.target.value)} required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Dep. Time</FormLabel>
                        <Input color={timeInvalid ? "danger" : "neutral"} value={time === "" ? "" : time} onChange={(event) => setTime(event.target.value)} size="md" type="time" required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Number of passengers</FormLabel>
                        <Select size="md" startDecorator={<PersonIcon />} value={passengersnb} onChange={handleChange}>
                            <Option value="1">1 passenger</Option>
                            <Option value="2">2 passengers</Option>
                            <Option value="3">3 passengers</Option>
                            <Option value="4">4 passengers</Option>
                            <Option value="5">5 passengers</Option>
                            <Option value="6">6 passengers</Option>
                            <Option value="7">7 passengers</Option>
                            <Option value="8">8 passengers</Option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Price for a seat</FormLabel>
                        <Input color={priceInvalid ? "danger" : "neutral"} startDecorator={<AttachMoneyIcon />} onChange={(event) => setPrice(event.target.value)} type='number' value={price} placeholder="Price per seat" required />
                    </FormControl>
                    <Divider inset="none" sx={{ gridColumn: '1/-1', marginTop: "0.3rem" }} />
                    <CardActions sx={{ gridColumn: '1/-1', padding: "0rem" }}>
                        <Button variant="solid" sx={{maxWidth: '10rem', margin: 'auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}} onClick={handleSubmit}>
                            Save changes
                        </Button>
                    </CardActions>
                </CardContent>
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
                Changes saved with success.
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
                An error occured when saving changes.
            </Snackbar>
        </>
    );
}
