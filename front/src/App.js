import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register/register.jsx';
import Home from './Pages/Home/home.jsx';
import Profile from './Pages/Profile/profile.jsx';
import Login from './Pages/Login/login.jsx';
 

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>

        </BrowserRouter>
      </div>
    </>
  )
}

export default App
