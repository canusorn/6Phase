$(document).ready(function () {

    //last data
    var volt1 = [], curr1 = [], power1 = [], energy1 = [], freq1 = [], p_f1 = [],
        volt2 = [], curr2 = [], power2 = [], energy2 = [], freq2 = [], p_f2 = [],
        volt3 = [], curr3 = [], power3 = [], energy3 = [], freq3 = [], p_f3 = [],
        label = [];
    var min_e1, min_e2, min_e3;
    var lastupdate;

    // day
    var power_phase1 = [], power_phase2 = [], power_phase3 = [], label_day = [];

    //  mouth
    var energy_phase1 = [], energy_phase2 = [], energy_phase3 = [], label_mouth = [];

    // custom history range
    var volt1_history = [], curr1_history = [], power1_history = [], energy1_history = [], freq1_history = [], p_f1_history = [],
        volt2_history = [], curr2_history = [], power2_history = [], energy2_history = [], freq2_history = [], p_f2_history = [],
        volt3_history = [], curr3_history = [], power3_history = [], energy3_history = [], freq3_history = [], p_f3_history = [],
        label_history = [],
        label_timestamp = [],
        uplot1, uplot2, uplot3;

    // for device setting
    var setting;
    var online_state;

    var Chart_1, Chart_history;
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
                },]
            },
            options: {
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
            url: "ajax/6.php",
            type: "post",
            data: {
                id: esp_id,
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

                    json.time.reverse();

                    volt1 = json.v1;
                    curr1 = json.i1;
                    power1 = json.p1;
                    volt2 = json.v2;
                    curr2 = json.i2;
                    power2 = json.p2;
                    volt3 = json.v3;
                    curr3 = json.i3;
                    power3 = json.p3;

                    min_e1 = parseFloat(json.min_e1).toFixed(3);
                    if (isNaN(min_e1)) { min_e1 = parseFloat(json.e1[0]); }

                    min_e2 = parseFloat(json.min_e2).toFixed(3);
                    if (isNaN(min_e2)) { min_e2 = parseFloat(json.e2[0]); }

                    min_e3 = parseFloat(json.min_e3).toFixed(3);
                    if (isNaN(min_e3)) { min_e3 = parseFloat(json.e3[0]); }

                    for (var count = 0; count < json.e1.length; count++) {
                        energy1.push(parseFloat(json.e1[count]) - min_e1);
                    }
                    for (var count = 0; count < json.e2.length; count++) {
                        energy2.push(parseFloat(json.e2[count]) - min_e2);
                    }
                    for (var count = 0; count < json.e3.length; count++) {
                        energy3.push(parseFloat(json.e3[count]) - min_e3);
                    }

                    freq1 = json.f1;
                    p_f1 = json.pf1;
                    freq2 = json.f2;
                    p_f2 = json.pf2;
                    freq3 = json.f3;
                    p_f3 = json.pf3;
                    label = json.time;

                    for (var count = 0; count < label.length; count++) {
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
                    
                    lastupdate = json.lastupdate;
                    updateStatus();

                    // console.log(json.min_energy);
                    // console.log(json.energy[json.energy.length - 1]);


                    $("#voltage1").html(json.v1[json.v1.length - 1]);
                    $("#current1").html(json.i1[json.i1.length - 1]);
                    $("#power1").html(json.p1[json.p1.length - 1]);
                    $("#energy1").html((parseFloat(json.e1[json.e1.length - 1]) - min_e1).toFixed(3));
                    $("#frequency1").html(json.f1[json.f1.length - 1]);
                    $("#pf1").html(json.pf1[json.pf1.length - 1]);
                    $("#energy1_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e1[json.e1.length - 1]) - min_e1).toFixed(1));
                    $("#bill1_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e1[json.e1.length - 1]) - min_e1).toFixed(1));
                    $("#bill1_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e1[json.e1.length - 1]) - min_e1).toFixed(1));
                    $("#energy1_month").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.sum_e1)).toFixed(1));
                    $("#bill1_111_mouth").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Month(parseFloat(json.sum_e1)).toFixed(1));
                    $("#bill1_112_mouth").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Month(parseFloat(json.sum_e1)).toFixed(1));

                    $("#voltage2").html(json.v2[json.v2.length - 1]);
                    $("#current2").html(json.i2[json.i2.length - 1]);
                    $("#power2").html(json.p2[json.p2.length - 1]);
                    $("#energy2").html((parseFloat(json.e2[json.e2.length - 1]) - min_e2).toFixed(3));
                    $("#frequency2").html(json.f2[json.f2.length - 1]);
                    $("#pf2").html(json.pf2[json.pf2.length - 1]);
                    $("#energy2_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e2[json.e2.length - 1]) - min_e2).toFixed(1));
                    $("#bill2_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e2[json.e2.length - 1]) - min_e2).toFixed(1));
                    $("#bill2_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e2[json.e2.length - 1]) - min_e2).toFixed(1));
                    $("#energy2_month").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.sum_e2)).toFixed(1));
                    $("#bill2_111_mouth").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Month(parseFloat(json.sum_e2)).toFixed(1));
                    $("#bill2_112_mouth").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Month(parseFloat(json.sum_e2)).toFixed(1));

                    $("#voltage3").html(json.v3[json.v3.length - 1]);
                    $("#current3").html(json.i3[json.i3.length - 1]);
                    $("#power3").html(json.p3[json.p3.length - 1]);
                    $("#energy3").html((parseFloat(json.e3[json.e3.length - 1]) - min_e3).toFixed(3));
                    $("#frequency3").html(json.f3[json.f3.length - 1]);
                    $("#pf3").html(json.pf3[json.pf3.length - 1]);
                    $("#time").html(json.time[json.time.length - 1]);
                    $("#energy3_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e3[json.e3.length - 1]) - min_e3).toFixed(1));
                    $("#bill3_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e3[json.e3.length - 1]) - min_e3).toFixed(1));
                    $("#bill3_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e3[json.e3.length - 1]) - min_e3).toFixed(1));
                    $("#energy3_month").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.sum_e3)).toFixed(1));
                    $("#bill3_111_mouth").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Month(parseFloat(json.sum_e3)).toFixed(1));
                    $("#bill3_112_mouth").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Month(parseFloat(json.sum_e3)).toFixed(1));

                    $("#energy_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e1[json.e1.length - 1]) - min_e1 + parseFloat(json.e2[json.e2.length - 1]) - min_e2 + parseFloat(json.e3[json.e3.length - 1]) - min_e3).toFixed(1));
                    $("#bill_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e1[json.e1.length - 1]) - min_e1 + parseFloat(json.e2[json.e2.length - 1]) - min_e2 + parseFloat(json.e3[json.e3.length - 1]) - min_e3).toFixed(1));
                    $("#bill_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e1[json.e1.length - 1]) - min_e1 + parseFloat(json.e2[json.e2.length - 1]) - min_e2 + parseFloat(json.e3[json.e3.length - 1]) - min_e3).toFixed(1));
                    $("#energy_month").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.sum_e1) + parseFloat(json.sum_e2) + parseFloat(json.sum_e3)).toFixed(1));
                    $("#bill_111_mouth").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Month(parseFloat(json.sum_e1) + parseFloat(json.sum_e2) + parseFloat(json.sum_e3)).toFixed(1));
                    $("#bill_112_mouth").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Month(parseFloat(json.sum_e1) + parseFloat(json.sum_e2) + parseFloat(json.sum_e3)).toFixed(1));

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
                    Chart_1.data.labels = label;
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
                    Chart_2.data.labels = label;
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
                    Chart_3.data.labels = label;
                    Chart_3.update();

                    $(".overlay").fadeOut(100);
                    setInterval(updateLastData, 5000); // 1000 = 1 second
                    setInterval(updateStatus, 5000); // 1000 = 1 second
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

    function updateStatus() {
        // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        let lastupdatemoment = moment(lastupdate, 'YYYY-MM-DD HH:mm:ss');
        let secdiff = moment(now, 'YYYY-MM-DD HH:mm:ss').diff(lastupdatemoment, 'seconds');

        // console.log(secdiff);

        if (isNaN(secdiff) || secdiff >= 30) {
            $("#device_status").html("offline");
            $("#device_status").removeClass('badge-success').addClass('badge-secondary');
            online_state = 0;
        }
        else {
            $("#device_status").html("online");
            $("#device_status").removeClass('badge-secondary').addClass('badge-success');
            online_state = 1;
        }

    }

    function updateLastData() {
        $.ajax({
            url: "ajax/6.php",
            type: "post",
            data: {
                id: esp_id,
                skey: sk,
                data: "sec",
                point: 1
            },
            success: function (data) {
                // console.log(data);
                // console.log(volt1);
                var json = JSON.parse(data);
                let fulltime = json.time[0];

                if (label[label.length - 1] != fulltime) {

                    if (label.length > 400) {
                        label.shift();
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
                    }
                    label.push(json.time[0]);

                    $("#voltage1").html(json.v1[0]);
                    $("#current1").html(json.i1[0]);
                    $("#power1").html(json.p1[0]);
                    $("#energy1").html((parseFloat(json.e1[0]) - min_e1).toFixed(3));
                    $("#frequency1").html(json.f1[0]);
                    $("#pf1").html(json.pf1[0]);
                    $("#energy1_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e1[0]) - min_e1).toFixed(1));
                    $("#bill1_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e1[0]) - min_e1).toFixed(1));
                    $("#bill1_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e1[0]) - min_e1).toFixed(1));

                    $("#voltage2").html(json.v2[0]);
                    $("#current2").html(json.i2[0]);
                    $("#power2").html(json.p2[0]);
                    $("#energy2").html((parseFloat(json.e2[0]) - min_e2).toFixed(3));
                    $("#frequency2").html(json.f2[0]);
                    $("#pf2").html(json.pf2[0]);
                    $("#energy2_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e2[0]) - min_e2).toFixed(1));
                    $("#bill2_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e2[0]) - min_e2).toFixed(1));
                    $("#bill2_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e2[0]) - min_e2).toFixed(1));

                    $("#voltage3").html(json.v3[0]);
                    $("#current3").html(json.i3[0]);
                    $("#power3").html(json.p3[0]);
                    $("#energy3").html((parseFloat(json.e3[0]) - min_e3).toFixed(3));
                    $("#frequency3").html(json.f3[0]);
                    $("#pf3").html(json.pf3[0]);
                    $("#energy3_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e3[0]) - min_e3).toFixed(1));
                    $("#bill3_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e3[0]) - min_e3).toFixed(1));
                    $("#bill3_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e3[0]) - min_e3).toFixed(1));

                    $("#energy_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.e1[0]) - min_e1 + parseFloat(json.e2[0]) - min_e2 + parseFloat(json.e3[0]) - min_e3).toFixed(1));
                    $("#bill_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.e1[0]) - min_e1 + parseFloat(json.e2[0]) - min_e2 + parseFloat(json.e3[0]) - min_e3).toFixed(1));
                    $("#bill_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.e1[0]) - min_e1 + parseFloat(json.e2[0]) - min_e2 + parseFloat(json.e3[0]) - min_e3).toFixed(1));
                    $("#energy_month").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.sum_e1) + parseFloat(json.sum_e2) + parseFloat(json.sum_e3)).toFixed(1));
                    $("#bill_111_mouth").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Month(parseFloat(json.sum_e1) + parseFloat(json.sum_e2) + parseFloat(json.sum_e3)).toFixed(1));
                    $("#bill_112_mouth").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Month(parseFloat(json.sum_e1) + parseFloat(json.sum_e2) + parseFloat(json.sum_e3)).toFixed(1));

                    $("#time").html(json.time[0]);

                    Chart_1.update();
                    Chart_2.update();
                    Chart_3.update();
                }
                lastupdate = json.lastupdate;
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
        $("#Chart1").show(); $("#Chart2").show(); $("#Chart3").show();
        $("#range_display").hide();
        $(".history_view_class").hide();
        $(".history_option_class").hide();

        if (label.length) $(".overlay").hide();
        else overlayNodata();

        Chart_1.resetZoom();

        Chart_1.data.datasets[0].data = [];
        Chart_1.data.datasets[1].data = [];
        Chart_1.data.datasets[2].data = [];
        Chart_1.data.datasets[3].data = [];
        Chart_1.data.datasets[4].data = [];
        Chart_1.data.datasets[5].data = [];
        Chart_1.update();

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
        Chart_1.data.labels = label;
        Chart_1.update();


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
        $("#range_display").show();
        $(".history_option_class").show();
        $(".history_view_class").hide();

        $("#day_view").addClass("active");
        $("#mouth_view,#history_view").removeClass("active");

        $('#chart_name').text('ค่ากำลังแต่ละเฟสของวันนี้ [watt]');

        Chart_history.resetZoom();
        Chart_history.options.scales['x'].title.text = "เวลา";
        // alert('today vs yesterday');
        if (label_day.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/6.php', {
                id: esp_id,
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


                    // curr_today = json.current;
                    power_phase1 = json.p1; power_phase2 = json.p2; power_phase3 = json.p3;
                    power_phase1.reverse(); power_phase2.reverse(); power_phase3.reverse();
                    let fulltime = json.time;
                    fulltime.reverse();
                    label_day = [];
                    for (var count = 0; count < fulltime.length; count++) {
                        let timesplit = String(fulltime[count]).split(" ");
                        label_day.push(timesplit[1]);
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
                    Chart_history.data.labels = label_day;

                    Chart_history.update();

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

            Chart_history.data.datasets[0].data = [];
            Chart_history.data.datasets[1].data = [];
            Chart_history.data.datasets[2].data = [];
            Chart_history.update();
            Chart_history.data.datasets[0].data = power_phase1;
            Chart_history.data.datasets[0].label = 'Phase1';
            Chart_history.data.datasets[0].type = 'line';
            Chart_history.data.datasets[1].data = power_phase2;
            Chart_history.data.datasets[1].label = 'Phase2';
            Chart_history.data.datasets[1].type = 'line';
            Chart_history.data.datasets[2].data = power_phase3;
            Chart_history.data.datasets[2].label = 'Phase3';
            Chart_history.data.datasets[2].type = 'line';
            Chart_history.data.labels = label_day;

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
        $(".history_option_class").show();
        $(".history_view_class").hide();

        Chart_history.resetZoom();
        Chart_history.options.scales['x'].title.text = "วันที่";
        $('#chart_name').text('หน่วยไฟฟ้าแต่ละวัน [kWh]');

        if (label_mouth.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/6.php', {
                id: esp_id,
                skey: sk,
                data: "day",
                range: {
                    start: moment().startOf('month').format('YYYY-MM-DD'),
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
                    energy_phase1.reverse(); energy_phase2.reverse(); energy_phase3.reverse();
                    var fulldate = json.time;
                    fulldate.reverse();
                    label_mouth = [];
                    for (var count = 0; count < fulldate.length; count++) {
                        let timesplit = String(fulldate[count]).split("-");
                        label_mouth.push(timesplit[2]);
                    }

                    Chart_history.data.datasets[0].data = energy_phase1;
                    Chart_history.data.datasets[0].label = 'Phase1';
                    Chart_history.data.datasets[1].data = energy_phase2;
                    Chart_history.data.datasets[1].label = 'Phase2';
                    Chart_history.data.datasets[2].data = energy_phase3;
                    Chart_history.data.datasets[2].label = 'Phase3';
                    Chart_history.data.labels = label_mouth;
                    Chart_history.data.datasets[0].type = 'bar';
                    Chart_history.data.datasets[1].type = 'bar';
                    Chart_history.data.datasets[2].type = 'bar';

                    Chart_history.update();

                })
                .fail(function () {

                    $(".overlay").fadeOut(200);
                    $('.toast').removeClass('bg-success bg-warning').addClass('bg-danger');
                    $('#toast-body').text("โหลดข้อมูลไม่สำเร็จ โปรดลองใหม่อีกครั้ง");
                    $('.toast').toast('show');

                });
        } else {

            Chart_history.data.datasets[0].data = [];
            Chart_history.data.datasets[1].data = [];
            Chart_history.data.datasets[2].data = [];
            Chart_history.update();

            Chart_history.data.datasets[0].data = energy_phase1;
            Chart_history.data.datasets[0].label = 'Phase1';
            Chart_history.data.datasets[1].data = energy_phase2;
            Chart_history.data.datasets[1].label = 'Phase2';
            Chart_history.data.datasets[2].data = energy_phase3;
            Chart_history.data.datasets[2].label = 'Phase3';
            Chart_history.data.labels = label_mouth;
            Chart_history.data.datasets[0].type = 'bar';
            Chart_history.data.datasets[1].type = 'bar';
            Chart_history.data.datasets[2].type = 'bar';

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
        $("#Charthistory").hide();
        $("#uplot").show();
        $(".history_option_class").show();
        $(".history_view_class").show();

        if (typeof uplot1 === 'undefined') cbTimerange(moment().startOf('days'), moment());

    });


    $("#setting_option").click(function () {

        $("#value").hide();
        $("#io").hide();
        $("#chart").hide();
        $("#uplot").hide();
        $("#google_table").hide();
        $(".setting-page").show();
        $("#range_display").hide();
        $(".history_view_class").hide();

        if (typeof setting === 'undefined') {
            getlinedata();
        }
    });

    $('#linedata-save').click(function () {

        // console.log($('#dailynotify').prop('checked') ? 1 : 0);

        $.post('ajax/setting.php', {
            id: esp_id,
            skey: sk,
            p_id: 6,
            linetoken: $('#linetoken').val(),
            dailynotify: $('#dailynotify').prop('checked') ? 1 : 0,
            offlinenotify: $('#offlinenotify').prop('checked') ? 1 : 0,
            online_state: online_state
        })
            .done(function (response) {
                // console.log(response);
                if (response) {
                    $('.toast').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
                    // $('.toast').addClass('bg-success');
                    $('#toast-body').text("บันทึกข้อมูลเรียบร้อยแล้ว");
                    $('.toast').toast('show');
                }
            })
            .fail(function () {
                $('.toast').removeClass('bg-success').removeClass('bg-danger').addClass('bg-warning');
                // $('.toast').addClass('bg-warning');
                $('#toast-body').text("บันทึกข้อมูลไม่สำเร็จ โปรดลองใหม่อีกครั้ง");
                $('.toast').toast('show');
            });

    });

    $('#getLineToken label a').click(function () {
        document.addEventListener("visibilitychange", getlinedata);
    });

    function getlinedata() {
        if (!document.hidden) {

            $(".overlay").show();

            $.post('ajax/setting.php', {
                id: esp_id,
                skey: sk,
                p_id: 6
            })
                .done(function (response) {
                    // console.log(response);
                    $(".overlay").fadeOut(100);
                    if (response == "") return;

                    setting = JSON.parse(response);

                    // console.log(setting.daily_notify);

                    $("#linetoken").val(setting.line_token);
                    $("#dailynotify").prop("checked", setting.daily_notify == '1' ? true : false);
                    $('#offlinenotify').prop('checked', setting.offline_notify == '1' ? true : false);
                    $('#onlinenotify').prop('checked', setting.online_notify == '1' ? true : false);

                    document.removeEventListener("visibilitychange", getlinedata);
                })
                .fail(function () {
                    $(".overlay").fadeOut(100);
                    $('.toast').removeClass('bg-success bg-warning').addClass('bg-danger');
                    // $('.toast').addClass('bg-warning');
                    $('#toast-body').text("โหลดข้อมูลไม่สำเร็จ โปรดลองใหม่อีกครั้ง");
                    $('.toast').toast('show');
                });
        }
    }

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

        let data1 = [label_timestamp, volt1_history, curr1_history, power1_history, energy1_history, freq1_history, p_f1_history];
        let data2 = [label_timestamp, volt2_history, curr2_history, power2_history, energy2_history, freq2_history, p_f2_history];
        let data3 = [label_timestamp, volt3_history, curr3_history, power3_history, energy3_history, freq3_history, p_f3_history];

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

            uplot1 = new uPlot(optsAreaChart1, data1, document.getElementById('areaChart1'));
            uplot2 = new uPlot(optsAreaChart2, data2, document.getElementById('areaChart2'));
            uplot3 = new uPlot(optsAreaChart3, data3, document.getElementById('areaChart3'));

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
        }
    }

    function cbTimerange(start, end) {

        // alert("hello from cbTimerange");
        $('.daterange span').html(start.format('YYYY-MM-DD HH:mm') + ' - ' + end.format('YYYY-MM-DD HH:mm'));

        let minutesdiff = end.diff(start, 'minutes');
        let minutesfromnow = moment().diff(start, 'minutes');
        var datarange;
        if (minutesdiff <= 60 * 24 * 2 && minutesfromnow <= 60 * 24 * 2) datarange = "sec";
        else if (minutesdiff <= 60 * 24 * 7 && minutesfromnow <= 60 * 24 * 7) datarange = "min";
        else if (minutesdiff <= 60 * 24 * 31 * 3 && minutesfromnow <= 60 * 24 * 31 * 3) datarange = "hr";
        else datarange = "day";

        $(".overlay").show(100);

        $.ajax({
            url: "ajax/6.php",
            type: "post",
            data: {
                id: esp_id,
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
                json.time.reverse();

                volt1_history = []; curr1_history = []; power1_history = []; energy1_history = []; freq1_history = []; p_f1_history = [];
                volt2_history = []; curr2_history = []; power2_history = []; energy2_history = []; freq2_history = []; p_f2_history = [];
                volt3_history = []; curr3_history = []; power3_history = []; energy3_history = []; freq3_history = []; p_f3_history = [];
                var min_energy1_history = parseFloat(json.e1[0]);
                var min_energy2_history = parseFloat(json.e2[0]);
                var min_energy3_history = parseFloat(json.e3[0]);
                for (var count = 0; count < json.time.length; count++) {

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

                // for save as csv
                label_history = json.time;

                // convert string to time stamp for uplot
                label_timestamp = [];
                for (var count = 0; count < json.time.length; count++) {
                    label_timestamp.push(Date.parse(json.time[count]) / 1000);
                }

                // console.log(power_history);
                // console.log(label_timestamp);

                $(".overlay").fadeOut(100);

                if (label_history.length != 0) {
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
            ["time", "voltage", "current", "power", "energy", "frequency", "pf"]
        ];

        // console.log(label_history.length);return;

        for (var count = 0; count < label_history.length; count++) {
            data.push([label_history[count], volt_history[count], curr_history[count], power_history[count], energy_history[count], freq_history[count], p_f_history[count]]);
            // console.log([label_history[count], volt_history[count], curr_history[count], power_history[count], energy_history[count], freq_history[count], p_f_history[count]]);
        }

        let csvContent = "data:text/csv;charset=utf-8," +
            data.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", label_history[0] + "_to_" + label_history[label_history.length - 1] + "_data.csv");
        document.body.appendChild(link);
        link.click();
    });


});