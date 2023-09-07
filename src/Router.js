// Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Authorization/loginV2'; // Import các components từ các file tương ứng
import Menus from './pages/menu';
import ViewProfile from './pages/MyProfile/ViewProfile/ViewProfile';
import UpdateViewProflie from './pages/MyProfile/EditUser/UpadateProfile'
import ChangePass from './pages/MyProfile/ChangePass/ChangePass';
import UserManager from './pages/UserManagerment/UserManager';
import EditUser from './pages/UserManagerment/EditUserManager';
import Details from './pages/UserManagerment/Details';
import Create from './pages/UserManagerment/Create'
import DevicesManager from './pages/Device/DevicesManager';
import Page_404 from './pages/Page_404/Page_404';
import CreateDevices from './pages/Device/CreateDevices';
import EditDevices from './pages/Device/EditDevices';
import DetailsDevices from './pages/Device/DetailsDevice'
import Test from './pages/Test/Test';
function Router() {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/Menu" element={<Menus />}></Route>

      {/* Router của User, Devices */}
      <Route path="/" element={<Menus />}>
        <Route path="/ViewProfile" element={<ViewProfile />} />
        <Route path="/UpdateProfile/:id" element={<UpdateViewProflie />} />
        <Route path="/ChangePass" element={<ChangePass />} />
        <Route path="/UserManager" element={<UserManager />} />
        <Route path="/EditUser/" element={<EditUser />} />
        <Route path="/Details/:id" element={<Details />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/DevicesManager" element={<DevicesManager />} />
        <Route path="/CreateDevices" element={<CreateDevices />} />
        <Route path="/EditDevices" element={<EditDevices />} />
        <Route path="/DetailsDevices" element={<DetailsDevices />} />
        <Route path="/Test" element={<Test />} />
        <Route path="*" element={<Page_404 />} />
      </Route>
    </Routes>
  );
}

export default Router;
