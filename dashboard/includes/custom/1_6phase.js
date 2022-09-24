$(document).ready(function () {

    //last data
    var volt1 = [], curr1 = [], power1 = [], energy1 = [], freq1 = [], p_f1 = [],
        volt2 = [], curr2 = [], power2 = [], energy2 = [], freq2 = [], p_f2 = [],
        volt3 = [], curr3 = [], power3 = [], energy3 = [], freq3 = [], p_f3 = [],
        volt4 = [], curr4 = [], power4 = [], energy4 = [], freq4 = [], p_f4 = [],
        volt5 = [], curr5 = [], power5 = [], energy5 = [], freq5 = [], p_f5 = [],
        volt6 = [], curr6 = [], power6 = [], energy6 = [], freq6 = [], p_f6 = [],
        label1 = [], label2 = [];
    var min_e1, min_e2, min_e3, min_e4, min_e5, min_e6;
    var eAll1, eAll2, _eAll_month;
    var kwh_per_energy = 4.2;

    // day
    var power_phase1 = [], power_phase2 = [], power_phase3 = [], label1_day = [],
        power_phase4 = [], power_phase5 = [], power_phase6 = [], label2_day = [];

    //  mouth
    var energy_phase1 = [], energy_phase2 = [], energy_phase3 = [],
        energy_phase4 = [], energy_phase5 = [], energy_phase6 = [], label_mouth = [];

    // custom history range
    var volt1_history = [], curr1_history = [], power1_history = [], energy1_history = [], freq1_history = [], p_f1_history = [],
        volt2_history = [], curr2_history = [], power2_history = [], energy2_history = [], freq2_history = [], p_f2_history = [],
        volt3_history = [], curr3_history = [], power3_history = [], energy3_history = [], freq3_history = [], p_f3_history = [],
        volt4_history = [], curr4_history = [], power4_history = [], energy4_history = [], freq4_history = [], p_f4_history = [],
        volt5_history = [], curr5_history = [], power5_history = [], energy5_history = [], freq5_history = [], p_f5_history = [],
        volt6_history = [], curr6_history = [], power6_history = [], energy6_history = [], freq6_history = [], p_f6_history = [],
        label1_history = [], label2_history = [],
        label1_timestamp = [], label2_timestamp = [],
        uplot1, uplot2, uplot3, uplot4, uplot5, uplot6;


    var Chart_1, Chart_2, Chart_3, Chart_4, Chart_5, Chart_6, Chart_history;
    displayChart();
    getLastData();

    $("#uplot").hide();
    $("#google_table").hide();
    $(".setting-page").hide();
    $("#Charthistory").hide();
    $("#range_display").hide();
    $(".history_view_class").hide();
    $(".history_option_class").hide();
    $("#ota-form").hide();
    $(".month-view-page").hide();
    $(".day-view-page").hide();

    // bootstrap tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    // display empty chart
    function displayChart() {

        // for display chart axis and legend
        function axiscontrol(e, legendItem, legend) {
            const index = legendItem.datasetIndex;
            const ci = legend.chart;
            const scale = ci.data.datasets[index].yAxisID;
            // console.log(scale);
            if (ci.isDatasetVisible(index)) {
                ci.hide(index);
                ci.options.scales[scale].display = false;
                legendItem.hidden = true;
            } else {
                ci.show(index);
                ci.options.scales[scale].display = true;
                legendItem.hidden = false;
            }
            ci.update();
        };

        Chart_1 = new Chart(
            document.getElementById('Chart_1'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Voltage',
                    data: [],
                    yAxisID: 'yv',
                    tension: 0.1,
                    backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Current',
                    data: [],
                    yAxisID: 'yi',
                    tension: 0.1,
                    backgroundColor: '#f05d2380',
                    borderColor: '#f05d23',
                    fill: true,
                    pointColor: '#f05d23',
                    pointStrokeColor: '#f05d23',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#f05d23',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Power',
                    data: [],
                    yAxisID: 'yp',
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    pointRadius: 0.5,
                }, {
                    label: 'Energy',
                    data: [],
                    yAxisID: 'ye',
                    tension: 0.1,
                    backgroundColor: '#b643cd80',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Frequency',
                    data: [],
                    yAxisID: 'yf',
                    tension: 0.1,
                    backgroundColor: 'rgba(153,153,0,0.5)',
                    borderColor: 'rgba(153,153,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(153,153,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(153,153,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'PF',
                    data: [],
                    yAxisID: 'ypf',
                    tension: 0.1,
                    backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Phase1'
                    },
                    legend: {
                        display: true,
                        onClick: axiscontrol
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                        title: {
                            display: true,
                            text: "เวลา",
                        }
                        // ticks: {
                        //     source: 'auto',
                        //     autoSkip: true,
                        // },
                    },
                    yp: {
                        display: true,
                        title: {
                            display: true,
                            text: "Power",
                        },

                        type: 'linear',
                        position: 'left',
                    },
                    yv: {
                        display: true,
                        title: {
                            display: true,
                            text: "Volt",
                        },

                        type: 'linear',
                        position: 'left',
                    }
                    ,
                    yi: {
                        display: true,
                        title: {
                            display: true,
                            text: "Current",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ye: {
                        display: true,
                        title: {
                            display: true,
                            text: "Energy",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    yf: {
                        display: true,
                        title: {
                            display: true,
                            text: "Frequency",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ypf: {
                        display: true,
                        title: {
                            display: true,
                            text: "PF",
                        },
                        type: 'linear',
                        position: 'right',

                    }
                }
            }
        });

        Chart_2 = new Chart(
            document.getElementById('Chart_2'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Voltage',
                    data: [],
                    yAxisID: 'yv',
                    tension: 0.1,
                    backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Current',
                    data: [],
                    yAxisID: 'yi',
                    tension: 0.1,
                    backgroundColor: '#f05d2380',
                    borderColor: '#f05d23',
                    fill: true,
                    pointColor: '#f05d23',
                    pointStrokeColor: '#f05d23',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#f05d23',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Power',
                    data: [],
                    yAxisID: 'yp',
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    pointRadius: 0.5,
                }, {
                    label: 'Energy',
                    data: [],
                    yAxisID: 'ye',
                    tension: 0.1,
                    backgroundColor: '#b643cd80',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Frequency',
                    data: [],
                    yAxisID: 'yf',
                    tension: 0.1,
                    backgroundColor: 'rgba(153,153,0,0.5)',
                    borderColor: 'rgba(153,153,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(153,153,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(153,153,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'PF',
                    data: [],
                    yAxisID: 'ypf',
                    tension: 0.1,
                    backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Phase2'
                    },
                    legend: {
                        display: true,
                        onClick: axiscontrol
                    },
                    // zoom: {
                    //     zoom: {
                    //         wheel: {
                    //             enabled: true,
                    //         },
                    //         pinch: {
                    //             enabled: true
                    //         },
                    //         // drag: {
                    //         //     enabled: true
                    //         // },
                    //         mode: 'x',
                    //     }, pan: {
                    //         enabled: true,
                    //         mode: 'x',
                    //     },
                    //     limits: {
                    //         x: { min: 'original', max: 'original' },
                    //     }
                    // }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                        title: {
                            display: true,
                            text: "เวลา",
                        }
                        // ticks: {
                        //     source: 'auto',
                        //     autoSkip: true,
                        // },
                    },
                    yp: {
                        display: true,
                        title: {
                            display: true,
                            text: "Power",
                        },

                        type: 'linear',
                        position: 'left',
                    },
                    yv: {
                        display: true,
                        title: {
                            display: true,
                            text: "Volt",
                        },

                        type: 'linear',
                        position: 'left',
                    }
                    ,
                    yi: {
                        display: true,
                        title: {
                            display: true,
                            text: "Current",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ye: {
                        display: true,
                        title: {
                            display: true,
                            text: "Energy",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    yf: {
                        display: true,
                        title: {
                            display: true,
                            text: "Frequency",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ypf: {
                        display: true,
                        title: {
                            display: true,
                            text: "PF",
                        },
                        type: 'linear',
                        position: 'right',

                    }
                }
            }
        });

        Chart_3 = new Chart(
            document.getElementById('Chart_3'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Voltage',
                    data: [],
                    yAxisID: 'yv',
                    tension: 0.1,
                    backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Current',
                    data: [],
                    yAxisID: 'yi',
                    tension: 0.1,
                    backgroundColor: '#f05d2380',
                    borderColor: '#f05d23',
                    fill: true,
                    pointColor: '#f05d23',
                    pointStrokeColor: '#f05d23',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#f05d23',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Power',
                    data: [],
                    yAxisID: 'yp',
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    pointRadius: 0.5,
                }, {
                    label: 'Energy',
                    data: [],
                    yAxisID: 'ye',
                    tension: 0.1,
                    backgroundColor: '#b643cd80',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Frequency',
                    data: [],
                    yAxisID: 'yf',
                    tension: 0.1,
                    backgroundColor: 'rgba(153,153,0,0.5)',
                    borderColor: 'rgba(153,153,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(153,153,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(153,153,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'PF',
                    data: [],
                    yAxisID: 'ypf',
                    tension: 0.1,
                    backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Phase3'
                    },
                    legend: {
                        display: true,
                        onClick: axiscontrol
                    },
                    // zoom: {
                    //     zoom: {
                    //         wheel: {
                    //             enabled: true,
                    //         },
                    //         pinch: {
                    //             enabled: true
                    //         },
                    //         // drag: {
                    //         //     enabled: true
                    //         // },
                    //         mode: 'x',
                    //     }, pan: {
                    //         enabled: true,
                    //         mode: 'x',
                    //     },
                    //     limits: {
                    //         x: { min: 'original', max: 'original' },
                    //     }
                    // }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                        title: {
                            display: true,
                            text: "เวลา",
                        }
                        // ticks: {
                        //     source: 'auto',
                        //     autoSkip: true,
                        // },
                    },
                    yp: {
                        display: true,
                        title: {
                            display: true,
                            text: "Power",
                        },

                        type: 'linear',
                        position: 'left',
                    },
                    yv: {
                        display: true,
                        title: {
                            display: true,
                            text: "Volt",
                        },

                        type: 'linear',
                        position: 'left',
                    }
                    ,
                    yi: {
                        display: true,
                        title: {
                            display: true,
                            text: "Current",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ye: {
                        display: true,
                        title: {
                            display: true,
                            text: "Energy",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    yf: {
                        display: true,
                        title: {
                            display: true,
                            text: "Frequency",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ypf: {
                        display: true,
                        title: {
                            display: true,
                            text: "PF",
                        },
                        type: 'linear',
                        position: 'right',

                    }
                }
            }
        });

        Chart_4 = new Chart(
            document.getElementById('Chart_4'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Voltage',
                    data: [],
                    yAxisID: 'yv',
                    tension: 0.1,
                    backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Current',
                    data: [],
                    yAxisID: 'yi',
                    tension: 0.1,
                    backgroundColor: '#f05d2380',
                    borderColor: '#f05d23',
                    fill: true,
                    pointColor: '#f05d23',
                    pointStrokeColor: '#f05d23',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#f05d23',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Power',
                    data: [],
                    yAxisID: 'yp',
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    pointRadius: 0.5,
                }, {
                    label: 'Energy',
                    data: [],
                    yAxisID: 'ye',
                    tension: 0.1,
                    backgroundColor: '#b643cd80',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Frequency',
                    data: [],
                    yAxisID: 'yf',
                    tension: 0.1,
                    backgroundColor: 'rgba(153,153,0,0.5)',
                    borderColor: 'rgba(153,153,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(153,153,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(153,153,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'PF',
                    data: [],
                    yAxisID: 'ypf',
                    tension: 0.1,
                    backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Phase4'
                    },
                    legend: {
                        display: true,
                        onClick: axiscontrol
                    },
                    // zoom: {
                    //     zoom: {
                    //         wheel: {
                    //             enabled: true,
                    //         },
                    //         pinch: {
                    //             enabled: true
                    //         },
                    //         // drag: {
                    //         //     enabled: true
                    //         // },
                    //         mode: 'x',
                    //     }, pan: {
                    //         enabled: true,
                    //         mode: 'x',
                    //     },
                    //     limits: {
                    //         x: { min: 'original', max: 'original' },
                    //     }
                    // }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                        title: {
                            display: true,
                            text: "เวลา",
                        }
                        // ticks: {
                        //     source: 'auto',
                        //     autoSkip: true,
                        // },
                    },
                    yp: {
                        display: true,
                        title: {
                            display: true,
                            text: "Power",
                        },

                        type: 'linear',
                        position: 'left',
                    },
                    yv: {
                        display: true,
                        title: {
                            display: true,
                            text: "Volt",
                        },

                        type: 'linear',
                        position: 'left',
                    }
                    ,
                    yi: {
                        display: true,
                        title: {
                            display: true,
                            text: "Current",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ye: {
                        display: true,
                        title: {
                            display: true,
                            text: "Energy",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    yf: {
                        display: true,
                        title: {
                            display: true,
                            text: "Frequency",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ypf: {
                        display: true,
                        title: {
                            display: true,
                            text: "PF",
                        },
                        type: 'linear',
                        position: 'right',

                    }
                }
            }
        });

        Chart_5 = new Chart(
            document.getElementById('Chart_5'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Voltage',
                    data: [],
                    yAxisID: 'yv',
                    tension: 0.1,
                    backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Current',
                    data: [],
                    yAxisID: 'yi',
                    tension: 0.1,
                    backgroundColor: '#f05d2380',
                    borderColor: '#f05d23',
                    fill: true,
                    pointColor: '#f05d23',
                    pointStrokeColor: '#f05d23',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#f05d23',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Power',
                    data: [],
                    yAxisID: 'yp',
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    pointRadius: 0.5,
                }, {
                    label: 'Energy',
                    data: [],
                    yAxisID: 'ye',
                    tension: 0.1,
                    backgroundColor: '#b643cd80',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Frequency',
                    data: [],
                    yAxisID: 'yf',
                    tension: 0.1,
                    backgroundColor: 'rgba(153,153,0,0.5)',
                    borderColor: 'rgba(153,153,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(153,153,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(153,153,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'PF',
                    data: [],
                    yAxisID: 'ypf',
                    tension: 0.1,
                    backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Phase5'
                    },
                    legend: {
                        display: true,
                        onClick: axiscontrol
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                        title: {
                            display: true,
                            text: "เวลา",
                        }
                        // ticks: {
                        //     source: 'auto',
                        //     autoSkip: true,
                        // },
                    },
                    yp: {
                        display: true,
                        title: {
                            display: true,
                            text: "Power",
                        },

                        type: 'linear',
                        position: 'left',
                    },
                    yv: {
                        display: true,
                        title: {
                            display: true,
                            text: "Volt",
                        },

                        type: 'linear',
                        position: 'left',
                    }
                    ,
                    yi: {
                        display: true,
                        title: {
                            display: true,
                            text: "Current",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ye: {
                        display: true,
                        title: {
                            display: true,
                            text: "Energy",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    yf: {
                        display: true,
                        title: {
                            display: true,
                            text: "Frequency",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ypf: {
                        display: true,
                        title: {
                            display: true,
                            text: "PF",
                        },
                        type: 'linear',
                        position: 'right',

                    }
                }
            }
        });

        Chart_6 = new Chart(
            document.getElementById('Chart_6'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Voltage',
                    data: [],
                    yAxisID: 'yv',
                    tension: 0.1,
                    backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Current',
                    data: [],
                    yAxisID: 'yi',
                    tension: 0.1,
                    backgroundColor: '#f05d2380',
                    borderColor: '#f05d23',
                    fill: true,
                    pointColor: '#f05d23',
                    pointStrokeColor: '#f05d23',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#f05d23',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Power',
                    data: [],
                    yAxisID: 'yp',
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    pointRadius: 0.5,
                }, {
                    label: 'Energy',
                    data: [],
                    yAxisID: 'ye',
                    tension: 0.1,
                    backgroundColor: '#b643cd80',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'Frequency',
                    data: [],
                    yAxisID: 'yf',
                    tension: 0.1,
                    backgroundColor: 'rgba(153,153,0,0.5)',
                    borderColor: 'rgba(153,153,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(153,153,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(153,153,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }, {
                    label: 'PF',
                    data: [],
                    yAxisID: 'ypf',
                    tension: 0.1,
                    backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    pointRadius: 0.5,
                    hidden: true
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Phase6'
                    },
                    legend: {
                        display: true,
                        onClick: axiscontrol
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                        title: {
                            display: true,
                            text: "เวลา",
                        }
                        // ticks: {
                        //     source: 'auto',
                        //     autoSkip: true,
                        // },
                    },
                    yp: {
                        display: true,
                        title: {
                            display: true,
                            text: "Power",
                        },

                        type: 'linear',
                        position: 'left',
                    },
                    yv: {
                        display: true,
                        title: {
                            display: true,
                            text: "Volt",
                        },

                        type: 'linear',
                        position: 'left',
                    }
                    ,
                    yi: {
                        display: true,
                        title: {
                            display: true,
                            text: "Current",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ye: {
                        display: true,
                        title: {
                            display: true,
                            text: "Energy",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    yf: {
                        display: true,
                        title: {
                            display: true,
                            text: "Frequency",
                        },
                        type: 'linear',
                        position: 'right',

                    },
                    ypf: {
                        display: true,
                        title: {
                            display: true,
                            text: "PF",
                        },
                        type: 'linear',
                        position: 'right',

                    }
                }
            }
        });

        Chart_history = new Chart(
            document.getElementById('Chart_history'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Phase1',
                    data: [],
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    // pointRadius: 0.5,
                }, {
                    label: 'Phase2',
                    data: [],
                    tension: 0.1, backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    // pointRadius: 0.5,
                }, {
                    label: 'Phase3',
                    data: [],
                    tension: 0.1,
                    backgroundColor: '#b643cd80',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    // pointRadius: 0.5,
                }, {
                    label: 'Phase4',
                    data: [],
                    tension: 0.1,
                    backgroundColor: 'rgba(153,153,0,0.5)',
                    borderColor: 'rgba(153,153,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(153,153,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(153,153,0,1)',
                    // pointRadius: 0.5,
                }, {
                    label: 'Phase5',
                    data: [],
                    tension: 0.1,
                    backgroundColor: '#f05d2380',
                    borderColor: '#f05d23',
                    fill: true,
                    pointColor: '#f05d23',
                    pointStrokeColor: '#f05d23',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#f05d23',
                    // pointRadius: 0.5,
                }, {
                    label: 'Phase6',
                    data: [],
                    tension: 0.1,
                    backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    // pointRadius: 0.5,
                },]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                                speed: 0.5,
                            },
                            pinch: {
                                enabled: true
                            },
                            // drag: {
                            //     enabled: true
                            // },
                            mode: 'x',
                        }, pan: {
                            enabled: true,
                            mode: 'x',
                        }
                    }

                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "เวลา",
                        },
                        ticks: {
                            source: 'auto',
                            // Disabled rotation for performance
                            maxRotation: 0,
                            autoSkip: true,
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: false,
                    },
                },
                spanGaps: true, // enable for all datasets
                datasets: {
                    line: {
                        pointRadius: 0 // disable for all `'line'` datasets
                    }
                },
                elements: {
                    point: {
                        radius: 0 // default to disabled in all datasets
                    }
                }
            }
        });

        Chart_minute_bill = new Chart(
            document.getElementById('Chart_minute_bill'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'หน่วยที่ใช้',
                    data: [],
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    yAxisID: 'ye',
                    // pointRadius: 0.5,
                }, {
                    label: 'ค่าไฟ',
                    data: [],
                    tension: 0.1, backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    yAxisID: 'yb',
                    // pointRadius: 0.5,
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                                speed: 0.5,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                        }, pan: {
                            enabled: true,
                            mode: 'x',
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "วันที่",
                        }
                    },
                    ye: {
                        display: true,
                        title: {
                            display: true,
                            text: "Energy",
                        },
                    },
                    yb: {
                        display: true,
                        title: {
                            display: true,
                            text: "Bill",
                        },

                        type: 'linear',
                        position: 'right',
                    }
                },
                spanGaps: true, // enable for all datasets
                datasets: {
                    line: {
                        pointRadius: 0 // disable for all `'line'` datasets
                    }
                },
                elements: {
                    point: {
                        radius: 0 // default to disabled in all datasets
                    }
                }
            }
        });

        Chart_day_bill = new Chart(
            document.getElementById('Chart_day_bill'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'หน่วยที่ใช้',
                    data: [],
                    tension: 0.1,
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    // pointRadius: 0.5,
                }, {
                    label: 'ค่าไฟ',
                    data: [],
                    tension: 0.1, backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    yAxisID: 'yb',
                    // pointRadius: 0.5,
                }]
            },
            options: {
                // Turn off animations and data parsing for performance
                animation: false,
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                                speed: 0.5,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                        }, pan: {
                            enabled: true,
                            mode: 'x',
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "วันที่",
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: false,
                    },
                },
                spanGaps: true, // enable for all datasets
                datasets: {
                    line: {
                        pointRadius: 0 // disable for all `'line'` datasets
                    }
                },
                elements: {
                    point: {
                        radius: 0 // default to disabled in all datasets
                    }
                }
            }
        });

    }

    function overlayNodata() {
        $(".overlay").show();
        $(".overlay .svg-inline--fa").hide();
        $(".overlay h3").text("ไม่มีข้อมูล");
    }

    //second data
    function getLastData() {
        $(".overlay").show();

        $.ajax({
            url: "ajax/custom/1_6phase.php",
            type: "post",
            data: {
                skey: sk,
                data: "sec",
                point: 200
            },
            success: function (data) {
                if (data == "nodata") {
                    overlayNodata();
                    return;
                }
                // console.log(data);
                try {
                    var json = JSON.parse(data);
                    // console.log(json);
                    json.v1.reverse();
                    json.i1.reverse();
                    json.p1.reverse();
                    json.e1.reverse();
                    json.f1.reverse();
                    json.pf1.reverse();

                    json.v2.reverse();
                    json.i2.reverse();
                    json.p2.reverse();
                    json.e2.reverse();
                    json.f2.reverse();
                    json.pf2.reverse();

                    json.v3.reverse();
                    json.i3.reverse();
                    json.p3.reverse();
                    json.e3.reverse();
                    json.f3.reverse();
                    json.pf3.reverse();

                    json.v4.reverse();
                    json.i4.reverse();
                    json.p4.reverse();
                    json.e4.reverse();
                    json.f4.reverse();
                    json.pf4.reverse();

                    json.v5.reverse();
                    json.i5.reverse();
                    json.p5.reverse();
                    json.e5.reverse();
                    json.f5.reverse();
                    json.pf5.reverse();

                    json.v6.reverse();
                    json.i6.reverse();
                    json.p6.reverse();
                    json.e6.reverse();
                    json.f6.reverse();
                    json.pf6.reverse();

                    json.time1.reverse();
                    json.time2.reverse();

                    volt1 = json.v1;
                    curr1 = json.i1;
                    power1 = json.p1;
                    volt2 = json.v2;
                    curr2 = json.i2;
                    power2 = json.p2;
                    volt3 = json.v3;
                    curr3 = json.i3;
                    power3 = json.p3;
                    volt4 = json.v4;
                    curr4 = json.i4;
                    power4 = json.p4;
                    volt5 = json.v5;
                    curr5 = json.i5;
                    power5 = json.p5;
                    volt6 = json.v6;
                    curr6 = json.i6;
                    power6 = json.p6;

                    min_e1 = parseFloat(json.min_e1).toFixed(3);
                    if (isNaN(min_e1)) { min_e1 = parseFloat(json.e1[0]); }

                    min_e2 = parseFloat(json.min_e2).toFixed(3);
                    if (isNaN(min_e2)) { min_e2 = parseFloat(json.e2[0]); }

                    min_e3 = parseFloat(json.min_e3).toFixed(3);
                    if (isNaN(min_e3)) { min_e3 = parseFloat(json.e3[0]); }

                    min_e4 = parseFloat(json.min_e4).toFixed(3);
                    if (isNaN(min_e4)) { min_e4 = parseFloat(json.e4[0]); }

                    min_e5 = parseFloat(json.min_e5).toFixed(3);
                    if (isNaN(min_e5)) { min_e5 = parseFloat(json.e5[0]); }

                    min_e6 = parseFloat(json.min_e6).toFixed(3);
                    if (isNaN(min_e6)) { min_e6 = parseFloat(json.e6[0]); }

                    for (var count = 0; count < json.e1.length; count++) {
                        energy1.push(parseFloat(json.e1[count]) - min_e1);
                    }
                    for (var count = 0; count < json.e2.length; count++) {
                        energy2.push(parseFloat(json.e2[count]) - min_e2);
                    }
                    for (var count = 0; count < json.e3.length; count++) {
                        energy3.push(parseFloat(json.e3[count]) - min_e3);
                    }
                    for (var count = 0; count < json.e4.length; count++) {
                        energy4.push(parseFloat(json.e4[count]) - min_e4);
                    }
                    for (var count = 0; count < json.e5.length; count++) {
                        energy5.push(parseFloat(json.e5[count]) - min_e5);
                    }
                    for (var count = 0; count < json.e6.length; count++) {
                        energy6.push(parseFloat(json.e6[count]) - min_e6);
                    }

                    freq1 = json.f1;
                    p_f1 = json.pf1;
                    freq2 = json.f2;
                    p_f2 = json.pf2;
                    freq3 = json.f3;
                    p_f3 = json.pf3;

                    freq4 = json.f4;
                    p_f4 = json.pf4;
                    freq5 = json.f5;
                    p_f5 = json.pf5;
                    freq6 = json.f6;
                    p_f6 = json.pf6;

                    label1 = json.time1;
                    label2 = json.time2;

                    for (var count = 0; count < label1.length; count++) {
                        if (volt1[count] == '0.0') {
                            volt1[count] = NaN;
                            curr1[count] = NaN;
                            power1[count] = NaN;
                            energy1[count] = NaN;
                            freq1[count] = NaN;
                            p_f1[count] = NaN;
                        }
                        if (volt2[count] == '0.0') {
                            volt2[count] = NaN;
                            curr2[count] = NaN;
                            power2[count] = NaN;
                            energy2[count] = NaN;
                            freq2[count] = NaN;
                            p_f2[count] = NaN;
                        }
                        if (volt3[count] == '0.0') {
                            volt3[count] = NaN;
                            curr3[count] = NaN;
                            power3[count] = NaN;
                            energy3[count] = NaN;
                            freq3[count] = NaN;
                            p_f3[count] = NaN;
                        }
                    }

                    for (var count = 0; count < label2.length; count++) {
                        if (volt4[count] == '0.0') {
                            volt4[count] = NaN;
                            curr4[count] = NaN;
                            power4[count] = NaN;
                            energy4[count] = NaN;
                            freq4[count] = NaN;
                            p_f4[count] = NaN;
                        }
                        if (volt5[count] == '0.0') {
                            volt5[count] = NaN;
                            curr5[count] = NaN;
                            power5[count] = NaN;
                            energy5[count] = NaN;
                            freq5[count] = NaN;
                            p_f5[count] = NaN;
                        }
                        if (volt6[count] == '0.0') {
                            volt6[count] = NaN;
                            curr6[count] = NaN;
                            power6[count] = NaN;
                            energy6[count] = NaN;
                            freq6[count] = NaN;
                            p_f6[count] = NaN;
                        }
                    }
                    // console.log(volt1);

                    // console.log(json.min_energy);
                    // console.log(json.energy[json.energy.length - 1]);

                    let _e1 = parseFloat(json.e1[json.e1.length - 1]) - min_e1;
                    let _e2 = parseFloat(json.e2[json.e2.length - 1]) - min_e2;
                    let _e3 = parseFloat(json.e3[json.e3.length - 1]) - min_e3;
                    let _e4 = parseFloat(json.e4[json.e4.length - 1]) - min_e4;
                    let _e5 = parseFloat(json.e5[json.e5.length - 1]) - min_e5;
                    let _e6 = parseFloat(json.e6[json.e6.length - 1]) - min_e6;
                    eAll1 = _e1 + _e2 + _e3;
                    eAll2 = _e4 + _e5 + _e6;
                    let _eAll = eAll1 + eAll2;
                    _eAll_month = parseFloat(json.sum_e1) + parseFloat(json.sum_e2) + parseFloat(json.sum_e3) + parseFloat(json.sum_e4) + parseFloat(json.sum_e5) + parseFloat(json.sum_e6);

                    $("#voltage1").html(json.v1[json.v1.length - 1]);
                    $("#current1").html(json.i1[json.i1.length - 1]);
                    $("#power1").html(json.p1[json.p1.length - 1]);
                    $("#energy1").html((_e1).toFixed(3));
                    $("#frequency1").html(json.f1[json.f1.length - 1]);
                    $("#pf1").html(json.pf1[json.pf1.length - 1]);

                    $("#voltage2").html(json.v2[json.v2.length - 1]);
                    $("#current2").html(json.i2[json.i2.length - 1]);
                    $("#power2").html(json.p2[json.p2.length - 1]);
                    $("#energy2").html((_e2).toFixed(3));
                    $("#frequency2").html(json.f2[json.f2.length - 1]);
                    $("#pf2").html(json.pf2[json.pf2.length - 1]);

                    $("#voltage3").html(json.v3[json.v3.length - 1]);
                    $("#current3").html(json.i3[json.i3.length - 1]);
                    $("#power3").html(json.p3[json.p3.length - 1]);
                    $("#energy3").html((_e3).toFixed(3));
                    $("#frequency3").html(json.f3[json.f3.length - 1]);
                    $("#pf3").html(json.pf3[json.pf3.length - 1]);

                    $("#voltage4").html(json.v4[json.v4.length - 1]);
                    $("#current4").html(json.i4[json.i4.length - 1]);
                    $("#power4").html(json.p4[json.p4.length - 1]);
                    $("#energy4").html((_e4).toFixed(3));
                    $("#frequency4").html(json.f4[json.f4.length - 1]);
                    $("#pf4").html(json.pf4[json.pf4.length - 1]);

                    $("#voltage5").html(json.v5[json.v5.length - 1]);
                    $("#current5").html(json.i5[json.i5.length - 1]);
                    $("#power5").html(json.p5[json.p5.length - 1]);
                    $("#energy5").html((_e5).toFixed(3));
                    $("#frequency5").html(json.f5[json.f5.length - 1]);
                    $("#pf5").html(json.pf5[json.pf5.length - 1]);

                    $("#voltage6").html(json.v6[json.v6.length - 1]);
                    $("#current6").html(json.i6[json.i6.length - 1]);
                    $("#power6").html(json.p6[json.p6.length - 1]);
                    $("#energy6").html((_e6).toFixed(3));
                    $("#frequency6").html(json.f6[json.f6.length - 1]);
                    $("#pf6").html(json.pf6[json.pf6.length - 1]);

                    $("#time").html(json.time1[json.time1.length - 1]);

                    $("#energy_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (_eAll).toFixed(1));
                    $("#bill_112").html("<span style='color:grey'><small>เป็นเงิน </small></span> ฿ " + (calc112Month(_eAll_month) / _eAll_month * _eAll).toFixed(1));
                    $("#energy_month").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (_eAll_month).toFixed(1));
                    $("#bill_112_mouth").html("<span style='color:grey'><small>เป็นเงิน </small></span> ฿ " + calc112Month(_eAll_month).toFixed(1));

                    kwh_per_energy = calc112Month(_eAll_month) / _eAll_month;

                    Chart_1.options.scales['yv'].display = false;
                    Chart_1.options.scales['yi'].display = false;
                    Chart_1.options.scales['ye'].display = false;
                    Chart_1.options.scales['yf'].display = false;
                    Chart_1.options.scales['ypf'].display = false;

                    Chart_2.options.scales['yv'].display = false;
                    Chart_2.options.scales['yi'].display = false;
                    Chart_2.options.scales['ye'].display = false;
                    Chart_2.options.scales['yf'].display = false;
                    Chart_2.options.scales['ypf'].display = false;

                    Chart_3.options.scales['yv'].display = false;
                    Chart_3.options.scales['yi'].display = false;
                    Chart_3.options.scales['ye'].display = false;
                    Chart_3.options.scales['yf'].display = false;
                    Chart_3.options.scales['ypf'].display = false;

                    Chart_4.options.scales['yv'].display = false;
                    Chart_4.options.scales['yi'].display = false;
                    Chart_4.options.scales['ye'].display = false;
                    Chart_4.options.scales['yf'].display = false;
                    Chart_4.options.scales['ypf'].display = false;

                    Chart_5.options.scales['yv'].display = false;
                    Chart_5.options.scales['yi'].display = false;
                    Chart_5.options.scales['ye'].display = false;
                    Chart_5.options.scales['yf'].display = false;
                    Chart_5.options.scales['ypf'].display = false;

                    Chart_6.options.scales['yv'].display = false;
                    Chart_6.options.scales['yi'].display = false;
                    Chart_6.options.scales['ye'].display = false;
                    Chart_6.options.scales['yf'].display = false;
                    Chart_6.options.scales['ypf'].display = false;

                    Chart_1.data.datasets[0].data = volt1;
                    Chart_1.data.datasets[0].label = 'Volt';
                    Chart_1.data.datasets[1].data = curr1;
                    Chart_1.data.datasets[1].label = 'Current';
                    Chart_1.data.datasets[2].data = power1;
                    Chart_1.data.datasets[2].label = 'Power';
                    Chart_1.data.datasets[3].data = energy1;
                    Chart_1.data.datasets[3].label = 'Energy';
                    Chart_1.data.datasets[4].data = freq1;
                    Chart_1.data.datasets[4].label = 'Frequency';
                    Chart_1.data.datasets[5].data = p_f1;
                    Chart_1.data.datasets[5].label = 'PF';
                    Chart_1.data.labels = label1;
                    Chart_1.update();

                    Chart_2.data.datasets[0].data = volt2;
                    Chart_2.data.datasets[0].label = 'Volt';
                    Chart_2.data.datasets[1].data = curr2;
                    Chart_2.data.datasets[1].label = 'Current';
                    Chart_2.data.datasets[2].data = power2;
                    Chart_2.data.datasets[2].label = 'Power';
                    Chart_2.data.datasets[3].data = energy2;
                    Chart_2.data.datasets[3].label = 'Energy';
                    Chart_2.data.datasets[4].data = freq2;
                    Chart_2.data.datasets[4].label = 'Frequency';
                    Chart_2.data.datasets[5].data = p_f2;
                    Chart_2.data.datasets[5].label = 'PF';
                    Chart_2.data.labels = label1;
                    Chart_2.update();

                    Chart_3.data.datasets[0].data = volt3;
                    Chart_3.data.datasets[0].label = 'Volt';
                    Chart_3.data.datasets[1].data = curr3;
                    Chart_3.data.datasets[1].label = 'Current';
                    Chart_3.data.datasets[2].data = power3;
                    Chart_3.data.datasets[2].label = 'Power';
                    Chart_3.data.datasets[3].data = energy3;
                    Chart_3.data.datasets[3].label = 'Energy';
                    Chart_3.data.datasets[4].data = freq3;
                    Chart_3.data.datasets[4].label = 'Frequency';
                    Chart_3.data.datasets[5].data = p_f3;
                    Chart_3.data.datasets[5].label = 'PF';
                    Chart_3.data.labels = label1;
                    Chart_3.update();

                    Chart_4.data.datasets[0].data = volt4;
                    Chart_4.data.datasets[0].label = 'Volt';
                    Chart_4.data.datasets[1].data = curr4;
                    Chart_4.data.datasets[1].label = 'Current';
                    Chart_4.data.datasets[2].data = power4;
                    Chart_4.data.datasets[2].label = 'Power';
                    Chart_4.data.datasets[3].data = energy4;
                    Chart_4.data.datasets[3].label = 'Energy';
                    Chart_4.data.datasets[4].data = freq4;
                    Chart_4.data.datasets[4].label = 'Frequency';
                    Chart_4.data.datasets[5].data = p_f4;
                    Chart_4.data.datasets[5].label = 'PF';
                    Chart_4.data.labels = label2;
                    Chart_4.update();

                    Chart_5.data.datasets[0].data = volt5;
                    Chart_5.data.datasets[0].label = 'Volt';
                    Chart_5.data.datasets[1].data = curr5;
                    Chart_5.data.datasets[1].label = 'Current';
                    Chart_5.data.datasets[2].data = power5;
                    Chart_5.data.datasets[2].label = 'Power';
                    Chart_5.data.datasets[3].data = energy5;
                    Chart_5.data.datasets[3].label = 'Energy';
                    Chart_5.data.datasets[4].data = freq5;
                    Chart_5.data.datasets[4].label = 'Frequency';
                    Chart_5.data.datasets[5].data = p_f5;
                    Chart_5.data.datasets[5].label = 'PF';
                    Chart_5.data.labels = label2;
                    Chart_5.update();

                    Chart_6.data.datasets[0].data = volt6;
                    Chart_6.data.datasets[0].label = 'Volt';
                    Chart_6.data.datasets[1].data = curr6;
                    Chart_6.data.datasets[1].label = 'Current';
                    Chart_6.data.datasets[2].data = power6;
                    Chart_6.data.datasets[2].label = 'Power';
                    Chart_6.data.datasets[3].data = energy6;
                    Chart_6.data.datasets[3].label = 'Energy';
                    Chart_6.data.datasets[4].data = freq6;
                    Chart_6.data.datasets[4].label = 'Frequency';
                    Chart_6.data.datasets[5].data = p_f6;
                    Chart_6.data.datasets[5].label = 'PF';
                    Chart_6.data.labels = label2;
                    Chart_6.update();

                    $(".overlay").fadeOut(100);
                    setInterval(updateLastData, 5000); // 1000 = 1 second
                }
                catch (err) {
                    console.log(err.message);
                    overlayNodata();
                }
            },
            error: function () {
                overlayNodata();
            }
        })
    };

    function updateLastData() {
        $.ajax({
            url: "ajax/custom/1_6phase.php",
            type: "post",
            data: {
                skey: sk,
                data: "sec",
                point: 1
            },
            success: function (data) {
                // console.log(data);
                var json = JSON.parse(data);
                let fulltime1 = json.time1[0];
                let fulltime2 = json.time2[0];
                let _eAll;
                if (label1[label1.length - 1] != fulltime1) {

                    if (label1.length > 400) {
                        label1.shift();
                        volt1.shift();
                        curr1.shift();
                        power1.shift();
                        energy1.shift();
                        freq1.shift();
                        p_f1.shift();
                        volt2.shift();
                        curr2.shift();
                        power2.shift();
                        energy2.shift();
                        freq2.shift();
                        p_f2.shift();
                        volt3.shift();
                        curr3.shift();
                        power3.shift();
                        energy3.shift();
                        freq3.shift();
                        p_f3.shift();
                    }
                    // console.log(json.v1[0]);
                    if (json.v1[0] == '0.0') {
                        volt1.push(NaN);
                        curr1.push(NaN);
                        power1.push(NaN);
                        energy1.push(NaN);
                        freq1.push(NaN);
                        p_f1.push(NaN);
                    }
                    else {
                        volt1.push(json.v1[0]);
                        curr1.push(json.i1[0]);
                        power1.push(json.p1[0]);
                        energy1.push(parseFloat(json.e1[0]) - min_e1);
                        freq1.push(json.f1[0]);
                        p_f1.push(json.pf1[0]);
                        _eAll += parseFloat(json.e1[0]) - min_e1;
                    }

                    if (json.v2[0] == '0.0') {
                        volt2.push(NaN);
                        curr2.push(NaN);
                        power2.push(NaN);
                        energy2.push(NaN);
                        freq2.push(NaN);
                        p_f2.push(NaN);
                    }
                    else {
                        volt2.push(json.v2[0]);
                        curr2.push(json.i2[0]);
                        power2.push(json.p2[0]);
                        energy2.push(parseFloat(json.e2[0]) - min_e2);
                        freq2.push(json.f2[0]);
                        p_f2.push(json.pf2[0]);
                        _eAll += parseFloat(json.e2[0]) - min_e2;
                    }

                    if (json.v3[0] == '0.0') {
                        volt3.push(NaN);
                        curr3.push(NaN);
                        power3.push(NaN);
                        energy3.push(NaN);
                        freq3.push(NaN);
                        p_f3.push(NaN);
                    }
                    else {
                        volt3.push(json.v3[0]);
                        curr3.push(json.i3[0]);
                        power3.push(json.p3[0]);
                        energy3.push(parseFloat(json.e3[0]) - min_e3);
                        freq3.push(json.f3[0]);
                        p_f3.push(json.pf3[0]);
                        _eAll += parseFloat(json.e3[0]) - min_e3;
                    }

                    label1.push(json.time1[0]);

                    $("#voltage1").html(json.v1[0]);
                    $("#current1").html(json.i1[0]);
                    $("#power1").html(json.p1[0]);
                    $("#energy1").html((parseFloat(json.e1[0]) - min_e1).toFixed(3));
                    $("#frequency1").html(json.f1[0]);
                    $("#pf1").html(json.pf1[0]);

                    $("#voltage2").html(json.v2[0]);
                    $("#current2").html(json.i2[0]);
                    $("#power2").html(json.p2[0]);
                    $("#energy2").html((parseFloat(json.e2[0]) - min_e2).toFixed(3));
                    $("#frequency2").html(json.f2[0]);
                    $("#pf2").html(json.pf2[0]);

                    $("#voltage3").html(json.v3[0]);
                    $("#current3").html(json.i3[0]);
                    $("#power3").html(json.p3[0]);
                    $("#energy3").html((parseFloat(json.e3[0]) - min_e3).toFixed(3));
                    $("#frequency3").html(json.f3[0]);
                    $("#pf3").html(json.pf3[0]);

                    $("#time").html(json.time1[0]);

                    Chart_1.update();
                    Chart_2.update();
                    Chart_3.update();
                }
                if (label2[label2.length - 1] != fulltime2) {

                    if (label2.length > 400) {
                        label2.shift();
                        volt4.shift();
                        curr4.shift();
                        power4.shift();
                        energy4.shift();
                        freq4.shift();
                        p_f4.shift();
                        volt5.shift();
                        curr5.shift();
                        power5.shift();
                        energy5.shift();
                        freq5.shift();
                        p_f5.shift();
                        volt6.shift();
                        curr6.shift();
                        power6.shift();
                        energy6.shift();
                        freq6.shift();
                        p_f6.shift();
                    }

                    if (json.v4[0] == '0.0') {
                        volt4.push(NaN);
                        curr4.push(NaN);
                        power4.push(NaN);
                        energy4.push(NaN);
                        freq4.push(NaN);
                        p_f4.push(NaN);
                    }
                    else {
                        volt4.push(json.v4[0]);
                        curr4.push(json.i4[0]);
                        power4.push(json.p4[0]);
                        energy4.push(parseFloat(json.e4[0]) - min_e4);
                        freq4.push(json.f4[0]);
                        p_f4.push(json.pf4[0]);
                        _eAll += parseFloat(json.e4[0]) - min_e4;
                    }

                    if (json.v5[0] == '0.0') {
                        volt5.push(NaN);
                        curr5.push(NaN);
                        power5.push(NaN);
                        energy5.push(NaN);
                        freq5.push(NaN);
                        p_f5.push(NaN);
                    }
                    else {
                        volt5.push(json.v5[0]);
                        curr5.push(json.i5[0]);
                        power5.push(json.p5[0]);
                        energy5.push(parseFloat(json.e5[0]) - min_e5);
                        freq5.push(json.f5[0]);
                        p_f5.push(json.pf5[0]);
                        _eAll += parseFloat(json.e5[0]) - min_e5;
                    }

                    if (json.v6[0] == '0.0') {
                        volt6.push(NaN);
                        curr6.push(NaN);
                        power6.push(NaN);
                        energy6.push(NaN);
                        freq6.push(NaN);
                        p_f6.push(NaN);
                    }
                    else {
                        volt6.push(json.v6[0]);
                        curr6.push(json.i6[0]);
                        power6.push(json.p6[0]);
                        energy6.push(parseFloat(json.e6[0]) - min_e6);
                        freq6.push(json.f6[0]);
                        p_f6.push(json.pf6[0]);
                        _eAll += parseFloat(json.e6[0]) - min_e6;
                    }

                    label2.push(json.time2[0]);

                    $("#voltage4").html(json.v4[0]);
                    $("#current4").html(json.i4[0]);
                    $("#power4").html(json.p4[0]);
                    $("#energy4").html((parseFloat(json.e4[0]) - min_e4).toFixed(3));
                    $("#frequency4").html(json.f4[0]);
                    $("#pf4").html(json.pf4[0]);

                    $("#voltage5").html(json.v5[0]);
                    $("#current5").html(json.i5[0]);
                    $("#power5").html(json.p5[0]);
                    $("#energy5").html((parseFloat(json.e5[0]) - min_e5).toFixed(3));
                    $("#frequency5").html(json.f5[0]);
                    $("#pf5").html(json.pf5[0]);

                    $("#voltage6").html(json.v6[0]);
                    $("#current6").html(json.i6[0]);
                    $("#power6").html(json.p6[0]);
                    $("#energy6").html((parseFloat(json.e6[0]) - min_e6).toFixed(3));
                    $("#frequency6").html(json.f6[0]);
                    $("#pf6").html(json.pf6[0]);

                    $("#time").html(json.time2[0]);

                    Chart_4.update();
                    Chart_5.update();
                    Chart_6.update();
                }
                if (json.v1[0] != '0.0' && json.v2[0] != '0.0' && json.v3[0] != '0.0' &&
                    json.v4[0] != '0.0' && json.v5[0] != '0.0' && json.v6[0] != '0.0' &&
                    label1[label1.length - 1] != fulltime1 && label2[label2.length - 1] != fulltime2) {
                    $("#energy_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + _eAll.toFixed(1));
                    $("#bill_112").html("<span style='color:grey'><small>เป็นเงิน </small></span> ฿ " + (calc112Month(_eAll_month) / _eAll_month * _eAll).toFixed(1));
                }
            }
        })
    };


    // for tab select
    $("#overview_option").click(function () {

        $("#value").show();
        $("#io").show();
        $("#chart").show();
        $("#uplot").hide();
        $("#google_table").hide();
        $(".setting-page").hide();
        $('#chart_name').text('Power [watt] & Voltage [v]');
        $("#Charthistory").hide();
        $("#Chart1").show(); $("#Chart2").show(); $("#Chart3").show(); $("#Chart4").show(); $("#Chart5").show(); $("#Chart6").show();
        $("#range_display").hide();
        $(".history_view_class").hide();
        $(".history_option_class").hide();
        $(".month-view-page").hide();
        $(".day-view-page").hide();

        if (label1.length || label2.length) $(".overlay").hide();
        else overlayNodata();

        // Chart_1.data.datasets[0].data = [];
        // Chart_1.data.datasets[1].data = [];
        // Chart_1.data.datasets[2].data = [];
        // Chart_1.data.datasets[3].data = [];
        // Chart_1.data.datasets[4].data = [];
        // Chart_1.data.datasets[5].data = [];
        // Chart_1.update();

        // Chart_1.data.datasets[0].data = volt1;
        // Chart_1.data.datasets[0].label = 'Volt';
        // Chart_1.data.datasets[1].data = curr1;
        // Chart_1.data.datasets[1].label = 'Current';
        // Chart_1.data.datasets[2].data = power1;
        // Chart_1.data.datasets[2].label = 'Power';
        // Chart_1.data.datasets[3].data = energy1;
        // Chart_1.data.datasets[3].label = 'Energy';
        // Chart_1.data.datasets[4].data = freq1;
        // Chart_1.data.datasets[4].label = 'Frequency';
        // Chart_1.data.datasets[5].data = p_f1;
        // Chart_1.data.datasets[5].label = 'PF';
        // Chart_1.data.labels = label;
        // Chart_1.update();


    });

    // for tab select
    $("#history_option, #day_view").click(function () {

        $("#value").hide();
        $("#io").hide();
        $("#chart").show();
        $("#uplot").hide();
        $("#google_table").hide();
        $(".setting-page").hide();
        $("#Charthistory").show();
        $("#Chart1").hide();
        $("#Chart2").hide();
        $("#Chart3").hide();
        $("#Chart4").hide();
        $("#Chart5").hide();
        $("#Chart6").hide();
        $("#range_display").show();
        $(".history_option_class").show();
        $(".history_view_class").hide();
        $(".month-view-page").hide();
        $(".day-view-page").show();

        $("#day_view").addClass("active");
        $("#mouth_view,#history_view").removeClass("active");

        $('#chart_name').text('ค่ากำลังแต่ละเฟสของวันนี้ [watt]');

        Chart_history.options.scales['x'].title.text = "เวลา";
        // alert('today vs yesterday');
        if (label1_day.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/custom/1_6phase.php', {
                skey: sk,
                data: "min",
                range: {
                    start: moment().startOf('days').format('YYYY-MM-DD HH:mm:ss'),
                    end: moment().format('YYYY-MM-DD HH:mm:ss')
                }
            })
                .done(function (response) {
                    // console.log(response);

                    if (response == "nodata") {
                        overlayNodata();
                        return;
                    }

                    $(".overlay").fadeOut(200);
                    if (response == "") return;

                    var json = JSON.parse(response);

                    power_phase1 = json.p1; power_phase2 = json.p2; power_phase3 = json.p3;
                    power_phase4 = json.p4; power_phase5 = json.p5; power_phase6 = json.p6;
                    power_phase1.reverse(); power_phase2.reverse(); power_phase3.reverse();
                    power_phase4.reverse(); power_phase5.reverse(); power_phase6.reverse();

                    json.e1.reverse(); json.e2.reverse(); json.e3.reverse();
                    json.e4.reverse(); json.e5.reverse(); json.e6.reverse();
                    let fulltime1 = json.time1; let fulltime2 = json.time2;
                    fulltime1.reverse(); fulltime2.reverse();
                    label1_day = [];
                    let energy_minute = [];
                    let bill_minute = [];
                    for (var count = 0; count < fulltime1.length; count++) {
                        let timesplit = String(fulltime1[count]).split(" ");
                        label1_day.push(timesplit[1]);
                        let this_energy = 0;

                        this_energy = parseFloat(json.e1) + parseFloat(json.e2) + parseFloat(json.e3) - (parseFloat(min_e1) + parseFloat(min_e2) + parseFloat(min_e3));

                        if (json.e4.length) {
                            this_energy += parseFloat(json.e5) + parseFloat(json.e4) + parseFloat(json.e6) - (parseFloat(min_e4) + parseFloat(min_e5) + parseFloat(min_e6));
                        }
                        energy_minute.push(this_energy);
                        bill_minute.push(this_energy * kwh_per_energy);
                    }

                    Chart_history.type = 'line';
                    Chart_history.data.datasets[0].data = power_phase1;
                    Chart_history.data.datasets[0].label = 'Phase1';
                    Chart_history.data.datasets[0].type = 'line';
                    Chart_history.data.datasets[1].data = power_phase2;
                    Chart_history.data.datasets[1].label = 'Phase2';
                    Chart_history.data.datasets[1].type = 'line';
                    Chart_history.data.datasets[2].data = power_phase3;
                    Chart_history.data.datasets[2].label = 'Phase3';
                    Chart_history.data.datasets[2].type = 'line';
                    Chart_history.data.datasets[3].data = power_phase4;
                    Chart_history.data.datasets[3].label = 'Phase4';
                    Chart_history.data.datasets[3].type = 'line';
                    Chart_history.data.datasets[4].data = power_phase5;
                    Chart_history.data.datasets[4].label = 'Phase5';
                    Chart_history.data.datasets[4].type = 'line';
                    Chart_history.data.datasets[5].data = power_phase6;
                    Chart_history.data.datasets[5].label = 'Phase6';
                    Chart_history.data.datasets[5].type = 'line';
                    Chart_history.data.labels = label1_day;
                    Chart_history.update();

                    Chart_minute_bill.data.datasets[0].data = energy_minute;
                    Chart_minute_bill.data.datasets[0].label = 'หน่วย';
                    Chart_minute_bill.data.datasets[1].data = bill_minute;
                    Chart_minute_bill.data.datasets[1].label = 'ค่าไฟ';
                    Chart_minute_bill.data.labels = label1_day;
                    Chart_minute_bill.update();

                    $("#day_csvdownload").click(function () {
                        var data = [["time", "kWh", "bill"]];

                        // console.log(label_history.length);return;

                        for (var count = 0; count < label1_day.length; count++) {
                            data.push([label1_day[count], energy_minute[count], bill_minute[count]]);
                            // console.log([label_history[count], volt_history[count], curr_history[count], power_history[count], energy_history[count], freq_history[count], p_f_history[count]]);
                        }

                        let csvContent = "data:text/csv;charset=utf-8," +
                            data.map(e => e.join(",")).join("\n");

                        var encodedUri = encodeURI(csvContent);
                        var link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", label1_day[0] + "_to_" + label1_day[label1_day.length - 1] + "_data.csv");
                        document.body.appendChild(link);
                        link.click();
                    });

                })
                .fail(function () {
                    // alert("An error occurred");
                    $(".overlay").fadeOut(200);
                    $('.toast').removeClass('bg-success bg-warning').addClass('bg-danger');
                    // $('.toast').addClass('bg-warning');
                    $('#toast-body').text("โหลดข้อมูลไม่สำเร็จ โปรดลองใหม่อีกครั้ง");
                    $('.toast').toast('show');
                });
        } else {

            Chart_history.data.datasets[0].data = power_phase1;
            Chart_history.data.datasets[0].label = 'Phase1';
            Chart_history.data.datasets[0].type = 'line';
            Chart_history.data.datasets[1].data = power_phase2;
            Chart_history.data.datasets[1].label = 'Phase2';
            Chart_history.data.datasets[1].type = 'line';
            Chart_history.data.datasets[2].data = power_phase3;
            Chart_history.data.datasets[2].label = 'Phase3';
            Chart_history.data.datasets[2].type = 'line';
            Chart_history.data.datasets[3].data = power_phase4;
            Chart_history.data.datasets[3].label = 'Phase4';
            Chart_history.data.datasets[3].type = 'line';
            Chart_history.data.datasets[4].data = power_phase5;
            Chart_history.data.datasets[4].label = 'Phase5';
            Chart_history.data.datasets[4].type = 'line';
            Chart_history.data.datasets[5].data = power_phase6;
            Chart_history.data.datasets[5].label = 'Phase6';
            Chart_history.data.datasets[5].type = 'line';
            Chart_history.data.labels = label1_day;

            Chart_history.update();

        }
    });

    // for tab select
    $("#mouth_view").click(function () {

        $("#chart").show();
        $("#uplot").hide();
        $("#google_table").hide();
        $(".setting-page").hide();
        $("#Charthistory").show();
        $("#Chart1").hide();
        $("#Chart2").hide();
        $("#Chart3").hide();
        $("#Chart4").hide();
        $("#Chart5").hide();
        $("#Chart6").hide();
        $(".history_option_class").show();
        $(".history_view_class").hide();
        $(".month-view-page").show();
        $(".day-view-page").hide();

        Chart_history.options.scales['x'].title.text = "วันที่";
        $('#chart_name').text('หน่วยไฟฟ้าแต่ละวัน [kWh]');

        if (label_mouth.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/custom/1_6phase.php', {
                skey: sk,
                data: "day",
                range: {
                    start: moment().subtract(2, 'month').startOf('month').format('YYYY-MM-DD'),
                    end: moment().format('YYYY-MM-DD')
                }
            })
                .done(function (response) {
                    // console.log(response);
                    if (response == "nodata") {
                        $(".overlay").hide();
                        return;
                    }

                    $(".overlay").fadeOut(100);
                    if (response == "") return;

                    var json = JSON.parse(response);


                    energy_phase1 = json.e1; energy_phase2 = json.e2; energy_phase3 = json.e3;
                    energy_phase4 = json.e4; energy_phase5 = json.e5; energy_phase6 = json.e6;
                    energy_phase1.reverse(); energy_phase2.reverse(); energy_phase3.reverse();
                    energy_phase4.reverse(); energy_phase5.reverse(); energy_phase6.reverse();

                    var sum_all_energy = 0;

                    var fulldate = json.time1;
                    fulldate.reverse();
                    label_mouth = [];
                    label_mouth = fulldate;
                    for (var count = 0; count < fulldate.length; count++) {
                        // let timesplit = String(fulldate[count]).split("-");
                        // label_mouth.push(timesplit[2]);

                        sum_all_energy += parseFloat(json.e1[count]) + parseFloat(json.e2[count]) + parseFloat(json.e3[count]);
                        // day_bill.push(parseFloat(json.e1[count]) + parseFloat(json.e2[count]) + parseFloat(json.e3[count]) + parseFloat(json.e4[count]) + parseFloat(json.e5[count]) + parseFloat(json.e6[count]));
                    }

                    for (var count = 0; count < json.time2.length; count++) {
                        sum_all_energy += parseFloat(json.e4[count]) + parseFloat(json.e5[count]) + parseFloat(json.e6[count])
                    }

                    let value_per_energy = calc112Month(sum_all_energy) / sum_all_energy;
                    $('#month_energy').html(sum_all_energy.toFixed(1));
                    $('#month_bill').html("฿ " + calc112Month(sum_all_energy).toFixed(1));

                    var day_bill = [];
                    var day_use_energy = [];
                    for (var count = 0; count < fulldate.length; count++) {
                        day_use_energy.push(parseFloat(json.e1[count]) + parseFloat(json.e2[count]) + parseFloat(json.e3[count]) + parseFloat(json.e4[count]) + parseFloat(json.e5[count]) + parseFloat(json.e6[count]));
                        day_bill.push((parseFloat(json.e1[count]) + parseFloat(json.e2[count]) + parseFloat(json.e3[count]) + parseFloat(json.e4[count]) + parseFloat(json.e5[count]) + parseFloat(json.e6[count])) * value_per_energy);
                    }


                    Chart_history.data.datasets[0].data = energy_phase1;
                    Chart_history.data.datasets[0].label = 'Phase1';
                    Chart_history.data.datasets[1].data = energy_phase2;
                    Chart_history.data.datasets[1].label = 'Phase2';
                    Chart_history.data.datasets[2].data = energy_phase3;
                    Chart_history.data.datasets[2].label = 'Phase3';
                    Chart_history.data.datasets[3].data = energy_phase1;
                    Chart_history.data.datasets[3].label = 'Phase4';
                    Chart_history.data.datasets[4].data = energy_phase2;
                    Chart_history.data.datasets[4].label = 'Phase5';
                    Chart_history.data.datasets[5].data = energy_phase3;
                    Chart_history.data.datasets[5].label = 'Phase6';
                    Chart_history.data.labels = label_mouth;
                    Chart_history.data.datasets[0].type = 'bar';
                    Chart_history.data.datasets[1].type = 'bar';
                    Chart_history.data.datasets[2].type = 'bar';
                    Chart_history.data.datasets[3].type = 'bar';
                    Chart_history.data.datasets[4].type = 'bar';
                    Chart_history.data.datasets[5].type = 'bar';
                    Chart_history.update();

                    Chart_day_bill.data.datasets[0].data = day_use_energy;
                    Chart_day_bill.data.datasets[0].label = 'หน่วยที่ใช้';
                    Chart_day_bill.data.datasets[1].data = day_bill;
                    Chart_day_bill.data.datasets[1].label = 'ค่าไฟ';
                    Chart_day_bill.data.labels = label_mouth;
                    Chart_day_bill.update();

                    $("#month_csvdownload").click(function () {
                        var data = [["date", "kWh", "bill"]];

                        // console.log(label_history.length);return;

                        for (var count = 0; count < label_mouth.length; count++) {
                            data.push([label_mouth[count], day_use_energy[count], day_bill[count]]);
                            // console.log([label_history[count], volt_history[count], curr_history[count], power_history[count], energy_history[count], freq_history[count], p_f_history[count]]);
                        }

                        let csvContent = "data:text/csv;charset=utf-8," +
                            data.map(e => e.join(",")).join("\n");

                        var encodedUri = encodeURI(csvContent);
                        var link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", label_mouth[0] + "_to_" + label_mouth[label_mouth.length - 1] + "_data.csv");
                        document.body.appendChild(link);
                        link.click();
                    });
                })
                .fail(function () {

                    $(".overlay").fadeOut(200);
                    $('.toast').removeClass('bg-success bg-warning').addClass('bg-danger');
                    $('#toast-body').text("โหลดข้อมูลไม่สำเร็จ โปรดลองใหม่อีกครั้ง");
                    $('.toast').toast('show');

                });
        } else {

            Chart_history.data.datasets[0].data = energy_phase1;
            Chart_history.data.datasets[0].label = 'Phase1';
            Chart_history.data.datasets[1].data = energy_phase2;
            Chart_history.data.datasets[1].label = 'Phase2';
            Chart_history.data.datasets[2].data = energy_phase3;
            Chart_history.data.datasets[2].label = 'Phase3';
            Chart_history.data.datasets[3].data = energy_phase1;
            Chart_history.data.datasets[3].label = 'Phase4';
            Chart_history.data.datasets[4].data = energy_phase2;
            Chart_history.data.datasets[4].label = 'Phase5';
            Chart_history.data.datasets[5].data = energy_phase3;
            Chart_history.data.datasets[5].label = 'Phase6';
            Chart_history.data.labels = label_mouth;
            Chart_history.data.datasets[0].type = 'bar';
            Chart_history.data.datasets[1].type = 'bar';
            Chart_history.data.datasets[2].type = 'bar';
            Chart_history.data.datasets[3].type = 'bar';
            Chart_history.data.datasets[4].type = 'bar';
            Chart_history.data.datasets[5].type = 'bar';

            Chart_history.update();
        }

    });

    // for tab select
    $("#history_view").click(function () {

        $("#chart").show();
        $(".setting-page").hide();
        $("#uplot").show();
        $("#google_table").show();
        $("#Chart1").hide();
        $("#Chart2").hide();
        $("#Chart3").hide();
        $("#Chart4").hide();
        $("#Chart5").hide();
        $("#Chart6").hide();
        $("#Charthistory").hide();
        $("#uplot").show();
        $(".history_option_class").show();
        $(".history_view_class").show();
        $(".month-view-page").hide();
        $(".day-view-page").hide();

        if (typeof uplot1 === 'undefined') cbTimerange(moment().startOf('days'), moment());

    });

    function wheelZoomPlugin(opts) {
        let factor = opts.factor || 0.75;

        let xMin, xMax, yMin, yMax, xRange, yRange;

        function clamp(nRange, nMin, nMax, fRange, fMin, fMax) {
            if (nRange > fRange) {
                nMin = fMin;
                nMax = fMax;
            }
            else if (nMin < fMin) {
                nMin = fMin;
                nMax = fMin + nRange;
            }
            else if (nMax > fMax) {
                nMax = fMax;
                nMin = fMax - nRange;
            }

            return [nMin, nMax];
        }

        return {
            hooks: {
                ready: u => {
                    xMin = u.scales.x.min;
                    xMax = u.scales.x.max;
                    yMin = u.scales.y.min;
                    yMax = u.scales.y.max;

                    xRange = xMax - xMin;
                    yRange = yMax - yMin;

                    let over = u.over;
                    let rect = over.getBoundingClientRect();

                    // wheel drag pan
                    over.addEventListener("mousedown", e => {
                        if (e.button == 1) {
                            //	plot.style.cursor = "move";
                            e.preventDefault();

                            let left0 = e.clientX;
                            //	let top0 = e.clientY;

                            let scXMin0 = u.scales.x.min;
                            let scXMax0 = u.scales.x.max;

                            let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');

                            function onmove(e) {
                                e.preventDefault();

                                let left1 = e.clientX;
                                //	let top1 = e.clientY;

                                let dx = xUnitsPerPx * (left1 - left0);

                                u.setScale('x', {
                                    min: scXMin0 - dx,
                                    max: scXMax0 - dx,
                                });
                            }

                            function onup(e) {
                                document.removeEventListener("mousemove", onmove);
                                document.removeEventListener("mouseup", onup);
                            }

                            document.addEventListener("mousemove", onmove);
                            document.addEventListener("mouseup", onup);
                        }
                    });

                    // wheel scroll zoom
                    over.addEventListener("wheel", e => {
                        e.preventDefault();

                        let { left, top } = u.cursor;

                        let leftPct = left / rect.width;
                        let btmPct = 1 - top / rect.height;
                        let xVal = u.posToVal(left, "x");
                        let yVal = u.posToVal(top, "y");
                        let oxRange = u.scales.x.max - u.scales.x.min;
                        let oyRange = u.scales.y.max - u.scales.y.min;

                        let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
                        let nxMin = xVal - leftPct * nxRange;
                        let nxMax = nxMin + nxRange;
                        [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

                        let nyRange = e.deltaY < 0 ? oyRange * factor : oyRange / factor;
                        let nyMin = yVal - btmPct * nyRange;
                        let nyMax = nyMin + nyRange;
                        [nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);

                        u.batch(() => {
                            u.setScale("x", {
                                min: nxMin,
                                max: nxMax,
                            });

                            u.setScale("y", {
                                min: nyMin,
                                max: nyMax,
                            });
                        });
                    });
                }
            }
        };
    }

    function uplotupdate() {

        function getSize(elementId) {
            return {
                width: document.getElementById(elementId).offsetWidth,
                height: document.getElementById(elementId).offsetHeight - 50,
            }
        }

        let data1 = [label1_timestamp, volt1_history, curr1_history, power1_history, energy1_history, freq1_history, p_f1_history];
        let data2 = [label1_timestamp, volt2_history, curr2_history, power2_history, energy2_history, freq2_history, p_f2_history];
        let data3 = [label1_timestamp, volt3_history, curr3_history, power3_history, energy3_history, freq3_history, p_f3_history];
        let data4 = [label2_timestamp, volt4_history, curr4_history, power4_history, energy4_history, freq4_history, p_f4_history];
        let data5 = [label2_timestamp, volt5_history, curr5_history, power5_history, energy5_history, freq5_history, p_f5_history];
        let data6 = [label2_timestamp, volt6_history, curr6_history, power6_history, energy6_history, freq6_history, p_f6_history];

        if (typeof uplot1 === 'undefined') {

            const optsAreaChart1 = {
                ...getSize('areaChart1'),
                plugins: [
                    wheelZoomPlugin({ factor: 0.75 })
                ],
                title: "Phase1",
                series: [
                    {},
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "Volt",
                        scale: "v",
                        value: (self, rawValue) => rawValue.toFixed(1) + " v",

                        stroke: 'rgba(210, 214, 222, 1)',
                        width: 2,
                        fill: 'rgba(210, 214, 222, 0.1)'
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Current",
                        scale: "i",
                        value: (self, rawValue) => rawValue.toFixed(1) + " A",

                        stroke: '#f05d23',
                        width: 2,
                        fill: '#f05d2350'
                    },
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "power",
                        scale: "p",
                        value: (self, rawValue) => rawValue.toFixed(1) + " W",

                        stroke: "rgba(60,141,188,1)",
                        width: 2,
                        fill: "rgba(60,141,188,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Energy",
                        scale: "e",
                        value: (self, rawValue) => rawValue.toFixed(1) + " kWh",

                        stroke: "#b643cd",
                        width: 1,
                        fill: "#b643cd20"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Frequency",
                        scale: "f",
                        value: (self, rawValue) => rawValue.toFixed(1) + " Hz",

                        stroke: "rgba(153,153,0,1)",
                        width: 1,
                        fill: "rgba(153,153,0,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "pf",
                        scale: "pf",
                        value: (self, rawValue) => rawValue.toFixed(1),

                        stroke: "rgba(0,141,0,1)",
                        width: 1,
                        fill: "rgba(0,141,0,0.3)"
                    },
                ],
                axes: [
                    {
                        label: "เวลา",
                        // labelSize: 20,
                        stroke: "white",
                    },
                    {
                        scale: "v",
                        label: "Voltage",
                        stroke: "white",
                    }, {
                        scale: "i",
                        label: "Current",
                        stroke: "white",
                    }, {
                        scale: "p",
                        label: "Power",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "e",
                        label: "Energy",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "f",
                        label: "Frequency",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "pf",
                        label: "pf",
                        stroke: "white",
                    },
                ],
            };

            const optsAreaChart2 = {
                ...getSize('areaChart2'),
                plugins: [
                    wheelZoomPlugin({ factor: 0.75 })
                ],
                title: "Phase2",
                series: [
                    {},
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "Volt",
                        scale: "v",
                        value: (self, rawValue) => rawValue.toFixed(1) + " v",

                        stroke: 'rgba(210, 214, 222, 1)',
                        width: 2,
                        fill: 'rgba(210, 214, 222, 0.1)'
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Current",
                        scale: "i",
                        value: (self, rawValue) => rawValue.toFixed(1) + " A",

                        stroke: '#f05d23',
                        width: 2,
                        fill: '#f05d2350'
                    },
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "power",
                        scale: "p",
                        value: (self, rawValue) => rawValue.toFixed(1) + " W",

                        stroke: "rgba(60,141,188,1)",
                        width: 2,
                        fill: "rgba(60,141,188,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Energy",
                        scale: "e",
                        value: (self, rawValue) => rawValue.toFixed(1) + " kWh",

                        stroke: "#b643cd",
                        width: 1,
                        fill: "#b643cd20"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Frequency",
                        scale: "f",
                        value: (self, rawValue) => rawValue.toFixed(1) + " Hz",

                        stroke: "rgba(153,153,0,1)",
                        width: 1,
                        fill: "rgba(153,153,0,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "pf",
                        scale: "pf",
                        value: (self, rawValue) => rawValue.toFixed(1),

                        stroke: "rgba(0,141,0,1)",
                        width: 1,
                        fill: "rgba(0,141,0,0.3)"
                    },
                ],
                axes: [
                    {
                        label: "เวลา",
                        // labelSize: 20,
                        stroke: "white",
                    },
                    {
                        scale: "v",
                        label: "Voltage",
                        stroke: "white",
                    }, {
                        scale: "i",
                        label: "Current",
                        stroke: "white",
                    }, {
                        scale: "p",
                        label: "Power",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "e",
                        label: "Energy",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "f",
                        label: "Frequency",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "pf",
                        label: "pf",
                        stroke: "white",
                    },
                ],
            };

            const optsAreaChart3 = {
                ...getSize('areaChart3'),
                plugins: [
                    wheelZoomPlugin({ factor: 0.75 })
                ],
                title: "Phase3",
                series: [
                    {},
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "Volt",
                        scale: "v",
                        value: (self, rawValue) => rawValue.toFixed(1) + " v",

                        stroke: 'rgba(210, 214, 222, 1)',
                        width: 2,
                        fill: 'rgba(210, 214, 222, 0.1)'
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Current",
                        scale: "i",
                        value: (self, rawValue) => rawValue.toFixed(1) + " A",

                        stroke: '#f05d23',
                        width: 2,
                        fill: '#f05d2350'
                    },
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "power",
                        scale: "p",
                        value: (self, rawValue) => rawValue.toFixed(1) + " W",

                        stroke: "rgba(60,141,188,1)",
                        width: 2,
                        fill: "rgba(60,141,188,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Energy",
                        scale: "e",
                        value: (self, rawValue) => rawValue.toFixed(1) + " kWh",

                        stroke: "#b643cd",
                        width: 1,
                        fill: "#b643cd20"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Frequency",
                        scale: "f",
                        value: (self, rawValue) => rawValue.toFixed(1) + " Hz",

                        stroke: "rgba(153,153,0,1)",
                        width: 1,
                        fill: "rgba(153,153,0,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "pf",
                        scale: "pf",
                        value: (self, rawValue) => rawValue.toFixed(1),

                        stroke: "rgba(0,141,0,1)",
                        width: 1,
                        fill: "rgba(0,141,0,0.3)"
                    },
                ],
                axes: [
                    {
                        label: "เวลา",
                        // labelSize: 20,
                        stroke: "white",
                    },
                    {
                        scale: "v",
                        label: "Voltage",
                        stroke: "white",
                    }, {
                        scale: "i",
                        label: "Current",
                        stroke: "white",
                    }, {
                        scale: "p",
                        label: "Power",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "e",
                        label: "Energy",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "f",
                        label: "Frequency",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "pf",
                        label: "pf",
                        stroke: "white",
                    },
                ],
            };

            const optsAreaChart4 = {
                ...getSize('areaChart4'),
                plugins: [
                    wheelZoomPlugin({ factor: 0.75 })
                ],
                title: "Phase4",
                series: [
                    {},
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "Volt",
                        scale: "v",
                        value: (self, rawValue) => rawValue.toFixed(1) + " v",

                        stroke: 'rgba(210, 214, 222, 1)',
                        width: 2,
                        fill: 'rgba(210, 214, 222, 0.1)'
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Current",
                        scale: "i",
                        value: (self, rawValue) => rawValue.toFixed(1) + " A",

                        stroke: '#f05d23',
                        width: 2,
                        fill: '#f05d2350'
                    },
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "power",
                        scale: "p",
                        value: (self, rawValue) => rawValue.toFixed(1) + " W",

                        stroke: "rgba(60,141,188,1)",
                        width: 2,
                        fill: "rgba(60,141,188,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Energy",
                        scale: "e",
                        value: (self, rawValue) => rawValue.toFixed(1) + " kWh",

                        stroke: "#b643cd",
                        width: 1,
                        fill: "#b643cd20"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Frequency",
                        scale: "f",
                        value: (self, rawValue) => rawValue.toFixed(1) + " Hz",

                        stroke: "rgba(153,153,0,1)",
                        width: 1,
                        fill: "rgba(153,153,0,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "pf",
                        scale: "pf",
                        value: (self, rawValue) => rawValue.toFixed(1),

                        stroke: "rgba(0,141,0,1)",
                        width: 1,
                        fill: "rgba(0,141,0,0.3)"
                    },
                ],
                axes: [
                    {
                        label: "เวลา",
                        // labelSize: 20,
                        stroke: "white",
                    },
                    {
                        scale: "v",
                        label: "Voltage",
                        stroke: "white",
                    }, {
                        scale: "i",
                        label: "Current",
                        stroke: "white",
                    }, {
                        scale: "p",
                        label: "Power",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "e",
                        label: "Energy",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "f",
                        label: "Frequency",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "pf",
                        label: "pf",
                        stroke: "white",
                    },
                ],
            };

            const optsAreaChart5 = {
                ...getSize('areaChart5'),
                plugins: [
                    wheelZoomPlugin({ factor: 0.75 })
                ],
                title: "Phase5",
                series: [
                    {},
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "Volt",
                        scale: "v",
                        value: (self, rawValue) => rawValue.toFixed(1) + " v",

                        stroke: 'rgba(210, 214, 222, 1)',
                        width: 2,
                        fill: 'rgba(210, 214, 222, 0.1)'
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Current",
                        scale: "i",
                        value: (self, rawValue) => rawValue.toFixed(1) + " A",

                        stroke: '#f05d23',
                        width: 2,
                        fill: '#f05d2350'
                    },
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "power",
                        scale: "p",
                        value: (self, rawValue) => rawValue.toFixed(1) + " W",

                        stroke: "rgba(60,141,188,1)",
                        width: 2,
                        fill: "rgba(60,141,188,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Energy",
                        scale: "e",
                        value: (self, rawValue) => rawValue.toFixed(1) + " kWh",

                        stroke: "#b643cd",
                        width: 1,
                        fill: "#b643cd20"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Frequency",
                        scale: "f",
                        value: (self, rawValue) => rawValue.toFixed(1) + " Hz",

                        stroke: "rgba(153,153,0,1)",
                        width: 1,
                        fill: "rgba(153,153,0,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "pf",
                        scale: "pf",
                        value: (self, rawValue) => rawValue.toFixed(1),

                        stroke: "rgba(0,141,0,1)",
                        width: 1,
                        fill: "rgba(0,141,0,0.3)"
                    },
                ],
                axes: [
                    {
                        label: "เวลา",
                        // labelSize: 20,
                        stroke: "white",
                    },
                    {
                        scale: "v",
                        label: "Voltage",
                        stroke: "white",
                    }, {
                        scale: "i",
                        label: "Current",
                        stroke: "white",
                    }, {
                        scale: "p",
                        label: "Power",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "e",
                        label: "Energy",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "f",
                        label: "Frequency",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "pf",
                        label: "pf",
                        stroke: "white",
                    },
                ],
            };

            const optsAreaChart6 = {
                ...getSize('areaChart6'),
                plugins: [
                    wheelZoomPlugin({ factor: 0.75 })
                ],
                title: "Phase6",
                series: [
                    {},
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "Volt",
                        scale: "v",
                        value: (self, rawValue) => rawValue.toFixed(1) + " v",

                        stroke: 'rgba(210, 214, 222, 1)',
                        width: 2,
                        fill: 'rgba(210, 214, 222, 0.1)'
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Current",
                        scale: "i",
                        value: (self, rawValue) => rawValue.toFixed(1) + " A",

                        stroke: '#f05d23',
                        width: 2,
                        fill: '#f05d2350'
                    },
                    {
                        // initial toggled state (optional)
                        show: true,

                        // spanGaps: true,

                        // in-legend display
                        label: "power",
                        scale: "p",
                        value: (self, rawValue) => rawValue.toFixed(1) + " W",

                        stroke: "rgba(60,141,188,1)",
                        width: 2,
                        fill: "rgba(60,141,188,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Energy",
                        scale: "e",
                        value: (self, rawValue) => rawValue.toFixed(1) + " kWh",

                        stroke: "#b643cd",
                        width: 1,
                        fill: "#b643cd20"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "Frequency",
                        scale: "f",
                        value: (self, rawValue) => rawValue.toFixed(1) + " Hz",

                        stroke: "rgba(153,153,0,1)",
                        width: 1,
                        fill: "rgba(153,153,0,0.3)"
                    },
                    {
                        // initial toggled state (optional)
                        show: false,

                        // spanGaps: true,

                        // in-legend display
                        label: "pf",
                        scale: "pf",
                        value: (self, rawValue) => rawValue.toFixed(1),

                        stroke: "rgba(0,141,0,1)",
                        width: 1,
                        fill: "rgba(0,141,0,0.3)"
                    },
                ],
                axes: [
                    {
                        label: "เวลา",
                        // labelSize: 20,
                        stroke: "white",
                    },
                    {
                        scale: "v",
                        label: "Voltage",
                        stroke: "white",
                    }, {
                        scale: "i",
                        label: "Current",
                        stroke: "white",
                    }, {
                        scale: "p",
                        label: "Power",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "e",
                        label: "Energy",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "f",
                        label: "Frequency",
                        stroke: "white",
                    }, {
                        side: 1,
                        scale: "pf",
                        label: "pf",
                        stroke: "white",
                    },
                ],
            };

            uplot1 = new uPlot(optsAreaChart1, data1, document.getElementById('areaChart1'));
            uplot2 = new uPlot(optsAreaChart2, data2, document.getElementById('areaChart2'));
            uplot3 = new uPlot(optsAreaChart3, data3, document.getElementById('areaChart3'));
            uplot4 = new uPlot(optsAreaChart4, data4, document.getElementById('areaChart4'));
            uplot5 = new uPlot(optsAreaChart5, data5, document.getElementById('areaChart5'));
            uplot6 = new uPlot(optsAreaChart6, data6, document.getElementById('areaChart6'));

            window.addEventListener("resize", e => {
                uplot1.setSize(getSize('areaChart1'));
                uplot2.setSize(getSize('areaChart2'));
                uplot3.setSize(getSize('areaChart3'));
            });
        }
        else {
            uplot1.setData(data1);
            uplot2.setData(data2);
            uplot3.setData(data3);
            uplot4.setData(data4);
            uplot5.setData(data5);
            uplot6.setData(data6);
        }
    }

    function cbTimerange(start, end) {

        // alert("hello from cbTimerange");
        $('.daterange span').html(start.format('YYYY-MM-DD HH:mm') + ' - ' + end.format('YYYY-MM-DD HH:mm'));

        let minutesdiff = end.diff(start, 'minutes');
        let minutesfromnow = moment().diff(start, 'minutes');
        var datarange;
        if (minutesdiff <= 60 * 24 * 2 && minutesfromnow <= 60 * 24 * 2) datarange = "sec";
        else if (minutesdiff <= 60 * 24 * 90 && minutesfromnow <= 60 * 24 * 90) datarange = "min";
        else if (minutesdiff <= 60 * 24 * 31 * 3 && minutesfromnow <= 60 * 24 * 31 * 3) datarange = "hr";
        else datarange = "day";

        $(".overlay").show(100);

        $.ajax({
            url: "ajax/custom/1_6phase.php",
            type: "post",
            data: {
                skey: sk,
                data: datarange,
                range: {
                    start: start.format('YYYY-MM-DD HH:mm'),
                    end: end.format('YYYY-MM-DD HH:mm')
                }
            },
            success: function (data) {
                // console.log(data);
                if (data == "nodata") {
                    $(".overlay").hide();
                    return;
                }

                var json = JSON.parse(data);

                // console.log(json.time);
                // console.log(json.power);

                // reverse for uplot
                json.v1.reverse(); json.i1.reverse(); json.p1.reverse(); json.e1.reverse(); json.f1.reverse(); json.pf1.reverse();
                json.v2.reverse(); json.i2.reverse(); json.p2.reverse(); json.e2.reverse(); json.f2.reverse(); json.pf2.reverse();
                json.v3.reverse(); json.i3.reverse(); json.p3.reverse(); json.e3.reverse(); json.f3.reverse(); json.pf3.reverse();
                json.v4.reverse(); json.i4.reverse(); json.p4.reverse(); json.e4.reverse(); json.f4.reverse(); json.pf4.reverse();
                json.v5.reverse(); json.i5.reverse(); json.p5.reverse(); json.e5.reverse(); json.f5.reverse(); json.pf5.reverse();
                json.v6.reverse(); json.i6.reverse(); json.p6.reverse(); json.e6.reverse(); json.f6.reverse(); json.pf6.reverse();
                json.time1.reverse(); json.time2.reverse();

                volt1_history = []; curr1_history = []; power1_history = []; energy1_history = []; freq1_history = []; p_f1_history = [];
                volt2_history = []; curr2_history = []; power2_history = []; energy2_history = []; freq2_history = []; p_f2_history = [];
                volt3_history = []; curr3_history = []; power3_history = []; energy3_history = []; freq3_history = []; p_f3_history = [];
                volt4_history = []; curr4_history = []; power4_history = []; energy4_history = []; freq4_history = []; p_f4_history = [];
                volt5_history = []; curr5_history = []; power5_history = []; energy5_history = []; freq5_history = []; p_f5_history = [];
                volt6_history = []; curr6_history = []; power6_history = []; energy6_history = []; freq6_history = []; p_f6_history = [];

                var min_energy1_history = parseFloat(json.e1[0]);
                var min_energy2_history = parseFloat(json.e2[0]);
                var min_energy3_history = parseFloat(json.e3[0]);
                var min_energy4_history = parseFloat(json.e4[0]);
                var min_energy5_history = parseFloat(json.e5[0]);
                var min_energy6_history = parseFloat(json.e6[0]);
                for (var count = 0; count < json.time1.length; count++) {

                    volt1_history.push(parseFloat(json.v1[count]));
                    curr1_history.push(parseFloat(json.i1[count]));
                    power1_history.push(parseFloat(json.p1[count]));
                    energy1_history.push(parseFloat(json.e1[count]) - min_energy1_history);
                    freq1_history.push(parseFloat(json.f1[count]));
                    p_f1_history.push(parseFloat(json.pf1[count]));

                    volt2_history.push(parseFloat(json.v2[count]));
                    curr2_history.push(parseFloat(json.i2[count]));
                    power2_history.push(parseFloat(json.p2[count]));
                    energy2_history.push(parseFloat(json.e2[count]) - min_energy2_history);
                    freq2_history.push(parseFloat(json.f2[count]));
                    p_f2_history.push(parseFloat(json.pf2[count]));

                    volt3_history.push(parseFloat(json.v3[count]));
                    curr3_history.push(parseFloat(json.i3[count]));
                    power3_history.push(parseFloat(json.p3[count]));
                    energy3_history.push(parseFloat(json.e3[count]) - min_energy3_history);
                    freq3_history.push(parseFloat(json.f3[count]));
                    p_f3_history.push(parseFloat(json.pf3[count]));
                }
                for (var count = 0; count < json.time2.length; count++) {
                    volt4_history.push(parseFloat(json.v4[count]));
                    curr4_history.push(parseFloat(json.i4[count]));
                    power4_history.push(parseFloat(json.p4[count]));
                    energy4_history.push(parseFloat(json.e4[count]) - min_energy4_history);
                    freq4_history.push(parseFloat(json.f4[count]));
                    p_f4_history.push(parseFloat(json.pf4[count]));

                    volt5_history.push(parseFloat(json.v5[count]));
                    curr5_history.push(parseFloat(json.i5[count]));
                    power5_history.push(parseFloat(json.p5[count]));
                    energy5_history.push(parseFloat(json.e5[count]) - min_energy5_history);
                    freq5_history.push(parseFloat(json.f5[count]));
                    p_f5_history.push(parseFloat(json.pf5[count]));

                    volt6_history.push(parseFloat(json.v6[count]));
                    curr6_history.push(parseFloat(json.i6[count]));
                    power6_history.push(parseFloat(json.p6[count]));
                    energy6_history.push(parseFloat(json.e6[count]) - min_energy6_history);
                    freq6_history.push(parseFloat(json.f6[count]));
                    p_f6_history.push(parseFloat(json.pf6[count]));
                }

                // for save as csv
                label1_history = json.time1;

                // convert string to time stamp for uplot
                label1_timestamp = [];
                for (var count = 0; count < json.time1.length; count++) {
                    label1_timestamp.push(Date.parse(json.time1[count]) / 1000);
                }

                // for save as csv
                label2_history = json.time2;

                // convert string to time stamp for uplot
                label2_timestamp = [];
                for (var count = 0; count < json.time2.length; count++) {
                    label2_timestamp.push(Date.parse(json.time2[count]) / 1000);
                }

                // console.log(power_history);
                // console.log(label_timestamp);

                $(".overlay").fadeOut(100);

                if (label1_history.length != 0 || label2_history.length != 0) {
                    uplotupdate();
                }

            },
            error: function () {
                // alert("An error occurred");
                $(".overlay").fadeOut(200);
                $('.toast').removeClass('bg-success bg-warning').addClass('bg-danger');
                // $('.toast').addClass('bg-warning');
                $('#toast-body').text("โหลดข้อมูลไม่สำเร็จ โปรดลองใหม่อีกครั้ง");
                $('.toast').toast('show');
            }
        })

    }

    $('.daterange').daterangepicker({
        "timePicker": true,
        "timePicker24Hour": true,
        ranges: {
            Today: [moment().startOf('days'), moment()],
            Yesterday: [moment().subtract(1, 'days').startOf('days'), moment().subtract(1, 'days').endOf('days')],
            'Last 2 Days': [moment().subtract(1, 'days').startOf('days'), moment()],
            'Last 7 Days': [moment().subtract(6, 'days').startOf('days'), moment()],
            'Last 15 Days': [moment().subtract(14, 'days').startOf('days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days').startOf('days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Last 3 Month': [moment().subtract(2, 'month').startOf('month'), moment()],
            'This Years': [moment().startOf('year'), moment()]
        },
        startDate: moment().startOf('days'),
        endDate: moment()
    }, cbTimerange);


    $("#csvdownload").click(function () {
        var data = [
            ["time", "voltage1", "current1", "power1", "energy1", "frequency1", "pf1", "voltage2", "current2", "power2", "energy2", "frequency2", "pf2", "voltage3", "current3", "power3", "energy3", "frequency3", "pf3",
                "voltage4", "current4", "power4", "energy4", "frequency4", "pf4", "voltage5", "current5", "power5", "energy5", "frequency5", "pf5", "voltage6", "current6", "power6", "energy6", "frequency6", "pf6"]];

        // console.log(label_history.length);return;

        for (var count = 0; count < label1_history.length; count++) {
            data.push([label1_history[count], volt1_history[count], curr1_history[count], power1_history[count], energy1_history[count], freq1_history[count], p_f1_history[count],
            volt2_history[count], curr2_history[count], power2_history[count], energy2_history[count], freq2_history[count], p_f2_history[count],
            volt3_history[count], curr3_history[count], power3_history[count], energy3_history[count], freq3_history[count], p_f3_history[count],
            volt4_history[count], curr4_history[count], power4_history[count], energy4_history[count], freq4_history[count], p_f4_history[count],
            volt5_history[count], curr5_history[count], power5_history[count], energy5_history[count], freq5_history[count], p_f5_history[count],
            volt6_history[count], curr6_history[count], power6_history[count], energy6_history[count], freq6_history[count], p_f6_history[count]]);
            // console.log([label_history[count], volt_history[count], curr_history[count], power_history[count], energy_history[count], freq_history[count], p_f_history[count]]);
        }

        let csvContent = "data:text/csv;charset=utf-8," +
            data.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", label1_history[0] + "_to_" + label1_history[label1_history.length - 1] + "_data.csv");
        document.body.appendChild(link);
        link.click();
    });


});