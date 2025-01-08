import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AddForm = ({ setSelectedStock, addStockToPortfolio }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [stock, setStock] = useState(null);
    const [isExtended, setIsExtended] = useState(false);
    const [quantity, setQuantity] = useState();
    const [action, setAction] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = process.env.REACT_APP_API_KEY; // Your RapidAPI key
    const BASE_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete'; // Updated endpoint for symbol search

    // Function to fetch stock symbol suggestions
    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    region: 'US',
                    q: query, // Search term
                },
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                },
            });

            setSuggestions(response.data.quotes || []);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes to search for stock symbols
    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length >= 3) {
            fetchSuggestions(value); // Fetch suggestions if the input is long enough
        } else {
            setSuggestions([]);
        }
    };

    // Select a suggestion and fetch detailed stock data
    // Select a suggestion and fetch detailed stock data
    const handleSelectSuggestion = async (suggestion) => {
        const symbol = suggestion.symbol; // Get stock symbol from suggestion
        const name = suggestion.shortname;
        console.log('suggestion', suggestion);

        try {
            // Fetch stock data using Yahoo Finance API
            const response = await axios.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-spark', {
                params: {
                    symbols: symbol,
                    interval: '1m',
                    range: '1d',
                },
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_API_KEY,
                    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                },
            });

            const stockData = response.data[symbol];
            console.log(stockData);
            const currentPrice = stockData ? stockData.close[stockData.close.length - 1] : null;
            const prevDayClose = stockData ? stockData.previousClose : null;
            const changePercent = ((currentPrice - prevDayClose) / prevDayClose) * 100;

            if (currentPrice !== null && changePercent !== null) {
                const selectedStock = {
                    symbol: symbol,
                    name: name,
                    industry: suggestion.industry,
                    type: suggestion.typeDisp,
                    price: currentPrice,
                    change: changePercent.toFixed(2), // Format the percentage change
                };

                setStock(selectedStock);
                console.log('selectedStock', selectedStock);
                setSuggestions([]);
                setSearchTerm('');
            } else {
                toast.error("Failed to fetch stock data. Please try again.", {
                    theme: 'dark',
                });
            }
        } catch (error) {
            toast.error('Error fetching stock data:' + error, {
                theme: 'dark',// Change the theme to dark
            });
        }
    };

    // Handle action (buy or sell)
    const handleActionClick = (actionType) => {
        setAction(actionType);
        setIsExtended(true);
    };

    // Place the order
    const handlePlaceOrder = () => {
        if (quantity > 0 && stock) {
            addStockToPortfolio(stock, quantity, action);
            setIsExtended(false);
            setQuantity(null);
            setAction('');
            setStock(null);
            setSelectedStock(null);
        } else {
            toast.error('Please enter a valid quantity.', {
                theme: 'dark',// Change the theme to dark
            });
        }
    };

    // Close the form without selecting a stock
    const handleClose = () => {
        setStock(null);
        setSelectedStock(null);
    };

    return (
        <div className="flex flex-col bg-black text-white p-6 rounded-2xl w-[90%] md:w-[40%] mx-auto space-y-4">
            {!stock && (
                <div className="grid grid-cols-1">
                    <button onClick={handleClose} className="self-start justify-self-end text-gray-400 hover:text-red-500 mb-2">X</button>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchInput}
                            className="p-2 bg-zinc-800 outline outline-1 outline-gray-400 focus:outline focus:outline-white text-sm text-white rounded-full w-full"
                            placeholder="Search stock symbol..."
                        />
                        {loading && <div className="absolute right-3 top-3 text-gray-400">Loading...</div>}
                        {suggestions.length > 0 && (
                            <ul className="absolute bg-black text-white w-full border border-gray-300 rounded-2xl mt-1 z-10 max-h-48 overflow-y-auto">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-zinc-800 cursor-pointer"
                                        onClick={() => handleSelectSuggestion(suggestion)}
                                    >
                                        {suggestion.name} ({suggestion.symbol})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            {stock && (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{stock.symbol}</h2>
                        <button onClick={handleClose} className="text-gray-400 hover:text-red-500">X</button>
                    </div>
                    {/* <h2 className={stock.change < 0 ? "text-md text-red-500" : "text-md text-green-500"}>₹{stock.price}</h2> */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div><h2 className="text-sm text-gray-400">{stock.industry}</h2></div>
                        <div><h2 className="text-sm text-gray-400">{stock.type}</h2></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-gray-400 text-sm">Price</div>
                            <div className="font-bold">{stock.price}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm">Change</div>
                            <div className={`font-bold ${stock.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {stock.change}%
                            </div>
                        </div>
                    </div>

                    {!isExtended && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button
                                onClick={() => handleActionClick('Buy')}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Buy
                            </button>
                            <button
                                onClick={() => handleActionClick('Sell')}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Sell
                            </button>
                        </div>
                    )}

                    {isExtended && (
                        <div className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="quantity" className="block text-gray-400 text-sm">
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    inputMode="numeric" // Suggest numeric keyboard on mobile
                                    pattern="[0-9]*" // Restrict input to numeric characters
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full p-2 bg-gray-700 text-white rounded-lg mt-1"
                                    placeholder="Enter quantity"
                                />
                            </div>
                            {quantity > 0 && (
                                <div className="text-right">
                                    Total Price: <span className="font-bold">₹{(quantity * stock.price).toFixed(2)}</span>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={handlePlaceOrder}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Place Order
                                </button>
                                <button
                                    onClick={() => setIsExtended(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AddForm;
