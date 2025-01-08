import React from 'react';

const MyTransactions = ({ data }) => {

    return (
        <div className="flex-1 bg-zinc-900 p-4 rounded-2xl w-full">
            <div className="flex justify-between items-center ">
                <div className="">Transactions</div>
                <div className="flex space-x-2">
                    {['All', 'Gainers', 'Decliners', 'See All'].map((label) => (
                        <button key={label} className="px-2 py-1 bg-gray-700 rounded-full text-sm">{label}</button>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                {data && data.map(({ symbol, name, industry, action, price, quantity, date }) => (
                    <div key={symbol} className="flex md:items-center justify-between py-2 border-b border-gray-700">
                        <div className="flex md:items-center space-x-2 w-[60%]">
                            <div>
                                <div className="font-bold">{name}</div>
                                <div className="md:hidden text-gray-400 text-sm">{date}</div>
                                <div className="hidden md:block text-gray-400 text-sm">{name}</div>
                            </div>
                        </div>
                        <div className='md:flex items-center'>
                            <div className="hidden md:block text-right w-36">
                                <div className="text-gray-400 text-sm">Quantity</div>
                                <div className="font-bold">{quantity}x</div>
                            </div>
                            <div className="hidden md:block text-right w-36">
                                <div className="text-gray-400 text-sm">Time</div>
                                <div className="font-bold">{date}</div>
                            </div>

                        </div>
                        <div className='md:flex items-center md:w-[25%] '>
                            <div className="text-right w-36">
                                <div className="text-gray-400 text-sm">Amount</div>
                                <div className="font-bold">₹{price * quantity}</div>
                            </div>
                            <div className="text-right w-36">

                                <div className={(action == "Buy") ? "text-green-500 font-bold" : "text-red-500 font-bold"}>{action}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTransactions;