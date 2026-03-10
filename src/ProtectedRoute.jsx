import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getUserProfile } from './database';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        if (user && !loading) {
            getUserProfile(user.id)
                .then(profile => {
                    setUserProfile(profile);
                    setProfileLoading(false);
                })
                .catch(() => {
                    setProfileLoading(false);
                });
        } else if (!loading) {
            setProfileLoading(false);
        }
    }, [user, loading]);

    if (loading || profileLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/profile" replace />;
    }

    if (adminOnly && userProfile?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;