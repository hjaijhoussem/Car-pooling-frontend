import React from 'react';
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
import { NavLink } from 'react-router-dom';

export function Signup() {
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
                <Input type='name' placeholder="Enter your First name" required />
            </FormControl>
            <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type='name' placeholder="Enter your Last Name" required />
            </FormControl>
            <FormControl>
                <FormLabel>ID number / CIN</FormLabel>
                <Input type="text" placeholder="Enter your ID number" required />
            </FormControl>
            <FormControl>
                <FormLabel>Phone number</FormLabel>
                <Input type='tel' placeholder="Enter your Phone number" required />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Email</FormLabel>
                <Input endDecorator={<EmailOutlinedIcon />}  type='email' placeholder="Enter your email" required />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Password</FormLabel>
                <Input endDecorator={<PasswordIcon />} type='password' placeholder="Enter your password" required />
            </FormControl>
            <Divider inset="none" sx={{ gridColumn: '1/-1', marginTop: "0.3rem" }} />
            <CardActions sx={{ gridColumn: '1/-1', padding: "0rem" }}>
                <Button variant="solid" sx={{maxWidth: '7rem', margin: 'auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}}>
                    Signup
                </Button>
            </CardActions>
        </CardContent>
      </Card>
      <FormControl>
        <FormHelperText sx={{margin: "auto", padding: "1rem"}}>By signing up you agree to our <NavLink to = "/signup">Terms and conditions</NavLink></FormHelperText>
      </FormControl>
    </>
  );
}
