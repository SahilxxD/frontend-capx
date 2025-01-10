import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyTransactions from '../card/History';
import { ToastContainer, toast } from 'react-toastify';
import { formatDistanceToNow, addHours } from 'date-fns';
import 'react-toastify/dist/ReactToastify.css';


const HistoryPage = () => {
    const [portfolio, setPortfolio] = useState([]);


    const fetchPortfoliodData = async () => {

        // Display loading toast for portfolio updates
        const loadingToastId = toast.loading('Fetching transaction updates...ᯓ ✈︎', {
            autoClose: false, // Disable auto-close, we will close it manually
            hideProgressBar: true,
            theme: 'dark',
        });
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(`https://${apiUrl}/data/history`, {
            });

            const updatedData = response.data;
            if (updatedData) {
                const updatedPortfolio = updatedData.map((item) => {
                    const givenDate = new Date(item.date);
                    const istDate = addHours(givenDate, 5.5);
                    // Calculate the difference using date-fns
                    const diffInWords = formatDistanceToNow(istDate, { addSuffix: true })
                    console.log(diffInWords);
                    // Return the updated item with the new 'date' field
                    return {
                        ...item,
                        diffInWords // Update the date field with the calculated difference
                    };

                }).sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    console.log('Comparing:', dateA, dateB); // Debugging line to check sorting
                    return dateB - dateA; // Sorting using the original Date objects
                });
                toast.update(loadingToastId, {
                    render: 'Transaction updated successfully! 🚀',
                    type: 'success',
                    hideProgressBar: false,
                    autoClose: 2000,
                    isLoading: false,
                });
                setPortfolio(updatedPortfolio);
            }


        } catch (error) {
            console.error('Error fetching portfolio updates:', error);
            toast.update(loadingToastId, {
                render: 'Error updating transactions! 😞',
                type: 'error',
                hideProgressBar: false,
                autoClose: 2000,
                isLoading: false,
            });
        }
    };

    useEffect(() => {
        // Fetch initial portfolio data once when the component mounts

        const fetchInitialData = async () => {

            console.log("fetching initial data")
            await fetchPortfoliodData();

        };
        fetchInitialData();
    }, []); // Empty dependency array ensures this useEffect runs only once


    return (
        <>
            <ToastContainer />
            <div className="text-white min-h-full md:min-h-screen w-full">
                <div className='px-4 space-y-6'>
                    <MyTransactions data={portfolio} />
                </div>
            </div>
        </>
    );
};

export default HistoryPage;
