import React, { useEffect, useState } from 'react';
import StockDetailForm from '../form/StockDetailForm'; // Import the form component

const MyPortfolio = ({ portfolioItems, modifyStock }) => {
    const [selectedStock, setSelectedStock] = useState(null); // Tracks the selected stock

    const handleRowClick = (stock) => {
        setSelectedStock(stock); // Set the selected stock to show in the form
    };

    useEffect(() => {
        if (selectedStock) {
            // Find the updated data for the selected stock
            const updatedStock = portfolioItems.find(item => item.symbol === selectedStock.symbol);
            if (updatedStock) {
                setSelectedStock(updatedStock);
            }
        }
    }, [portfolioItems]); // Run when portfolioItems changes


    return (
        <div className="flex flex-col bg-zinc-900 p-4 rounded-2xl w-full">
            {
                selectedStock && <div className='absolute h-[100%] w-full inset-0 bg-black opacity-50'></div>
            }
            <div className="flex justify-between items-center">
                <div>My Portfolio</div>
                <div className="flex space-x-2">
                    {['All', 'Gainers', 'Decliners', 'See All'].map((label) => (
                        <button key={label} className="px-2 py-1 bg-gray-700 rounded-full text-sm">{label}</button>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                {portfolioItems && portfolioItems.map(({ symbol, name, quantity, avgOrderPrice, change, currentPrice, industry }) => (
                    <div
                        key={symbol}
                        className="flex md:items-center justify-between py-2 border-b border-gray-700 cursor-pointer"
                        onClick={() => handleRowClick({ symbol, name, quantity, avgOrderPrice, change, currentPrice, industry })}
                    >
                        <div className="flex md:items-center space-x-2 w-[60%]">
                            <div>
                                <div className="font-bold">{name}</div>
                                <div className="md:hidden text-gray-400 text-sm">{quantity}x</div>
                                <div className="hidden md:block text-gray-400 text-sm">{industry}</div>
                            </div>
                        </div>
                        <div className='md:flex'>
                            <div className="hidden md:block text-right w-36">
                                <div className="text-gray-400 text-sm">Quantity</div>
                                <div className="font-bold">{quantity}x</div>
                            </div>
                            <div className="hidden md:block text-right w-36">
                                <div className="text-gray-400 text-sm">Change</div>
                                <div className={change < 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>{change > 0 ? "+" : ""}{change}</div>
                            </div>
                            <div className="text-right w-36">
                                <div className="text-gray-400 text-sm">Amount</div>
                                <div className="font-bold">₹{avgOrderPrice}</div>
                            </div>
                            <div className="text-right w-36">
                                <div className="text-gray-400 text-sm">Current Value</div>
                                <div className='flex items-center justify-end'>
                                    <div className="font-bold">₹{currentPrice}</div>
                                    <div className={change < 0 ? "text-red-500 text-sm md:hidden" : "text-green-500 text-sm md:hidden"}>({change}%)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Display the StockDetailForm if a stock is selected */}
            {selectedStock && <div className='absolute inset-0 flex items-center justify-center'>
                <StockDetailForm stock={selectedStock} setSelectedStock={setSelectedStock} modifyStock={modifyStock} />
            </div>
            }
        </div>
    );
};

export default MyPortfolio;
