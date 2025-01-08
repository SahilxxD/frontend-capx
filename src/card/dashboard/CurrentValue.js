import React from 'react';
import { useNavigate } from 'react-router-dom';


const CurrentValue = ({ combinePortfolioData }) => {
    const navigate = useNavigate();

    const handleSeeDetails = () => {
        navigate('/portfolio'); // Navigate to the Portfolio page
    };
    return (
        <div className="flex-1 bg-zinc-900 p-4 rounded-2xl  max-w-lg">
            <div className="">Current Value</div>
            <div className='flex flex-cols-2 justify-between items-center mt-4 p-6 bg-zinc-700/30 rounded-2xl'>

                <div className=''>

                    <div className=''>
                        <div className="text-4xl font-bold"><span className="text-lg">₹ </span>{combinePortfolioData && (combinePortfolioData.currentPrice ? combinePortfolioData.currentPrice : 0)}</div>
                        <div className={(combinePortfolioData && combinePortfolioData.change) < 0 ? "text-red-500 pt-2" : "text-green-500 pt-2"}>{combinePortfolioData && (combinePortfolioData.currentPrice - combinePortfolioData.avgOrderPrice)} ({(combinePortfolioData && combinePortfolioData.change) > 0 ? "+" : ""}{combinePortfolioData && combinePortfolioData.change}%)</div>
                    </div>
                </div>
                <div>
                    <button className="px-4 py-1 outline outline-1 rounded-full" onClick={handleSeeDetails}>See Details</button>
                </div>
            </div>
            <div className="mt-4 text-gray-400">Invested Value</div>
            <div className='flex flex-cols-2 justify-between items-center'>
                <div className="text-2xl font-bold">{(combinePortfolioData && (combinePortfolioData.avgOrderPrice ? combinePortfolioData.avgOrderPrice : 0))}</div>
                <div className={(combinePortfolioData && combinePortfolioData.change) < 0 ? "text-red-500" : "text-green-500"}>{combinePortfolioData && (combinePortfolioData.currentPrice - combinePortfolioData.avgOrderPrice)} ({(combinePortfolioData && combinePortfolioData.change) > 0 ? "+" : ""}{combinePortfolioData && combinePortfolioData.change}%)</div>
            </div>
        </div>
    );
};

export default CurrentValue;