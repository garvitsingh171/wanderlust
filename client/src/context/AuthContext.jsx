import { useEffect, useMemo, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService';
import { AuthContext } from './authContextObject';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        async function bootstrapAuth() {
            try {
                const response = await getCurrentUser();
                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setIsCheckingAuth(false);
            }
        }
        bootstrapAuth();
    }, []);

    async function handleLogin(payload) {
        const response = await loginUser(payload);
        setUser(response.data);
        return response;
    }

    async function handleRegister(payload) {
        const response = await registerUser(payload);
        return response;
    }

    async function handleLogout() {
        await logoutUser();
        setUser(null);
    }

    const value = useMemo(() => ({
        user,
        isAuthenticated: Boolean(user),
        isCheckingAuth,
        handleLogin,
        handleRegister,
        handleLogout,
    }), [user, isCheckingAuth]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}