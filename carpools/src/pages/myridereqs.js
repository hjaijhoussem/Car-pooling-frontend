import { Stack, Typography } from '@mui/joy';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import data from "../data.json";
import { Pagination } from '../components/pagination';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { RideReq } from '../components/ridereq';

export default function MyRideReqs()
{

    const [reqs, setReqs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reqsPerPage, setReqsPerPage] = useState(4);

    const lastReqIndex = currentPage * reqsPerPage;
    const firstRideIndex = lastReqIndex - reqsPerPage;
    const currentReqs = reqs.slice(firstRideIndex, lastReqIndex);

    const [cookies] = useCookies(["token"]);

    const navigate = useNavigate()

    const getReqs = useCallback(async () => {
        try
        {
            var response = await axios.get(data.apiurl + `/api/v1/passenger/ride_requests`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            console.log(response);
            setReqs(response.data);
        }
        catch (err)
        {
            console.log(err);
        }
    },[cookies.token])

    useEffect(() => {
        if(!(cookies.token))
        {
            navigate("/login");
            return;
        }
        getReqs();
    }, [cookies.token, navigate, getReqs]);

    return (
        <>
            <Stack direction={"row"} justifyContent={"center"} sx={{mt: "3rem"}}>
                <Typography level = "h1" sx={{color: "#232323"}}>
                    Ride requests
                </Typography>
            </Stack>
            
            {
                reqs.length > 0 ?
                <Stack direction={"row"} spacing={11} justifyContent={"center"} sx={{margin: "1rem"}}>
                    <Stack direction={"column"} spacing={2}>
                        {
                            currentReqs.map((req, index) => {
                                return(
                                    <RideReq
                                        key = {index}
                                        req_id = {req.id}
                                        ride_id = {req.ride.id}
                                        driver_id = {req.ride.driver.firstname + " " + req.ride.driver.lastname}
                                        available_seats = {req.ride.availableSeats}
                                        departure_time = {req.ride.departureDate.slice(11, 16)}
                                        departure_date = {req.ride.departureDate.slice(0, 10)}
                                        price_per_seat = {req.ride.pricePerSeat}
                                        departure_city = {req.ride.departureCity}
                                        departure_region = {req.ride.departureRegion}
                                        destination_city = {req.ride.destinationCity}
                                        destination_region = {req.ride.destinationRegion}
                                        status = {req.status}
                                        review = {4.7}
                                        getReqs = {getReqs}
                                    />
                                )
                            })
                        }
                        <Pagination
                            totalRides={reqs.length}
                            ridesPerPage={reqsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </Stack>

                </Stack> :
                <Stack direction={"row"} justifyContent={"center"} sx={{mt: "3rem"}}>
                    <Typography level = "h3" sx={{color: "#555555"}}>
                        No ride requests have been made.
                    </Typography>
                </Stack>
            }
        </>
    )
}
