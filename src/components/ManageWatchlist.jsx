import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UseAuth from '../Hooks/UseAuth';
import { FiStar, FiPlus, FiTrash2, FiAlertTriangle, FiShoppingBag, FiCalendar,  } from 'react-icons/fi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ManageWatchlist = () => {
    const { user } = UseAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://local-market-server.vercel.app/watchlist?email=${user?.email}`);
                const data = await res.json();
                setWatchlist(data);
            } catch (err) {
                toast.error('Failed to load watchlist');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchWatchlist();
        }
    }, [user?.email]);

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Removal',
            message: 'Are you sure you want to remove this item from your watchlist?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const res = await fetch(`https://local-market-server.vercel.app/watchlist/${id}`, {
                                method: 'DELETE',
                            });

                            if (res.ok) {
                                toast.success('Removed from watchlist');
                                setWatchlist(watchlist.filter(item => item._id !== id));
                            } else {
                                throw new Error('Delete failed');
                            }
                        } catch (err) {
                            toast.error('Failed to remove item');
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FiStar className="text-yellow-500 text-2xl" />
                            <h1 className="text-2xl font-semibold text-gray-800">Your Watchlist</h1>
                        </div>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                            {watchlist.length} items
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1">Track and manage your favorite products</p>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                    {watchlist.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <FiStar className="text-gray-400 text-2xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Your watchlist is empty</h3>
                            <p className="text-gray-500 mt-1 mb-4">Start adding products to track their prices</p>
                            <button
                                onClick={() => navigate('/allproduct')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                            >
                                <FiPlus /> Browse Products
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Market
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date Added
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {watchlist.map(item => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <FiShoppingBag className="text-green-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                                                        <div className="text-sm text-gray-500">{item.category || 'General'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {/* <FiStore className="text-gray-400 mr-2" /> */}
                                                    <span className="text-sm text-gray-900">{item.marketName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiCalendar className="text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => navigate('/allproduct')}
                                                        className="inline-flex items-center gap-1 px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600"
                                                    >
                                                        <FiPlus size={14} /> Add More
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                    >
                                                        <FiTrash2 size={14} /> Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageWatchlist;