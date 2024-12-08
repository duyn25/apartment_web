import { Outlet, Link } from "react-router-dom";
import adminAuth from '../../hooks/adminAuth';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Layout = () => {
    const admin = adminAuth();
    console.log('Current user :', admin);
    // console.log(admin.adminId);
    //localStorage.removeItem('tokenAdmin');
    const [adminAccount, setAdminAccount] = useState();
    useEffect(() => {
        async function getAdminAccount() {
            if (admin) {
                try {
                    const response = await axios.get(`http://localhost:5000/admin/${admin.adminId}`);
                    if (response.data) {
                        setAdminAccount(response.data);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getAdminAccount();
    }, [admin]);
    if (!admin) {
        return (
            <>
                <div style={{ position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', display: 'flex', justifyContent: 'center', backgroundColor: '#9d9de7', paddingTop: '100px' }}>
                    <div style={{ width: '500px', borderRadius: '20px', backgroundColor: 'white', boxShadow: '0 0 10px white', height: 'max-content', padding: '20px' }}>
                        <h2 style={{ textAlign: 'center' }}>Bạn phải đăng nhập để thực hiện chức năng quản trị !!!</h2>
                        <div style={{ textAlign: "center" }}>
                            <Link to='../admin/login'>
                                <button style={{ border: 'none', padding: '5px 20px', borderRadius: '10px', backgroundColor: 'green', color: 'white' }}>Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <header style={{ backgroundColor: '#d2dae1', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className="navbar-dark sticky-top  flex-md-nowrap p-0 shadow">
                <div>
                    <Link style={{ fontSize: '16px' }} className="navbar-brand ol-md-3 col-lg-2 me-0 px-3" to="/admin/dashboard">
                        <img src='../../logo.png' style={{ width: '80px', marginRight: '10px' }} alt='Company logo'></img>
                        Villa Agency
                    </Link>
                    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div style={{ width: '50%' }}>
                    <input className="form-control form-control-dark w-100" type="text" placeholder="Type to search..." aria-label="Search" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 'large', cursor: 'pointer' }}>
                    <div>
                        <i style={{ margin: '0 10px' }} className="fa-solid fa-bell"></i>
                        <span style={{ margin: '0 10px' }}>
                            <i style={{ margin: '0 10px' }} className="fa-solid fa-earth-americas"></i>
                            English
                        </span>
                    </div>
                    {adminAccount && (
                        <div>
                            <img src={adminAccount.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></img>
                            <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{adminAccount.name}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column" style={{ fontSize: 'small' }}>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className=" active" aria-current="page" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file" aria-hidden="true"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                        Bookings
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="apartment">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                        Products
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                        Customers
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                        Reports
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                        Integrations
                                    </Link>
                                </li>
                            </ul>

                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Saved reports</span>
                                <Link style={{ fontSize: '16px' }} className="link-secondar" to="#" aria-label="Add a new report">
                                    <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                </Link>
                            </h6>
                            <ul className="nav flex-column mb-2">
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        Current month
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        Last quarter
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        Social engagement
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                    <Link style={{ fontSize: '16px' }} className="" to="#">
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        Year-end sale
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
};
export default Layout;