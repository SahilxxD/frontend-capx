import React from 'react';
import ApexCharts from 'apexcharts';
import ApexChartComponent from '../../analytics/Chart';

const PortfolioPerformance = ({ combinePortfolioData }) => {

    let chartId = 'portfolio_returns';
    // Get the current date
    const currentDate = new Date();
    const handleButtonClick = (timeline) => {

        switch (timeline) {
            case '7D':
                // Calculate the date 7 days ago
                let sevenDaysAgo = new Date(currentDate);
                sevenDaysAgo.setDate(currentDate.getDate() - 7);
                ApexCharts.exec(
                    chartId,
                    'zoomX',
                    sevenDaysAgo.getTime(), // Start date: 7 days ago
                    currentDate.getTime()
                )
                break
            case '1M':
                // Calculate the date 7 days ago
                let monthAgo = new Date(currentDate);
                monthAgo.setDate(currentDate.getDate() - 30);
                ApexCharts.exec(
                    chartId,
                    'zoomX',
                    monthAgo.getTime(), // Start date: 7 days ago
                    currentDate.getTime()
                )
                break
            case '3M':
                // Calculate the date 7 days ago
                let threeMonthAgo = new Date(currentDate);
                threeMonthAgo.setDate(currentDate.getDate() - 90);
                ApexCharts.exec(
                    chartId,
                    'zoomX',
                    threeMonthAgo.getTime(), // Start date: 7 days ago
                    currentDate.getTime()
                )
                break
            default:
        }
    };

    return (
        <div className='flex-1 bg-zinc-900 rounded-2xl min-w-[55%] md:max-w-[55%]'>
            <div className=" p-4">
                <div className="flex justify-between items-center">
                    <div className="text-white">Portfolio Returns</div>
                    <div className="flex space-x-2">
                        {['7D', '1M', '3M'].map((label) => (
                            <button
                                key={label}
                                onClick={() => handleButtonClick(label)}
                                className="px-2 py-1 bg-gray-700 rounded-full text-sm text-white"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
            <div className="mt-4">
                <ApexChartComponent height={'190%'} chartId={chartId} data={combinePortfolioData && combinePortfolioData.closePricesWithTimestamps} />
            </div>
        </div>
    );
};

export default PortfolioPerformance;
