import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Thêm isLoading để xử lý trạng thái tải
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid token", error);
                
               setUser(null);
            }
        } else {
            setUser(null);
        }
        setIsLoading(false); // Đặt isLoading thành false sau khi kiểm tra token
    }, []);

    return {user,isLoading};
};

export default useAuth;
