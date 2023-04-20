import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users"
import Home from "./pages/home/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/customers/Customers"
import Devices from "./pages/devices/Devices"
import SmartHome from "./pages/smarthome/SmartHome";
import SmartFarm from "./pages/smartfarm/SmartFarm";
import Analytics from "./pages/analytics/Analytics";
import Profile from "./pages/profile/Profile";
import UserDevices from "./pages/user-devices/UserDevices";

function App() {
  return (
    <div className="App">
      <BrowserRouter>     
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <Routes>
          <Route path='/login' exact element={<Login/>} />
          {/* <Route path="my-devices/:id" element={<Home/>} /> */}
          <Route path='users' element={<Users/>} />
          <Route path='customers' element={<Customers/>} />
          <Route path='devices' element={<Devices/>} />
          <Route path=':id/smartfarm' element={<SmartFarm/>} />
          <Route path=':id/smarthome' element={<SmartHome/>} />
          <Route path=':id/analytics' element={<Analytics/>} />
          <Route path=':id/profile' element={<Profile/>} />
          <Route path='my-devices' element={<UserDevices/>} />
  
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
