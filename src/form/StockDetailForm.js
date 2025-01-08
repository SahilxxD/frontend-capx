import React, { useState } from 'react';

const StockDetailForm = ({ stock, setSelectedStock, modifyStock }) => {
    const [isExtended, setIsExtended] = useState(false); // Tracks if the form is extended
    const [quantity, setQuantity] = useState(null); // Tracks the entered quantity
    const [action, setAction] = useState(""); // Tracks the current action ("Buy" or "Sell")

    const handleActionClick = (actionType) => {
        setAction(actionType);
        setIsExtended(true);
    };

    const handlePlaceOrder = () => {
        modifyStock(stock, action, quantity);
        setIsExtended(false);
        setQuantity(null);
        setAction("");
        handleClose();
    };

    const handleClose = () => {
        setSelectedStock(null); // Close the form by setting selectedStock to null
    };

    return (
        <div className="flex flex-col bg-black text-white p-6 rounded-2xl w-[90%] md:w-[40%] mx-auto space-y-4">
            {/* Stock Name and Exit Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{stock.name}</h2>
                <button onClick={handleClose} className="text-gray-400 hover:text-red-500">X</button>
            </div>
            <h2 className={stock.change < 0 ? "text-md text-red-500" : "text-md text-green-500"}>₹{stock.currentPrice}</h2>
            {/* Stock Details */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-gray-400 text-sm">Invested</div>
                    <div className="font-bold">₹{(stock.quantity * stock.avgOrderPrice)}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm">Current Price</div>
                    <div className="font-bold">₹{(stock.quantity * stock.currentPrice)}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm">Quantity</div>
                    <div className="font-bold">{stock.quantity}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm">Change</div>
                    <div className={`font-bold ${stock.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {stock.change}%
                    </div>
                </div>
            </div>

            {/* Buy/Sell Buttons */}
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

            {/* Extended Form with Quantity */}
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isExtended ? 'max-h-[600px] p-4' : 'max-h-0 p-0'}`}
            >
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
                                Total Price:{" "}
                                <span className="font-bold">
                                    ₹{(quantity * stock.currentPrice)}
                                </span>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <button
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
            </div>
        </div>
    );
};

export default StockDetailForm;
