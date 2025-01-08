import React from 'react';

const PurchaseQuantity = ({ topPerformerData }) => {
    return (
        <div className="flex-1 bg-zinc-900 p-4 rounded-2xl">
            <div className="">Top Performer Profits</div>
            <div className='flex pt-5 pb-2'>
                <div className="text-4xl font-bold"><span className="text-lg">₹ </span>{topPerformerData && (topPerformerData.currentPrice - topPerformerData.avgOrderPrice)}</div>
                <div className={(topPerformerData && topPerformerData.change) < 0 ? "text-red-500 pt-4 px-2" : "text-green-500 pt-4 px-2"}>{(topPerformerData && topPerformerData.change) > 0 ? "+" : ""}{topPerformerData && topPerformerData.change}%</div>
            </div>
        </div>
    );
};

export default PurchaseQuantity;