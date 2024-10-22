// src/App.js
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Dashboard } from './DashboardApp/layouts/index';
import  Homepage  from './HomePage/MainHomepage';
import Login from './Login/login';
import Signup from './Login/Signup';
import PrivateRoute from './PrivateRoute';
import AuthService from './authService';
import { AuthProvider } from './context/AuthContext';
import RoleSelector from './Login/role';
import StreamingApp from './DashboardApp/pages/dashboard/LiveStreaming';
import { Courseplay } from './DashboardApp/pages/dashboard/Coursepage';
import { Projectplay } from './DashboardApp/pages/dashboard/Projectpage';
import LiveApp from './LiveApp/App';
import LiveAppStream from './LiveApp';
// import CheckoutForm from './HomePage/loggedin_page/Courses-section/paycard';

function App() {
  const location = useLocation();

  // useEffect(() => {
  //   if (!location.pathname.startsWith('/dashboard')) {
  //     AuthService.logout();
  //   }
  // }, [location]);
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/role" element={<RoleSelector />} />
      <Route path="/course/:courseid" element={<Courseplay />} />
      <Route path="/project/:projectid" element={<Projectplay />} />   
      <Route path="/dashboard/*" element={<PrivateRoute />}>
        <Route path="*" element={<Dashboard />} />
      </Route>
      <Route path="/streaming/:roomid/:userid/:username" element={<StreamingApp />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/liveapp" element={<LiveAppStream />} />
      {/* <Route path="/pay" element={<CheckoutForm />} /> */}
    </Routes>
    </AuthProvider>
    
  );
}

export default App;

    // "start": "concurrently \"npm run start-react\" \"npm run start-django\"",
    // "start-react": "react-scripts start",
    // "start-django": "cd ../django_backend && python manage.py runserver",
