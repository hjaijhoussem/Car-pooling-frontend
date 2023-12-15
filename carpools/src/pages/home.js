import { Box } from "@mui/joy";
import React from "react";
import carsbanner from "../images/carsbanner.jpg";
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

export function Home()
{

    // how to get values and handle change of select inputs
    const handleChange = (event, newValue) => {
        // alert(`You chose "${newValue}"`);
    };

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
                maxWidth: '65rem',
                mx: 'auto',
                marginTop: '1rem'
            }}
            >
                <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, minmax(80px, 1fr))',
                    gap: 1.5,
                }}
                >
                    <FormControl>
                        <Input startDecorator={<LocationSearchingIcon />} placeholder="Leaving from" required />
                    </FormControl>
                    <FormControl>
                        <Input startDecorator={<LocationSearchingIcon />} placeholder="Going to" required />
                    </FormControl>
                    <FormControl>
                        <Input type='date' />
                    </FormControl>
                    <Select startDecorator={<PersonIcon />} defaultValue="1" onChange={handleChange}>
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
                        <Button variant="solid" sx={{backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}}>
                            Search
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </>
    )
}
// maybe change the date input to not only day and manth input