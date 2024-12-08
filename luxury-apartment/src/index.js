import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/User/layout";
import Home from "./pages/User/home";
import ListApartments from "./pages/User/ListApartments";
import DetailsApartment from "./pages/User/DetailApartment";
import Contact from "./components/User/Contact";
import LoginForm from './components/User/LoginForm';
import RegisterForm from './components/User/RegisterForm';
import AdminLogin from './components/Admin/Login';
import LayoutAdmin from './pages/Admin/Layout';
import AdminApartment from './pages/Admin/ListApartment';
import AdminDetailApartment from './pages/Admin/DetailsApartment';
import Dashboard from './pages/Admin/Dashboard';
import './index.css';
import './js/loader';
import reportWebVitals from './reportWebVitals';
import ScheduleForm from './components/User/ScheduleForm';




export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list-apartments" element={< ListApartments />} />
          <Route path="detail-apartments/:id" element={< DetailsApartment />} />
          <Route path="contact" element={<Contact />} />
          <Route path="searching" element={<ListApartments />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="schedule" element={<ScheduleForm />} />
        </Route>
        <Route path='admin/login' element={<AdminLogin />} />
        <Route path='admin' element={<LayoutAdmin/>}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='apartment' element={<AdminApartment />} />
          <Route path='apartment/:id' element={<AdminDetailApartment />} />        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
