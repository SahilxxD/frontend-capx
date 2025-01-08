import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentValue from '../card/dashboard/CurrentValue';
import PortfolioReturn from '../card/dashboard/PortfolioReturn';
import TransactionOrder from '../card/dashboard/TransactionOrder';
import PurchaseQuantity from '../card/dashboard/PurchaseQuantity';
import PortfolioPerformance from '../card/dashboard/PortfolioPerformance';
import SectorPerformance from '../card/dashboard/SectorPerformance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StoicexDashboard = () => {
    const [topPerformerData, setTopPerformerData] = useState(null);
    const [combinePortfolioData, setCombinePortfolioData] = useState(null);
    const [industryData, setIndustryData] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {

        // Display loading toast for portfolio updates
        const loadingToastId = toast.loading('Fetching dashboard updates...ᯓ ✈︎', {
            autoClose: false, // Disable auto-close, we will close it manually
            hideProgressBar: true,
            theme: 'dark',
        });

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await axios.get(`${apiUrl}/data/dashboard`, {
            });

            const updatedData = response.data;

            // Map updated data to dashboard
            const topPerformer = updatedData.topStock;
            const combinePortfolio = updatedData.allStocksCombine;
            const industryPerfromance = updatedData.industryPerfromance;

            setTopPerformerData(topPerformer);
            setCombinePortfolioData(combinePortfolio);
            setIndustryData(industryPerfromance);

            toast.update(loadingToastId, {
                render: 'Dashboard updated successfully! 🚀',
                type: 'success',
                hideProgressBar: false,
                autoClose: 2000,
                isLoading: false,
            });

            console.log('response', updatedData);
        } catch (error) {
            toast.update(loadingToastId, {
                render: 'Portfolio updating portfolio! 😞',
                type: 'error',
                hideProgressBar: false,
                autoClose: 2000,
                isLoading: false,
            });
        }
    };



    return (
        <><ToastContainer />
            <div className="text-white min-h-screen flex flex-col space-y-6 pb-4 w-full">

                <div className="flex flex-col 2xl:flex-row flex-wrap px-4 space-y-4 2xl:space-y-0 2xl:space-x-6">
                    <CurrentValue combinePortfolioData={combinePortfolioData} />
                    <PortfolioReturn topPerformerData={topPerformerData} />
                    <div className='md:space-y-6 space-y-4 md:flex-1 md:max-w-[20%]'>
                        <TransactionOrder topPerformerData={topPerformerData} />
                        <PurchaseQuantity topPerformerData={topPerformerData} />
                    </div>
                </div>
                <div className="flex flex-col    md:flex-row flex-wrap px-4 space-y-4 md:space-y-0 md:space-x-4 ">
                    <PortfolioPerformance combinePortfolioData={combinePortfolioData} />
                    <SectorPerformance industryData={industryData} />

                </div>
            </div>
        </>
    );
};

export default StoicexDashboard;
