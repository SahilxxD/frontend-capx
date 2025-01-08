import React from 'react';
import PieChartComponent from '../../analytics/PieChart';

const SectorPerformance = ({ industryData }) => {

    return (
        <div className='flex-1 bg-zinc-900 rounded-2xl'>
            <div className=" p-4">
                <div className="text-white">Sector Analysis</div>
            </div>
            <div className="mt-4">
                <PieChartComponent industryData={industryData} />
            </div>
        </div>
    );
};

export default SectorPerformance;
