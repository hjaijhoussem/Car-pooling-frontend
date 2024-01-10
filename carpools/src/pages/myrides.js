import React, { useCallback, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/joy";
import data from "../data.json";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/pagination";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Ride } from "../components/ride";
import { Navbar } from '../components/navbar';

export function MyRides()
{

    const [rides, setRides] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ridesPerPage, setRidesPerPage] = useState(4);

    const lastRideIndex = currentPage * ridesPerPage;
    const firstRideIndex = lastRideIndex - ridesPerPage;
    const currentRides = rides.slice(firstRideIndex, lastRideIndex);

    const [cookies] = useCookies(["token"]);

    const navigate = useNavigate()

    const getRides = useCallback(async () => {
        try
        {
            var response = await axios.get(data.apiurl + `/api/v1/user/rides?driverId=${19}`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            console.log(response);
            setRides(response.data);
        }
        catch (err)
        {
            console.log(err);
        }
    },[cookies.token]);

    useEffect(() => {
        if(!(cookies.token))
        {
            navigate("/login");
            return;
        }
        getRides();
    }, [cookies.token, navigate, getRides]);

    return(
        <>
            <Navbar />
            <Stack direction={"row"} justifyContent={"center"} sx={{mt: "3rem"}}>
                <Typography level = "h1" sx={{color: "#232323"}}>
                    Rides offered
                </Typography>
            </Stack>

            {
                rides.length > 0 ?
                <Stack direction={"row"} spacing={11} justifyContent={"center"} sx={{margin: "1rem"}}>
                    
                    <Stack direction={"column"} spacing={2}>
                        {
                            currentRides.map((ride, index) => {
                                return(
                                    <Ride
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
                <Stack direction={"row"} justifyContent={"center"} sx={{mt: "3rem"}}>
                    <Typography level = "h3" sx={{color: "#555555"}}>
                        No ride offers were made.
                    </Typography>
                </Stack>
            }
        </>
    )
}