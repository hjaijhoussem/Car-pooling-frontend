import * as React from 'react';
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

export function Login() {
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
            <Input endDecorator={<EmailOutlinedIcon />}  type='email' placeholder="Enter your email" required />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Password</FormLabel>
            <Input endDecorator={<PasswordIcon />} type='password' placeholder="Enter your password" required />
          </FormControl>
          <Checkbox variant='outlined' label="Remember me" sx={{ gridColumn: '1/-1', my: 1 }} />
          <Divider inset="none" sx={{ gridColumn: '1/-1', marginTop: "0rem", marginBottom: "-0.5rem" }} />
          <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" sx={{maxWidth: '7rem', margin: 'auto', backgroundColor: '#00A9FF', "&:hover": {backgroundColor: '#0099FF'}}}>
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
