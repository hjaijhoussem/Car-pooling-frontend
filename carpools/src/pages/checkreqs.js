import { Box, Button, Snackbar, Stack, Table, Typography } from '@mui/joy';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import data from "../data.json";
import { Pagination } from '../components/pagination';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function CheckReqs()
{
    const params = useParams();

    const [reqs, setReqs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reqsPerPage, setReqsPerPage] = useState(4);

    const lastReqIndex = currentPage * reqsPerPage;
    const firstRideIndex = lastReqIndex - reqsPerPage;
    const currentReqs = reqs.slice(firstRideIndex, lastReqIndex);

    const[acceptSuccess, setAcceptSuccess] = useState(false);
    const[acceptError, setAcceptError] = useState(false);
    const[rejectSuccess, setRejectSuccess] = useState(false);
    const[rejectError, setRejectError] = useState(false);

    const [cookies] = useCookies(["token"]);

    const navigate = useNavigate()

    const getReqs = useCallback(async () => {
        try
        {
            var response = await axios.get(data.apiurl + `/api/v1/driver/${params.rideid}/ride_requests`,
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
    },[cookies.token]);

    async function accept(req_id)
    {
        try
        {
            const response = await axios.get(data.apiurl + `/api/v1/driver/${params.rideid}/accept/${req_id}`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });

            console.log(response);

            if(response)
            {
                setAcceptSuccess(true);
                getReqs();
            }
        }
        catch (err)
        {
            console.log(err);
            setAcceptError(true);
        }
    }

    async function reject(req_id)
    {
        try
        {
            const response = await axios.get(data.apiurl + `/api/v1/driver/${params.rideid}/ride_requests/${req_id}/reject`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });

            console.log(response);

            if(response)
            {
                setRejectSuccess(true);
                getReqs();
            }
        }
        catch (err)
        {
            console.log(err);
            setRejectError(true);
        }
    }

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
                        <Table aria-label="basic table" size='lg' sx={{maxWidth: "50rem"}}>
                            <thead>
                                <tr>
                                {/* <th style={{ width: '40%' }}>Dessert (100g serving)</th> */}
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th style={{ width: '10rem' }}>Requested seats</th>
                                <th style={{ width: '10rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentReqs.map((req, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{req.passenger.firstname}</td>
                                                <td>{req.passenger.lastname}</td>
                                                <td>{req.requestedSeats}</td>
                                                <td>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button size="sm" variant="plain" color="success" sx={{display: req.status === "ACCEPTED" || req.status === "REJECTED" ? "none": "inline"}} onClick={() => accept(req.id)}>
                                                        Accept
                                                    </Button>
                                                    <Button size="sm" variant="plain" color="success" sx={{display: req.status === "ACCEPTED" ? "inline": "none"}} disabled>
                                                        Accepted
                                                    </Button>
                                                    <Button size="sm" variant="outlined" color="danger" sx={{display: req.status === "REJECTED" || req.status === "ACCEPTED" ? "none": "inline"}} onClick={() => reject(req.id)}>
                                                        Reject
                                                    </Button>
                                                    <Button size="sm" variant="plain" color="danger" sx={{display: req.status === "REJECTED" ? "inline": "none"}} disabled>
                                                        Rejected
                                                    </Button>
                                                </Box>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
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
            <Snackbar
                sx={{backgroundColor: "#CDEFCF"}}
                autoHideDuration={3000}
                open={acceptSuccess}
                variant={"outlined"}
                startDecorator = {<CheckCircleOutlineIcon color="success" />}
                onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setAcceptSuccess(false);
                }}
            >
                Accepted ride request with success.
            </Snackbar>
            <Snackbar
                sx={{backgroundColor: "#FFDFDF"}}
                autoHideDuration={3000}
                open={acceptError}
                variant={"outlined"}
                startDecorator = {<ErrorOutlineIcon sx={{color: "#c71c1c"}} />}
                onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setAcceptError(false);
                }}
            >
                An error occured when accepting ride request.
            </Snackbar>
            <Snackbar
                sx={{backgroundColor: "#CDEFCF"}}
                autoHideDuration={3000}
                open={rejectSuccess}
                variant={"outlined"}
                startDecorator = {<CheckCircleOutlineIcon color="success" />}
                onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setRejectSuccess(false);
                }}
            >
                Rejected ride request with success.
            </Snackbar>
            <Snackbar
                sx={{backgroundColor: "#FFDFDF"}}
                autoHideDuration={3000}
                open={rejectError}
                variant={"outlined"}
                startDecorator = {<ErrorOutlineIcon sx={{color: "#c71c1c"}} />}
                onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setRejectError(false);
                }}
            >
                An error occured when rejecting ride request.
            </Snackbar>
        </>
    )
}