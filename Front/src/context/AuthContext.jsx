
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, updateUser } from '../data/user';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const users = getUsers();
            const updatedUser = users.find(u => u.id === user.id);
            if (updatedUser) {
                setCurrentUser(updatedUser);
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };


    const updateCurrentUser = (updatedUserData) => {
        const updated = updateUser({
            ...currentUser,
            ...updatedUserData
        });
        setCurrentUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
        return updated;
    };

    const contextValue = {
        currentUser,
        login,
        logout,
        updateCurrentUser,
        loading
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};