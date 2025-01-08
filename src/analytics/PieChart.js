import React, { forwardRef, useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChartComponent = forwardRef(({ height, industryData }, ref) => {
    const [state, setState] = useState({
        series: [],
        options: {
            chart: {
                width: 980,
                type: 'pie',
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#28a745', // Green color
                    shadeTo: 'light',
                    shadeIntensity: 0.65,
                },
            },
            labels: [],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            // Customize the labels' style
            legend: {
                labels: {
                    colors: '#fff' // Set legend labels color to white
                }
            },

        }
    });

    useEffect(() => {
        if (industryData) {
            console.log('industryData', industryData);
            setState(prevState => ({
                ...prevState,
                series: industryData.quantities,  // Correctly assign quantities array
                options: {
                    ...prevState.options,
                    labels: industryData.industries,  // Correctly assign industries array
                }
            }));
        }
    }, [industryData]);

    // Log to check the series and labels
    console.log('Series:', state.series);
    console.log('Labels:', state.options.labels);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="pie"
                    width={480}
                />
            </div>
        </div>
    );
});

export default PieChartComponent;
