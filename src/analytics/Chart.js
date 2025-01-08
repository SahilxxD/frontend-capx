import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChartComponent = (({ chartId, height, data }) => {

    useEffect(() => {
        if (data) {
            setState(prevState => ({
                ...prevState,
                series: [{ data }]  // Update state when data is available
            }));
        }
    }, [data]);

    const [state, setState] = useState({
        series: [{
            data: data ? data : []
        }],
        options: {
            chart: {
                id: chartId,
                type: 'area',
                height: 350,
                zoom: {
                    autoScaleYaxis: true
                },
                toolbar: {
                    show: false // Disable the toolbar
                }
            },

            annotations: {
                yaxis: [{
                    y: 30,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Support',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                }],
                xaxis: [{
                    x: new Date('14 Nov 2024').getTime(),
                    borderColor: '#999',
                    yAxisIndex: 0,
                    label: {
                        show: false,
                        text: 'Rally',
                        style: {
                            color: "#fff",
                            background: '#775DD0'
                        }
                    }
                }]
            },
            grid: {
                show: true, // Show grid
                borderColor: '#2f2f2f', // Dark gray border color for grid lines
                xaxis: {
                    lines: {
                        show: false, // Show vertical grid lines
                        color: '#2f2f2f', // Dark gray for vertical grid lines
                        strokeDashArray: '5px', // Dotted lines (5px dashed segments)
                    }
                },
                yaxis: {
                    lines: {
                        show: true, // Show horizontal grid lines
                        color: '#2f2f2f', // Dark gray for horizontal grid lines
                        strokeDashArray: '1px', // Dotted lines (5px dashed segments)
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
                style: 'hollow',
            },
            stroke: {
                width: 3 // Reduced stroke size for a thinner line
            },
            xaxis: {
                type: 'datetime',
                min: new Date('01 Nov 2024').getTime(),
                tickAmount: 6,
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
                style: {
                    fontSize: '12px',
                    color: '#1E90FF', // Blue color for the text
                },
                theme: 'dark' // Tooltip background theme
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.5,
                    opacityFrom: 0.9,
                    opacityTo: 0.1,
                    stops: [0, 100]
                }
            },
            colors: ['#009900']
        },

    });


    return (
        <div className="w-full h-full rounded-lg shadow-lg">

            <div id="chart-timeline" className="">
                <ReactApexChart options={state.options} series={state.series} type="area" height={height} />
            </div>
        </div >
    );
});

export default ApexChartComponent;
