// src/pages/layout.js
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import '../../css/home.css';
import '../../css/flex-slider.css';
import axios from 'axios';
import Access from '../../components/User/Access';
import Account from '../../components/User/Account';
import useAuth from '../../hooks/useAuth';

const Layout = () => {
    const [isLogin, setLogin] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const [infoUser , setInfoUser] = useState();
    const handleLinkClick = (path) => {
        setActiveLink(path);
    };
    const {user ,isLoading} = useAuth();
    console.log("Current user",user);
    useEffect(() => {
        if(user){
            console.log("User found",user);
            setLogin(true);
            const  getUser = async ()=> {
                try{
                    const response = await axios.get(`http://localhost:5000/user/${user.userId}`);
                    setInfoUser(response.data);
                    console.log(response.data);
                }catch(err){
                    console.log(err);
                }
            }
            getUser();
        }else{
            setLogin(false);
        }
    },[user]);
    if (isLoading) {
        return <p>Loading...</p>; // Hiển thị trạng thái tải khi isLoading là true
    }
    return (
        <>
            {/* <!-- ***** Preloader Start ***** --> */}
            <div id="js-preloader" className="js-preloader">
                <div className="preloader-inner">
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            {/* <!-- ***** Preloader End ***** --> */}

            <div className="sub-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <ul className="info">
                                <li><i className="fa fa-envelope"></i> info@villaagency6868.com</li>
                                <li><i className="fa fa-map"></i> Sunny Isles Beach, FL 33160</li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <ul className="social-links">
                                <li><Link to="#"><i className="fab fa-facebook"></i></Link></li>
                                <li><Link to="https://x.com/minthu" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-linkedin"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ***** Header Area Start ***** --> */}
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* <!-- ***** Logo Start ***** --> */}
                                <Link to="/" className="logo">
                                    <img src='../logo.png' alt="Logo" title='Villa Agency' style={{ width: '100px', height: '100px' }} />
                                </Link>
                                {/* <!-- ***** Logo End ***** --> */}
                                {/* <!-- ***** Menu Start ***** --> */}
                                <ul className="nav">
                                    <li>
                                        <Link
                                            to="/"
                                            className={`option ${activeLink === '/' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/')}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/list-apartments"
                                            className={`option ${activeLink === '/list-apartments' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/list-apartments')}
                                        >
                                            Properties
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/detail-apartments/:id"
                                            className={`option ${activeLink === '/detail-apartments/:id' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/detail-apartments/:id')}
                                        >
                                            Property Details
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/contact"
                                            className={`option ${activeLink === '/contact' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/contact')}
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/schedule"
                                            className={`option ${activeLink === '/schedule' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/schedule')}
                                        >
                                            <i className="fa fa-calendar"></i> Schedule a visit
                                        </Link>
                                    </li>

                                </ul>
                                {/* <!-- ***** Menu End ***** --> */}
                                {isLogin ? (<Account infoUser={infoUser}/>) : (<Access />)}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- ***** Header Area End ***** --> */}
            <Outlet />

            <footer>
                <p>Design by Group1</p>
            </footer>

        </>
    );
};

export default Layout;