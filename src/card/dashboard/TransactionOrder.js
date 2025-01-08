import React from 'react';

const TransactionOrder = ({ topPerformerData }) => {

    return (
        <div className="flex-1 bg-zinc-900 p-4 rounded-2xl">
            <div className="">Top Performer</div>
            <div className='flex pt-5 pb-2'>
                <div className="flex items-center space-x-2 w-full">
                    {/* <img alt={`AAPL logo`} className="w-8 h-8 rounded-full" src={"https://storage.googleapis.com/a1aa/image/llaeI67u1QTNMSQzmqfHuvy1eKeKTilVjjIUQy18GfNdiDIgC.jpg"} /> */}
                    <div className='w-full'>
                        <div className="font-bold">{topPerformerData && topPerformerData.name}</div>
                        <div className='flex flex-cols-2 justify-between items-center w-full'>
                            <div className="text-gray-400 text-sm">{topPerformerData && topPerformerData.industry}</div>
                            <div className="text-gray-400 text-sm">{topPerformerData && topPerformerData.quantity}x</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionOrder;