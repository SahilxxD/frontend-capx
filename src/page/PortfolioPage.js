import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPortfolio from '../card/MyPortfolio';
import AddForm from '../form/AddForm';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const PorfolioPage = () => {
    const [selectedStock, setSelectedStock] = useState(null); // Tracks the selected stock
    const [isInitialFetchDone, setIsInitialFetchDone] = useState(false); // Flag to track initial data fetch
    const [portfolio, setPortfolio] = useState([]);
    const [portfolioModified, setPortfolioModified] = useState(false);


    const fetchPortfoliodData = async () => {

        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(`${apiUrl}/data/portfolio`, {
            });

            const updatedData = response.data;
            setPortfolio(updatedData);

        } catch (error) {
            console.error('Error fetching portfolio updates:', error);
        }

    };

    const fetchPortfolioUpdates = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        //const apiKey = 'dcf92053eemsh390ddc8ea8d3eep186c66jsn7564972a64b6'; // Replace with your RapidAPI key
        const apiHost = 'apidojo-yahoo-finance-v1.p.rapidapi.com';

        try {
            // Fetch data for all symbols in the portfolio
            const symbols = portfolio.map((stock) => stock.symbol).join(',');
            console.log('symbols', symbols);
            const response = await axios.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-spark`, {
                params: {
                    symbols,
                    interval: '1m',
                    range: '1d',
                },
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost,
                },
            });

            const updatedData = response.data;

            // Map updated data to portfolio
            const updatedPortfolio = portfolio.map((stock) => {
                const updatedStock = updatedData[stock.symbol];
                const closePrice = updatedStock ? (Math.round((updatedStock.close[updatedStock.close.length - 1]) ? updatedStock.close[updatedStock.close.length - 1] : updatedStock.close[updatedStock.close.length - 2])) : stock.price;
                const change = (((closePrice - stock.avgOrderPrice) / stock.avgOrderPrice) * 100).toFixed(2) || stock.change;
                return updatedStock
                    ? {
                        ...stock,
                        currentPrice: closePrice,
                        change: change,
                        // currentPrice: Math.floor((updatedStock.close[updatedStock.close.length - 1]) ? updatedStock.close[updatedStock.close.length - 1] : updatedStock.close[updatedStock.close.length - 2] || stock.price),
                        // change: (((updatedStock.close[updatedStock.close.length - 1] - stock.avgOrderPrice) / stock.avgOrderPrice) * 100).toFixed(2) || stock.change,
                    }
                    : stock;
            });
            setPortfolio(updatedPortfolio);
            console.log(updatedData)
        } catch (error) {
            console.error('Error fetching portfolio updates:', error);
        }
    };



    useEffect(() => {
        // Fetch initial portfolio data once when the component mounts

        const fetchInitialData = async () => {
            console.log("fetching initial data")
            await fetchPortfoliodData();
            setIsInitialFetchDone(true);
        };
        fetchInitialData();
    }, []); // Empty dependency array ensures this useEffect runs only once

    useEffect(() => {
        if (isInitialFetchDone) {
            setPortfolioModified(false);
            // Display loading toast for portfolio updates
            const loadingToastId = toast.loading('Fetching portfolio updates...ᯓ ✈︎', {
                autoClose: false, // Disable auto-close, we will close it manually
                hideProgressBar: true,
                theme: 'dark',
            });

            // Call the function to fetch portfolio updates
            const fetchUpdates = async () => {
                try {
                    await fetchPortfolioUpdates();  // Fetch portfolio updates
                    toast.update(loadingToastId, {
                        render: 'Portfolio updated successfully! 🚀',
                        type: 'success',
                        hideProgressBar: false,
                        autoClose: 2000,
                        isLoading: false,
                    });
                } catch (error) {
                    toast.update(loadingToastId, {
                        render: 'Error updating portfolio! 😞',
                        type: 'error',
                        hideProgressBar: false,
                        autoClose: 2000,
                        isLoading: false,
                    });
                }

            };

            fetchUpdates();

            // Set up an interval to fetch portfolio updates every 1 minute
            const interval = setInterval(fetchUpdates, 60000);

            // Cleanup interval and toast on component unmount
            return () => {
                clearInterval(interval);
                toast.dismiss(loadingToastId); // Dismiss toast when effect is cleaned up
            };
        }
    }, [portfolioModified, isInitialFetchDone]); // This effect will run when isInitialFetchDone is true


    const addStockApi = async (stock, quantity, action) => {
        // Display loading toast
        const addStockToast = toast.loading('Adding Stock...💸', {
            autoClose: false, // Disable auto-close, we will close it manually
            hideProgressBar: true,
            theme: 'dark',
        });
        const apiUrl = process.env.REACT_APP_API_URL;
        console.log("stock is added", stock, quantity, action);
        try {
            const response = await axios.post(`${apiUrl}/portfolio/add`, {
                body: {
                    symbol: stock.symbol,
                    name: stock.name,
                    industry: stock.industry,
                    price: Math.round(stock.price * 100) / 100,
                    quantity: quantity,
                    action: action
                }

            });
            const updatedData = response.data;

            if (updatedData) {

                toast.update(addStockToast, {
                    render: 'Stock added successfully! 🎯',
                    type: 'success',
                    autoClose: 2000,
                    theme: 'dark',
                    hideProgressBar: false,
                    isLoading: false,
                }); // Update loading toast to success
                setPortfolio(updatedData);
                setPortfolioModified(true);
            }
            else {
                setPortfolioModified(true);
                toast.update(addStockToast, {
                    render: 'Error adding stock! 😞',
                    type: 'error',
                    autoClose: 2000,
                    theme: 'dark',
                    hideProgressBar: false,
                    isLoading: false,
                }); // Update loading toast to error
            }

        } catch (error) {
            toast.update(addStockToast, {
                render: 'Error adding stock! 😞',
                type: 'error',
                autoClose: 2000,
                theme: 'dark',
                hideProgressBar: false,
                isLoading: false,
            }); // Update loading toast to error
        } finally {

        }
    };


    const addStockToPortfolio = (stock, quantity, action) => {
        const stockIndex = portfolio.findIndex(item => item.symbol === stock.symbol);

        if (stockIndex !== -1) {
            modifyStock(stock, action, quantity);
        } else {
            if (action === 'Buy') {
                addStockApi(stock, quantity, action);

            } else {
                toast.error("Cannot sell stock you don't own! ✋", {
                    theme: 'dark',
                });
            }
        }
    };

    const modifyStock = async (stock, action, quantity) => {
        // Ensure quantity and action are valid
        if (!quantity || !action || quantity <= 0) {
            toast.error("Please enter a valid quantity and action. 😵", {
                theme: 'dark',
            });
            return;
        }

        // Display loading toast
        const updateStockToast = toast.loading('Updating Stock...💸', {
            autoClose: false, // Disable auto-close, we will close it manually
            hideProgressBar: true,
            theme: 'dark',
        });
        console.log("stock is modified", stock, action, quantity);
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.post(`${apiUrl}/portfolio/update`, {
                body: {
                    symbol: stock.symbol,
                    price: Math.round((stock.currentPrice ? stock.currentPrice : stock.price) * 100) / 100,
                    quantity: quantity,
                    action: action
                }

            });
            const updatedData = response.data;
            setPortfolio(updatedData);

            if (updatedData) {
                setPortfolioModified(true);
                if (action === 'Sell' && quantity === stock.quantity) {
                    console.log(stock.avgOrderPrice, stock.currentPrice);
                    let price = Math.round((stock.currentPrice ? stock.currentPrice : stock.price) * 100) / 100
                    let prevPrice = Math.round((stock.price ? stock.price : stock.avgOrderPrice) * 100) / 100
                    let profit = (price - prevPrice) * quantity;
                    // Conditionally set the toast type based on profit or loss
                    const toastType = profit > 0 ? 'success' : 'warning';

                    toast.update(updateStockToast, {
                        render: profit > 0
                            ? `Stock sold! Profit: ₹${profit} 🤑`
                            : `Stock sold! Loss: ₹${Math.abs(profit)} 🤕`, // Use Math.abs to display a positive loss value

                        type: toastType,
                        autoClose: 2000,
                        theme: 'dark',
                        hideProgressBar: false,
                        isLoading: false,
                    }); // Update loading toast to success
                } else {
                    toast.update(updateStockToast, {
                        render: 'Stock updated successfully! 🎯',
                        type: 'success',
                        autoClose: 2000,
                        theme: 'dark',
                        hideProgressBar: false,
                        isLoading: false,
                    });
                }
                console.log("stock is updated", updatedData);

            }
            else {
                toast.update(updateStockToast, {
                    render: 'Stock is not updated! 😵',
                    type: 'error',
                    autoClose: 2000,
                    theme: 'dark',
                    hideProgressBar: false,
                    isLoading: false,
                });
            }

        } catch (error) {
            toast.update(updateStockToast, {
                render: 'Stock is not updated! 😵',
                type: 'error',
                autoClose: 2000,
                theme: 'dark',
                hideProgressBar: false,
                isLoading: false,
            });
            console.error('Error Modifying Stock:', error);
        }

    };

    return (
        <>
            <ToastContainer />
            <div className="text-white flex flex-col space-y-6 pb-6 w-full">
                {
                    selectedStock && <div className='absolute h-[100%] w-full inset-0 bg-black opacity-50'></div>
                }


                <button className="mx-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full" onClick={() => setSelectedStock(true)}>Add Stock</button>
                {selectedStock && <div className='absolute inset-0 flex items-center justify-center'>
                    <AddForm setSelectedStock={setSelectedStock} addStockToPortfolio={addStockToPortfolio} />
                </div>
                }
                <div className="text-white md:min-h-screen px-4 w-full ">
                    <MyPortfolio portfolioItems={portfolio} modifyStock={modifyStock} />
                    {/* <MyWatchlist /> */}
                </div>
            </div>
        </>
    );
};

export default PorfolioPage;
