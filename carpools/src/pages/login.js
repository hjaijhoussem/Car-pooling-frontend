import React, { useCallback, useEffect, useState } from "react";
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';
import { FormHelperText } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import data from "../data.json";

export function Login()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const [cookies, setCookies] = useCookies(["token", "MAHCemail"]);

    const navigate = useNavigate();

    const submitHandle = useCallback(async () => {

      let shouldReturn = false;

      setWrongEmail(false);
      setWrongPassword(false);

      setEmptyEmail(false);
      setEmptyPassword(false);

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
      if(shouldReturn)
      {
        return;
      }

      try
      {
        const response = await axios.post(data.apiurl + "/api/v1/auth/authenticate", {
          email,
          password
        });

        console.log(response);

        if(response.data.token)
        {
          setCookies("token", response.data.token);
          setCookies("MAHCemail", email);
          navigate(0);
        }
        else
        {
          alert(response.data.statusCode + " " + response.data.message);
        }
      }
      catch (err)
      {
        if(err.response.data.message === "User not found")
        {
          setWrongEmail(true);
        }
        if(err.response.data.message === "Incorrect password")
        {
          setWrongPassword(true);
        }
      }
    }, [email, password, navigate, setCookies]);

    useEffect(() => {
      if(cookies.token)
      {
        navigate("/");
      }
    },[])

    useEffect(() => {
      const keyDownHandler = event => {
        if (event.key === "Enter" || event.keyCode === 13) {
          event.preventDefault();
          
          submitHandle();
        }
      };
  
      document.addEventListener('keydown', keyDownHandler);
  
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, [submitHandle]);

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
        <Typography sx={{margin: 'auto'}} level="title-lg" startDecorator={<LoginIcon />}>
          Login
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
            <FormLabel>Email</FormLabel>
            <Input color={wrongEmail || emptyEmail ? "danger" : "neutral"} endDecorator={<EmailOutlinedIcon sx={{color: wrongEmail || emptyEmail ? "#c71c1c" : "neutral"}} />}  type='email' onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required />
            <FormHelperText sx={{display: wrongEmail || emptyEmail ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{wrongEmail ? "Email doesn't exist.": "This field is required"}</FormHelperText>
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Password</FormLabel>
            <Input color={wrongPassword || emptyPassword ? "danger" : "neutral"} endDecorator={<PasswordIcon sx={{color: wrongPassword || emptyPassword ? "#c71c1c" : "neutral"}} />} type='password' onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required />
            <FormHelperText sx={{display: wrongPassword || emptyPassword ? "inline" : "none", color: "#c71c1c", marginLeft: "0.7rem"}}>{wrongPassword ? "Incorrect password.": "This field is required"}</FormHelperText>
          </FormControl>
          <Checkbox variant='outlined' label="Remember me" sx={{ gridColumn: '1/-1', my: 1 }} />
          <Divider inset="none" sx={{ gridColumn: '1/-1', marginTop: "-0.3rem" }} />
          <CardActions sx={{ gridColumn: '1/-1', padding: "0rem" }}>
            <Button variant="solid" sx={{maxWidth: '7rem', margin: 'auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}} onClick={submitHandle}>
              Login
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <FormControl>
        <FormHelperText sx={{margin: "auto"}}>Don't have an account yet? <NavLink to = "/signup">Sign up</NavLink></FormHelperText>
      </FormControl>
    </>
  );
}
