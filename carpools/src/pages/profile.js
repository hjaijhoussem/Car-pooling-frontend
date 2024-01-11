import React, { useCallback, useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { FormHelperText, Snackbar, Stack } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import data from "../data.json";
import { Navbar } from '../components/navbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Profile()
{

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [cin, setCin] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(0);

    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyFirstname, setEmptyFirstname] = useState(false);
    const [emptyLastname, setEmptyLastname] = useState(false);
    const [emptyCin, setEmptyCin] = useState(false);
    const [emptyPhoneNumber, setEmptyPhoneNumber] = useState(false);

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
    const [invalidCin, setInvalidCin] = useState(false);

    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
    const [cinAlreadyExists, setCinAlreadyExists] = useState(false);
    const [phoneNumberAlreadyExists, setPhoneNumberAlreadyExists] = useState(false);

    const [cookies, setCookies, removeCookies] = useCookies(["token"]);

    const navigate = useNavigate()

    function logout()
    {
        removeCookies("token");
        removeCookies("MAHCemail");
        navigate(0);
    };

    const submitHandle = useCallback(async () => {

      let shouldReturn = false;

      setEmptyEmail(false);
      setEmptyFirstname(false);
      setEmptyLastname(false);
      setEmptyCin(false);
      setEmptyPhoneNumber(false);

      setInvalidEmail(false);
      setInvalidCin(false);
      setInvalidPhoneNumber(false);

      setEmailAlreadyExists(false);
      setCinAlreadyExists(false);
      setPhoneNumberAlreadyExists(false);

      if(email === "")
      {
        setEmptyEmail(true);
        shouldReturn = true;
      }
      if(firstname === "")
      {
        setEmptyFirstname(true);
        shouldReturn = true;
      }
      if(lastname === "")
      {
        setEmptyLastname(true);
        shouldReturn = true;
      }
      if(!(cin >= 11111111 && cin <= 99999999))
      {
        if(cin >= 1)
        {
          setInvalidCin(true);
        }
        setEmptyCin(true);
        shouldReturn = true;
      }
      if(!(phoneNumber >= 10000000 && phoneNumber <= 99999999))
      {
        if(phoneNumber >= 1)
        {
          setInvalidPhoneNumber(true);
        }
        setEmptyPhoneNumber(true);
        shouldReturn = true;
      }
      if(shouldReturn)
      {
        return;
      }

      try
      {
        const response = await axios.put(data.apiurl + "/api/v1/account/me", {
          firstname,
          lastname,
          email,
          phoneNumber
        },
        {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        });

        console.log(response);

        if(response)
        {
          setCookies("MAHCemail", email);
          setSuccess(true);
          getInfo();
        }
      }
      catch (err)
      {
        console.log(err);
        if(err.response.data.message === "Email already exists" || err.response.data.statusCode === 409)
        {
          setEmailAlreadyExists(true);
          return;
        }
        if(err.response.status === 400)
        {
          setInvalidEmail(true);
          return;
        }
        if(err.response.data.message === "The CIN you entered is already associated with an existing account")
        {
          setCinAlreadyExists(true);
          return;
        }
        if(err.response.data.message === "The phone number you entered is already registered. Please use a different phone number or log in with the existing one")
        {
          setPhoneNumberAlreadyExists(true);
          return;
        }
        setError(true);
      }
    }, [email, firstname, lastname, cin, phoneNumber, navigate, setCookies]);

    const deleteHandle = useCallback(async () => {
        try
        {
            var response = await axios.delete(data.apiurl + `/api/v1/account/me`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            
            if(response)
            {
                console.log(response);
                logout();
            }
        }
        catch (err)
        {
            console.log(err);
        }
    },[cookies.token])

    const getInfo = useCallback(async () => {
        try
        {
            var response = await axios.get(data.apiurl + `/api/v1/account/me`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            console.log(response);
            setFirstname(response.data.firstname);
            setLastname(response.data.lastname);
            setCin(response.data.cin);
            setPhoneNumber(response.data.phoneNumber);
            setEmail(response.data.email);
        }
        catch (err)
        {
            console.log(err);
        }
    },[cookies.token])

    useEffect(() => {
        if(!(cookies.token))
        {
            navigate("/");
            return;
        }
        getInfo();
    }, [cookies.token, navigate, getInfo]);

    return (
        <>
            <Navbar />
            <Stack direction={"row"} justifyContent={"center"} sx={{mt: "3rem"}}>
                <Typography level = "h1" sx={{color: "#232323"}}>
                    Profile
                </Typography>
            </Stack>
            
            {
                email !== "" ?
                <Stack direction={"row"} spacing={11} justifyContent={"center"} sx={{margin: "1rem"}}>
                    <Stack direction={"column"} spacing={2}>
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '26.07rem',
                            mx: 'auto',
                            marginTop: '5rem'
                        }}
                        >
                            <Typography sx={{margin: 'auto'}} level="title-lg" startDecorator={<EditIcon />}>
                                edit
                            </Typography>
                            <Divider inset="none" />
                            <CardContent
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                            >
                                <FormControl>
                                    <FormLabel>First name</FormLabel>
                                    <Input color={emptyFirstname ? "danger" : "neutral"} value={firstname} onChange={(event) => setFirstname(event.target.value)} type='name' placeholder="Enter your First name" required />
                                    <FormHelperText sx={{display: emptyFirstname ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>This field is required</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input color={emptyLastname ? "danger" : "neutral"} value={lastname} onChange={(event) => setLastname(event.target.value)} type='name' placeholder="Enter your Last Name" required />
                                    <FormHelperText sx={{display: emptyLastname ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>This field is required</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>CIN</FormLabel>
                                    <Input color={emptyCin || cinAlreadyExists ? "danger" : "neutral"} value={cin} onChange={(event) => setCin(event.target.value)} type="tel" placeholder="Enter your ID number" disabled />
                                    <FormHelperText sx={{display: emptyCin ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{invalidCin ? "Invalid CIN": "This field is required"}</FormHelperText>
                                    <FormHelperText sx={{display: cinAlreadyExists ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>CIN already exists</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Phone number</FormLabel>
                                    <Input color={emptyPhoneNumber || phoneNumberAlreadyExists ? "danger" : "neutral"} value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} type='tel' placeholder="Enter your Phone number" required />
                                    <FormHelperText sx={{display: emptyPhoneNumber ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{invalidPhoneNumber ? "Invalid phone number": "This field is required"}</FormHelperText>
                                    <FormHelperText sx={{display: phoneNumberAlreadyExists ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>Phone number already exists</FormHelperText>
                                </FormControl>
                                <FormControl sx={{ gridColumn: '1/-1' }}>
                                    <FormLabel>Email</FormLabel>
                                    <Input color={emailAlreadyExists || emptyEmail || invalidEmail ? "danger" : "neutral"} value={email} onChange={(event) => setEmail(event.target.value)} endDecorator={<EmailOutlinedIcon sx={{color: emailAlreadyExists || emptyEmail || invalidEmail ? "#c71c1c" : "neutral"}} />}  type='email' placeholder="Enter your email" required />
                                    <FormHelperText sx={{display: emailAlreadyExists || emptyEmail ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{emailAlreadyExists ? "Email already exists.": "This field is required"}</FormHelperText>
                                    <FormHelperText sx={{display: invalidEmail ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>Entered email is invalid.</FormHelperText>
                                </FormControl>
                                <Divider inset="none" sx={{ gridColumn: '1/-1', marginTop: "0.3rem" }} />
                                <CardActions sx={{ gridColumn: '1/-1', padding: "0rem" }}>
                                    <Button variant="solid" sx={{maxWidth: '10rem', margin: 'auto 0.7rem auto auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}} onClick={submitHandle}>
                                        Save Changes
                                    </Button>
                                    <Button variant="solid" sx={{maxWidth: '10rem', margin: 'auto auto auto 0.7rem', backgroundColor: '#EA4D4E', "&:hover": {backgroundColor: '#E83F3F'}}} onClick={deleteHandle}>
                                        Delete Account
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Stack>

                </Stack> :
                <Stack direction={"row"} justifyContent={"center"} sx={{mt: "3rem"}}>
                    <Typography level = "h3" sx={{color: "#555555"}}>
                        Loading.
                    </Typography>
                </Stack>
            }
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
    )
}
