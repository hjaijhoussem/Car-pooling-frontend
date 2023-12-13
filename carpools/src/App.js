import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { Offerride } from './pages/offerride';
import { Search } from './pages/search';
import { Login } from './pages/login';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/offerride' element = {<Offerride />} />
        <Route path = '/search' element = {<Search />} />
        <Route path = '/login' element = {<Login />} />
      </Routes>
    </>
  );
}

export default App;
