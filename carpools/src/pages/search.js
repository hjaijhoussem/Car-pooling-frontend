import React, { useState } from "react";
import { Autocomplete, Box, Stack } from "@mui/joy";
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
import data from "../data.json";
import { useParams } from "react-router-dom";

export function Search()
{

    const params = useParams();

    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState("");
    const [passengersnb, setPassengersnb] = useState(1);

    const [depInvalid, setDepInvalid ] = useState(false);
    const [arrivalInvalid, setArrivalInvalid ] = useState(false);
    const [dateInvalid, setDateInvalid ] = useState(false);

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
    }

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
                            <Autocomplete color={depInvalid ? "danger" : "neutral"} size="lg" options={data.locations} defaultValue={params.departure} sx={{maxWidth: "14rem"}} startDecorator={<LocationSearchingIcon />} placeholder="Leaving from" onChange={(event, newValue) => setDeparture(newValue)} required />
                        </FormControl>
                        <FormControl>
                            <Autocomplete color={arrivalInvalid ? "danger" : "neutral"} size="lg" options={data.locations} defaultValue={params.arrival} sx={{maxWidth: "14rem"}} startDecorator={<LocationSearchingIcon />} placeholder="Going to" onChange={(event, newValue) => setArrival(newValue)} required />
                        </FormControl>
                        <FormControl>
                            <Input color={dateInvalid ? "danger" : "neutral"} size="lg" defaultValue={params.date} type='date' onChange={(event) => setDate(event.target.value)} />
                        </FormControl>
                        <Select size="lg" startDecorator={<PersonIcon />} defaultValue={params.passengersnb ? params.passengersnb : "1"} onChange={handleChange}>
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
        </>
    )
}