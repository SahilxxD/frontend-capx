import React, { useState } from 'react';

import ApexCharts from 'apexcharts';
import ApexChartComponent from '../../analytics/Chart';



const PortfolioReturn = ({ topPerformerData }) => {

    let chartId = 'top_performer_returns';

    const data = [[1727927100000, 107747.2], [1728013500000, 106703.05], [1728272700000, 105845.75], [1728359100000, 106647.96], [1728445500000, 106449.05], [1728531900000, 106609.86], [1728618300000, 106345.61], [1728877500000, 107101.0], [1728963900000, 106877.47], [1729050300000, 106472.66], [1729136700000, 105756.46], [1729223100000, 106078.8], [1729482300000, 105932.37], [1729568700000, 104692.82], [1729655100000, 104517.48], [1729741500000, 104464.56], [1729827900000, 103583.09], [1730087100000, 104344.19], [1730173500000, 104835.88], [1730259900000, 104283.03], [1730346300000, 103594.41], [1730432700000, 104028.47], [1730691900000, 102777.59], [1730778300000, 103689.93], [1730864700000, 104862.18], [1730951100000, 103741.14], [1731037500000, 103634.52], [1731296700000, 103637.45], [1731383100000, 102558.63], [1731469500000, 101250.0], [1731555900000, 101113.01], [1731901500000, 100792.81], [1731987900000, 101096.88], [1732160700000, 100505.69], [1732247100000, 103024.36], [1732506300000, 104331.75], [1732592700000, 104198.56], [1732679100000, 104508.98], [1732765500000, 102957.89], [1732851900000, 103933.89], [1733111100000, 104524.13], [1733197500000, 105302.9], [1733283900000, 105423.78], [1733370300000, 106474.26], [1733456700000, 106386.92], [1733715900000, 106127.46], [1733802300000, 106120.1], [1733888700000, 106167.94], [1733975100000, 105838.66], [1734061500000, 106901.42], [1734320700000, 106416.82], [1734407100000, 105020.45], [1734493500000, 104381.05], [1734579900000, 103169.75], [1734666300000, 101629.09], [1734925500000, 102293.62], [1735011900000, 102200.52], [1735184700000, 102222.68], [1735271100000, 102512.47], [1735530300000, 101893.03], [1735616700000, 101783.81], [1735703100000, 102250.31], [1735789500000, 104132.36], [1735875900000, 103227.86]]
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
