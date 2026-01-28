import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL:`https://local-market-server.vercel.app`,
})

const UseAxiosSecure = () => {
    const { user } = UseAuth();
    const [isTokenSet, setIsTokenSet] = useState(false);

    useEffect(() => {
        const setupInterceptor = async () => {
            if (user?.email) {
                try {
                    // Get Firebase ID token
                    const token = await user.getIdToken(true); // Force refresh
                    axiosSecure.interceptors.request.clear();
                    axiosSecure.interceptors.request.use((config) => {
                        config.headers.Authorization = `Bearer ${token}`;
                        return config;
                    }, (error) => {
                        return Promise.reject(error);
                    });
                    setIsTokenSet(true);
                } catch (error) {
                    console.error('Error getting token:', error);
                    setIsTokenSet(false);
                }
            } else {
                axiosSecure.interceptors.request.clear();
                setIsTokenSet(false);
            }
        };

        setupInterceptor();
    }, [user]);

    return axiosSecure;
};

export default UseAxiosSecure;