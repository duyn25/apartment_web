import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
    const [admin, setAdmin] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('tokenAdmin');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setAdmin(decoded);
            } catch (error) {
                console.error("Invalid token", error);
                
               setAdmin(null);
            }
        } else {
            setAdmin(null);
        }
    }, []);

    return admin;
};

export default useAuth;
