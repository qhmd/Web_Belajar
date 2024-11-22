import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { checkLoginStatus } = useLogin();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Mengambil status login user saat komponen dimuat
        const loggedInUser = checkLoginStatus();
        setUser(loggedInUser);
    }, [checkLoginStatus]);

    // Menunggu status login user siap
    if (user === null) {
        return null; // Atau bisa menampilkan loading spinner jika perlu
    }

    // Jika user belum login, arahkan ke halaman login
    if (!user) {
        return <Navigate to="/home" replace />;
    }

    // Jika role user tidak sesuai, arahkan ke halaman Unauthorized
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/home" replace />;
    }

    // Jika lolos validasi, render komponen yang diterima melalui children
    return children; // Render komponen anak
};

export default ProtectedRoute;
