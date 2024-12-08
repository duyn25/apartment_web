import React, { useState,useEffect } from 'react';
import '../../css/Registerform.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkResult, setCheckResult] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Xử lý đăng ký
        //console.log('Registering with:', name, email, password);
        if (password !== confirmPassword) {
            setCheckPassword(false);
        } else {
            setCheckPassword(true);
            try {
                const response = await axios.post("http://localhost:5000/register", { name, email, password });
                if (response.data.result === 'false') {
                    setCheckEmail(true);
                } else {
                    setCheckResult(true);
                    
                }
            } catch (error) {
                console.log("Error :", error);
            }
        }

    };
    // Giả sử bạn sẽ đặt checkResult thành true khi đăng ký thành công
    useEffect(() => {
        if (checkResult) {
            const timer = setTimeout(() => {
                setCheckResult(false);
                navigate('/login')
            }, 1000); // 1000ms = 1s

            // Xóa bộ đếm thời gian khi component bị unmount hoặc checkResult thay đổi
            return () => clearTimeout(timer);
        }
    }, [checkResult,navigate]);
    const goBack=()=>{
        navigate(-1);
    }
    return (
        <section className='register-form'>
            <div className='form-container'>
                {checkResult && (
                    <div className='success-message'>
                        Đăng ký thành công !!!
                    </div>
                )}
                <form method='post' onSubmit={handleSubmit}>
                    <i className="fa-solid fa-delete-left back-icon" onClick={goBack}></i>
                    <div className='box-name'>
                        <img className='logo' src='../logo.png' alt='Logo' />
                        <span className='agency-name'>Villa Agency</span>
                    </div>
                    <h2 className='form-title'>Sign up</h2>
                    <div className='box-info'>
                        <label className='label'>Your name:</label>
                        <input type='text' required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='box-info'>
                        <label className='label'>Email:</label>
                        <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        {checkEmail && (
                            <div className='error-message'>
                                Email đã được đăng ký
                            </div>
                        )}
                    </div>
                    <div className='box-info'>
                        <label className='label'>Password:</label>
                        <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='box-info'>
                        <label className='label'>Confirm Password:</label>
                        <input type='password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {!checkPassword && (
                            <div className='error-message'>
                                Mật khẩu xác nhận không trùng khớp
                            </div>
                        )}
                    </div>
                    <div className='box-button'>
                        <button type='submit' className='submit-button'>Sign up</button>
                        <div className='box-help'>
                        <span>Did have account ? </span>
                        <Link to='/login'>Login</Link>
                    </div>
                    </div>
                    
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;