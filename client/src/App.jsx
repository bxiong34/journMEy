import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Map from './pages/Map';

function App() {
//  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        <Route path='/map' element={<Map />} />
      { /* {isLoggedIn ? <Route path='/account' element={<Account />} /> : null} */ }
      </Routes>
    </div>
  );
}

export default App;