import React from 'react';

import ApexCharts from 'apexcharts';
import ApexChartComponent from '../../analytics/Chart';



const PortfolioReturn = ({ topPerformerData }) => {

    let chartId = 'top_performer_returns';

    // Get the current date
    const currentDate = new Date();

    const handleButtonClick = (timeline) => {
        // if (chartRef.current) {
        //     chartRef.current.updateData(timeline);
        // }
        console.log(topPerformerData);
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
        <div className='flex-1 bg-zinc-900 rounded-2xl md:min-w-[40%]'>
            <div className=" p-4">
                <div className="flex justify-between items-center">
                    <div className="text-white">Top Performer Return</div>
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
                <ApexChartComponent height={'120%'} chartId={chartId} data={topPerformerData && topPerformerData.closePricesWithTimestamps} />
            </div>
        </div>
    );
};

export default PortfolioReturn;
