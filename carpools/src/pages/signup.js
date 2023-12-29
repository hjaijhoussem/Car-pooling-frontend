import React, { useCallback, useState } from 'react';
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
import PasswordIcon from '@mui/icons-material/Password';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FormHelperText } from '@mui/joy';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import data from "../data.json";

export function Signup()
{

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cin, setCin] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyFirstname, setEmptyFirstname] = useState(false);
  const [emptyLastname, setEmptyLastname] = useState(false);
  const [emptyCin, setEmptyCin] = useState(false);
  const [emptyPhoneNumber, setEmptyPhoneNumber] = useState(false);

  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidCin, setInvalidCin] = useState(false);

  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const [_, setCookies] = useCookies(["token"]);

    const navigate = useNavigate();

    const submitHandle = useCallback(async () => {

      let shouldReturn = false;

      setEmptyEmail(false);
      setEmptyPassword(false);
      setEmptyFirstname(false);
      setEmptyLastname(false);
      setEmptyCin(false);
      setEmptyPhoneNumber(false);

      setInvalidCin(false);
      setInvalidPhoneNumber(false);

      if(email === "")
      {
        setEmptyEmail(true);
        shouldReturn = true;
      }
      if(password === "")
      {
        setEmptyPassword(true);
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
      if(!(phoneNumber >= 11111111 && phoneNumber <= 99999999))
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
        const response = await axios.post(data.apiurl + "/api/v1/auth/register", {
          firstname,
          lastname,
          email,
          password,
          phoneNumber,
          cin
        });

        console.log(response);

        if(response.data.token)
        {
          setCookies("token", response.data.token);
          // window.localStorage.setItem("userID", response.data.userID);
          navigate("/");
        }
      }
      catch (err)
      {
        console.log(err.response.data);
        setEmailAlreadyExists(true);
        // if(err.response.data.message === "Email already exists")
        // {
        //   setEmailAlreadyExists(true);
        // }
      }
    }, [email, password, firstname, lastname, cin, phoneNumber, navigate, setCookies]);

  return (
    <>
      <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '25rem',
        mx: 'auto',
        marginTop: '5rem'
      }}
      >
        <Typography sx={{margin: 'auto'}} level="title-lg" startDecorator={<PersonAddIcon />}>
            Signup
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
                <Input color={emptyFirstname ? "danger" : "neutral"} onChange={(event) => setFirstname(event.target.value)} type='name' placeholder="Enter your First name" required />
                <FormHelperText sx={{display: emptyFirstname ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>This field is required</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input color={emptyLastname ? "danger" : "neutral"} onChange={(event) => setLastname(event.target.value)} type='name' placeholder="Enter your Last Name" required />
                <FormHelperText sx={{display: emptyLastname ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>This field is required</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>ID number / CIN</FormLabel>
                <Input color={emptyCin ? "danger" : "neutral"} onChange={(event) => setCin(event.target.value)} type="tel" placeholder="Enter your ID number" required />
                <FormHelperText sx={{display: emptyCin ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{invalidCin ? "Invalid ID number": "This field is required"}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Phone number</FormLabel>
                <Input color={emptyPhoneNumber ? "danger" : "neutral"} onChange={(event) => setPhoneNumber(event.target.value)} type='tel' placeholder="Enter your Phone number" required />
                <FormHelperText sx={{display: emptyPhoneNumber ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{invalidPhoneNumber ? "Invalid phone number": "This field is required"}</FormHelperText>
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Email</FormLabel>
                <Input color={emailAlreadyExists || emptyEmail ? "danger" : "neutral"} onChange={(event) => setEmail(event.target.value)} endDecorator={<EmailOutlinedIcon sx={{color: emailAlreadyExists || emptyEmail ? "#c71c1c" : "neutral"}} />}  type='email' placeholder="Enter your email" required />
                <FormHelperText sx={{display: emailAlreadyExists || emptyEmail ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{emailAlreadyExists ? "Email already exists.": "This field is required"}</FormHelperText>
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Password</FormLabel>
                <Input color={emptyPassword ? "danger" : "neutral"} onChange={(event) => setPassword(event.target.value)} endDecorator={<PasswordIcon sx={{color: emptyPassword ? "#c71c1c" : "neutral"}} />} type='password' placeholder="Enter your password" required />
                <FormHelperText sx={{display: emptyPassword ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>This field is required</FormHelperText>
            </FormControl>
            <Divider inset="none" sx={{ gridColumn: '1/-1', marginTop: "0.3rem" }} />
            <CardActions sx={{ gridColumn: '1/-1', padding: "0rem" }}>
                <Button variant="solid" sx={{maxWidth: '7rem', margin: 'auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}} onClick={submitHandle}>
                    Signup
                </Button>
            </CardActions>
        </CardContent>
      </Card>
      <FormControl>
        <FormHelperText sx={{margin: "auto", padding: "1rem"}}>By signing up you agree to our <NavLink to = "/termsandconditions">Terms and conditions</NavLink></FormHelperText>
      </FormControl>
    </>
  );
}
