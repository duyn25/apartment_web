import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
const AdminLogin = ({onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [checkInfo, setCheckInfo] = useState(true);
    const navigate = useNavigate();
    const HandleSubmit = async (e) => {
        e.preventDefault();
        onLogin({email,password});
        try {
            const response = await axios.post('http://localhost:5000/admin/login', { email, password });
            if (response.data.success) {
                //console.log(response.data);
                localStorage.setItem('tokenAdmin', response.data.token);
                setStatus(true);
                setCheckInfo(true);
            } else {
                setCheckInfo(false);
            }
        } catch (err) {
            console.log(err);
        }


    }
    useEffect(() => {
        if (status) {
            setTimeout(
                () => navigate("/admin/dashboard"),
                1000
            )

        }
    }, [status, navigate]);
    return (
        // <!-- Login 9 - Bootstrap Brain Component -->
        <>
            <section className="py-3 py-md-5 py-xl-8" style={{ backgroundColor: "#f1e3e3" }}>

                <div className="container">
                    <div className="row gy-4 align-items-center">
                        <div className="col-12 col-md-6 col-xl-7">
                            <div className="d-flex justify-content-center text-bg-primary">
                                <div className="col-12 col-xl-9">
                                    <img className="img-fluid rounded mb-4" loading="lazy" src="../logo.png" width="100px" height="100px" alt="Company Logo" />
                                    <span style={{ fontSize: "larger", color: "white", fontWeight: "bold" }}>Villa Agency</span>
                                    <hr className="border-primary-subtle mb-4" />
                                    <h2 className="h1 mb-4">"An cư lạc nghiệp, vươn tới tương lai."</h2>
                                    <p className="lead mb-5">"Trải nghiệm cuộc sống thượng lưu với căn hộ cao cấp, nơi đẳng cấp và tiện nghi hòa quyện."</p>
                                    <div className="text-endx">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-grip-horizontal" viewBox="0 0 16 16">
                                            <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-5">
                            <div className="card border-0 rounded-4">
                                <div style={{ boxShadow: "0 0 16px white", borderRadius: "20px", overFlow: "hidden" }} className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            {status && (
                                                <div style={{ position: 'absolute', top: '0', transition: 'all 1s ease-in-out', left: '0', right: '0' }} >
                                                    <p style={{ color: "white", backgroundColor: 'var(--main-color)', textAlign: 'center' }}>Login Successfull</p>

                                                </div>
                                            )}
                                            <div className="mb-4">
                                                <h2>Welcome Back , Admin !</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <form method='post' onSubmit={HandleSubmit}>

                                        <div className="row gy-3 overflow-hidden">
                                            <div >
                                                <div >
                                                    <label htmlFor='email'>Email:</label>
                                                    <input type="email" name="email" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div >
                                                <div >
                                                    <label htmlFor='password' >Password :</label>
                                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                                </div>
                                                {!checkInfo && (<div>
                                                    <p style={{ color: "red" }}>Invalid Email or Password</p>
                                                </div>)}
                                            </div>
                                            <div >
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" name="remember_me" id="remember_me" />
                                                    <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                        Keep me logged in
                                                    </label>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="d-grid">
                                                    <button style={{ backgroundColor: "var(--main-color)", border: "none" }} className="btn btn-primary btn-lg" type="submit">Login</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row">
                                        <div >
                                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                                                <a href="#!">Forgot password</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="mt-4 mb-4">Or continue with</p>
                                            <div className="d-flex gap-2 gap-sm-3 justify-content-centerX">
                                                <Link to="#!" className="btn btn-outline-danger bsb-btn-circle bsb-btn-circle-2xl">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                    </svg>
                                                </Link>
                                                <Link to="#!" className="btn btn-outline-primary bsb-btn-circle bsb-btn-circle-2xl">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                    </svg>
                                                </Link>
                                                <Link to="#!" className="btn btn-outline-dark bsb-btn-circle bsb-btn-circle-2xl">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-apple" viewBox="0 0 16 16">
                                                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
};
export default AdminLogin;
