import React from 'react';
import '../../css/AlertLogout.css';

const AlertLogout = ({ onClose }) => {
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    
    return (
        <div className="alert-logout-container">
            <div className="alert-logout-box">
                <h3>Bạn có chắc muốn đăng xuất?</h3>
                <p>Thông tin của bạn sẽ không còn được lưu và bạn sẽ phải đăng nhập vào lần tới ...</p>
                <div className="alert-logout-buttons">
                    <button className="alert-logout-button logout" onClick={logout}>Đăng xuất</button>
                    <button className="alert-logout-button cancel" onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default AlertLogout;
