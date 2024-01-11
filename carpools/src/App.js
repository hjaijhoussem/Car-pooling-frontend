import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Offerride } from './pages/offerride';
import { Search } from './pages/search';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import MyRideReqs from './pages/myridereqs';
import { MyRides } from './pages/myrides';
import { CheckReqs } from './pages/checkreqs';
import { EditRide } from './pages/editride';
import Profile from './pages/profile';

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/offerride' element = {<Offerride />} />
        <Route path = '/search'>
          <Route index element = {<Search />} />
          <Route path = ':departure/:arrival/:date/:passengersnb' element = {<Search />} />
        </Route>
        <Route path = '/myridereqs' element = {<MyRideReqs />} />
        <Route path = '/myrides' element = {<MyRides />} />
        <Route path = '/checkreqs/:rideid' element = {<CheckReqs />} />
        <Route path = '/editride/:rideid' element = {<EditRide />} />
        <Route path = '/profile' element = {<Profile />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/signup' element = {<Signup />} />
      </Routes>
    </>
  );
}

export default App;