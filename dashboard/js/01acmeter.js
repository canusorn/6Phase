var prev_io;

$(document).ready(function () {

    //last data
    var volt = [],
        curr = [],
        power = [],
        energy = [],
        freq = [],
        p_f = [],
        label = [];
    var v, i, p, e, min_e = 0, f, pf;
    var lastupdate;

    // today and yesterday
    var volt_today = [],
        curr_today = [],
        power_today = [],
        energy_today = [],
        freq_today = [],
        p_f_today = [],
        volt_yesterday = [],
        curr_yesterday = [],
        power_yesterday = [],
        energy_yesterday = [],
        freq_yesterday = [],
        p_f_yesterday = [],
        label_day = [];

    // this mouth and last month
    var volt_thismouth = [],
        curr_thismouth = [],
        power_thismouth = [],
        energy_thismouth = [],
        freq_thismouth = [],
        p_f_thismouth = [],
        volt_lastmouth = [],
        curr_lastmouth = [],
        power_lastmouth = [],
        energy_lastmouth = [],
        freq_lastmouth = [],
        p_f_lastmouth = [],
        label_mouth = [];

    // custom history range
    var volt_history = [],
        curr_history = [],
        power_history = [],
        energy_history = [],
        freq_history = [],
        p_f_history = [],
        label_history = [],
        label_timestamp = [],
        uplot;

    // for device setting
    var setting;
    var online_state;

    var Chart_1, Chart_history;
    displayChart();
    getLastData();
    ioread();

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
                    legend: {
                        display: true,
                        onClick: axiscontrol
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
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
                        },
                        limits: {
                            x: { min: 'original', max: 'original' },
                        }
                    }
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
                    label: 'Today',
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
                    label: 'Lastday',
                    data: [],
                    tension: 0.1, backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
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
            url: "ajax/1.php",
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

                    json.voltage.reverse();
                    json.current.reverse();
                    json.power.reverse();
                    json.energy.reverse();
                    json.frequency.reverse();
                    json.pf.reverse();
                    json.time.reverse();

                    volt = json.voltage;
                    curr = json.current;
                    power = json.power;

                    min_e = parseFloat(json.min_energy).toFixed(3);
                    if (isNaN(min_e)) { min_e = parseFloat(json.energy[0]); }
                    // console.log(energy);

                    for (var count = 0; count < json.energy.length; count++) {
                        energy.push(parseFloat(json.energy[count]) - min_e);
                    }

                    freq = json.frequency;
                    p_f = json.pf;
                    label = json.time;

                    lastupdate = json.lastupdate;
                    updateStatus();

                    // console.log(json.min_energy);
                    // console.log(json.energy[json.energy.length - 1]);


                    $("#voltage").html(json.voltage[json.voltage.length - 1]);
                    $("#current").html(json.current[json.current.length - 1]);
                    $("#power").html(json.power[json.power.length - 1]);
                    $("#energy").html((parseFloat(json.energy[json.energy.length - 1]) - min_e).toFixed(3));
                    $("#frequency").html(json.frequency[json.frequency.length - 1]);
                    $("#pf").html(json.pf[json.pf.length - 1]);
                    $("#time").html(json.time[json.time.length - 1]);
                    $("#energy_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.energy[json.energy.length - 1]) - min_e).toFixed(1));
                    $("#bill1_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.energy[json.energy.length - 1]) - min_e).toFixed(1));
                    $("#bill1_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.energy[json.energy.length - 1]) - min_e).toFixed(1));
                    $("#energy_month").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.sum_e)).toFixed(1));
                    $("#bill1_111_month").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Month(parseFloat(json.sum_e)).toFixed(1));
                    $("#bill1_112_month").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Month(parseFloat(json.sum_e)).toFixed(1));
                    // console.log("energy:" + json.sum_e);
                    Chart_1.options.scales['yv'].display = false;
                    Chart_1.options.scales['yi'].display = false;
                    Chart_1.options.scales['ye'].display = false;
                    Chart_1.options.scales['yf'].display = false;
                    Chart_1.options.scales['ypf'].display = false;

                    Chart_1.data.datasets[0].data = volt;
                    Chart_1.data.datasets[0].label = 'Volt';
                    Chart_1.data.datasets[1].data = curr;
                    Chart_1.data.datasets[1].label = 'Current';
                    Chart_1.data.datasets[2].data = power;
                    Chart_1.data.datasets[2].label = 'Power';
                    Chart_1.data.datasets[3].data = energy;
                    Chart_1.data.datasets[3].label = 'Energy';
                    Chart_1.data.datasets[4].data = freq;
                    Chart_1.data.datasets[4].label = 'Frequency';
                    Chart_1.data.datasets[5].data = p_f;
                    Chart_1.data.datasets[5].label = 'PF';
                    Chart_1.data.labels = label;
                    Chart_1.update();

                    $(".overlay").fadeOut(100);
                    setInterval(updateLastData, 5000); // 1000 = 1 second
                    setInterval(updateStatus, 5000); // 1000 = 1 second
                }
                catch (err) {
                    // console.log(err.message);
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
            url: "ajax/1.php",
            type: "post",
            data: {
                id: esp_id,
                skey: sk,
                data: "sec",
                point: 1
            },
            success: function (data) {
                // console.log(data);
                var json = JSON.parse(data);
                let fulltime = json.time[0];

                if (label[label.length - 1] != fulltime) {

                    if (label.length > 1000) {
                        label.shift();
                        volt.shift();
                        curr.shift();
                        power.shift();
                        energy.shift();
                        freq.shift();
                        p_f.shift();
                    }

                    volt.push(json.voltage[0]);
                    curr.push(json.current[0]);
                    power.push(json.power[0]);
                    energy.push(parseFloat(json.energy[0]) - min_e);
                    freq.push(json.frequency[0]);
                    p_f.push(json.pf[0]);
                    label.push(json.time[0]);

                    // console.log(json.power[0]);
                    // console.log(timesplit[1]);

                    $("#voltage").html(json.voltage[0]);
                    $("#current").html(json.current[0]);
                    $("#power").html(json.power[0]);
                    $("#energy").html((parseFloat(json.energy[0]) - min_e).toFixed(3));
                    $("#frequency").html(json.frequency[0]);
                    $("#pf").html(json.pf[0]);
                    $("#time").html(json.time[0]);
                    $("#energy_day").html("<span style='color:grey'><small>หน่วย(kWh): </small></span>" + (parseFloat(json.energy[0]) - min_e).toFixed(1));
                    $("#bill1_111").html("<span style='color:grey'><small>ประเภท 1.1.1 :</small></span> ฿ " + calc111Day(parseFloat(json.energy[0]) - min_e).toFixed(1));
                    $("#bill1_112").html("<span style='color:grey'><small>ประเภท 1.1.2 :</small></span> ฿ " + calc112Day(parseFloat(json.energy[0]) - min_e).toFixed(1));

                    Chart_1.update();
                }
                lastupdate = json.lastupdate;
            }
        })
    };

    setInterval(ioread, 5000); // 1000 = 1 second


    $("input[type='checkbox']").each(function () {
        if ($(this).prop("checked")) {
            if ($(this).attr('id') == 'D0') prev_io |= 0b1;
            else if ($(this).attr('id') == 'D1') prev_io |= 0b10;
            else if ($(this).attr('id') == 'D2') prev_io |= 0b100;
            else if ($(this).attr('id') == 'D3') prev_io |= 0b1000;
            else if ($(this).attr('id') == 'D4') prev_io |= 0b10000;
            else if ($(this).attr('id') == 'D5') prev_io |= 0b100000;
            else if ($(this).attr('id') == 'D6') prev_io |= 0b1000000;
            else if ($(this).attr('id') == 'D7') prev_io |= 0b10000000;
            else if ($(this).attr('id') == 'D8') prev_io |= 0b100000000;
        }
    });


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
        $("#Chart1").show();
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

        Chart_1.data.datasets[0].data = volt;
        Chart_1.data.datasets[0].label = 'Volt';
        Chart_1.data.datasets[1].data = curr;
        Chart_1.data.datasets[1].label = 'Current';
        Chart_1.data.datasets[2].data = power;
        Chart_1.data.datasets[2].label = 'Power';
        Chart_1.data.datasets[3].data = energy;
        Chart_1.data.datasets[3].label = 'Energy';
        Chart_1.data.datasets[4].data = freq;
        Chart_1.data.datasets[4].label = 'Frequency';
        Chart_1.data.datasets[5].data = p_f;
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
        $("#range_display").show();
        $(".history_option_class").show();
        $(".history_view_class").hide();



        $("#day_view").addClass("active");
        $("#mouth_view,#history_view").removeClass("active");

        $('#chart_name').text('ค่ากำลังไฟฟ้าของวันนี้ vs เมื่อวาน [watt]');

        Chart_history.resetZoom();
        Chart_history.options.scales['x'].title.text = "เวลา";
        // alert('today vs yesterday');
        if (label_day.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/1.php', {
                id: esp_id,
                skey: sk,
                data: "min",
                range: {
                    start: moment().startOf('days').format('YYYY-MM-DD HH:mm:ss'),
                    end: moment().format('YYYY-MM-DD HH:mm:ss'),
                    start2: moment().subtract(1, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'),
                    end2: moment().subtract(1, 'days').endOf('days').format('YYYY-MM-DD HH:mm:ss')
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



                    // volt_today = json.voltage;
                    // curr_today = json.current;
                    var _power_today = json.power;
                    _power_today.reverse();
                    // energy_today = json.energy;
                    // freq_today = json.frequency;
                    // p_f_today = json.pf;
                    let fulltime = json.time;
                    fulltime.reverse();
                    var label_today = [];
                    for (var count = 0; count < fulltime.length; count++) {
                        let timesplit = String(fulltime[count]).split(" ");
                        label_today.push(timesplit[1]);
                    }

                    // volt_yesterday = json.voltage2;
                    // curr_yesterday = json.current2;
                    var _power_yesterday = json.power2;
                    _power_yesterday.reverse();
                    // energy_yesterday = json.energy2;
                    // freq_yesterday = json.frequency2;
                    // p_f_yesterday = json.pf2;let 
                    fulltime2 = json.time2;
                    fulltime2.reverse();
                    var label_yesterday = [];
                    for (var count = 0; count < fulltime2.length; count++) {
                        let timesplit = String(fulltime2[count]).split(" ");
                        label_yesterday.push(timesplit[1]);
                    }

                    label_day = [...new Set([...label_yesterday, ...label_today])];
                    label_day.sort();
                    label_yesterday.sort();
                    label_today.sort();

                    // add nan
                    let i1 = 0, i2 = 0;
                    for (var i = 0; i < label_day.length; i++) {
                        if (label_day[i] == label_yesterday[i1]) {
                            power_yesterday[i] = _power_yesterday[i1];
                            i1++;
                        } else {
                            power_yesterday[i] = NaN;
                        }
                        if (label_day[i] == label_today[i2]) {
                            power_today[i] = _power_today[i2];
                            i2++;
                        } else {
                            power_today[i] = NaN;
                        }
                    }
                    Chart_history.type = 'line';
                    Chart_history.data.datasets[0].data = power_today;
                    Chart_history.data.datasets[0].label = 'วันนี้';
                    Chart_history.data.datasets[0].type = 'line';
                    Chart_history.data.datasets[1].data = power_yesterday;
                    Chart_history.data.datasets[1].label = 'เมื่อวานนี้';
                    Chart_history.data.datasets[1].type = 'line';
                    Chart_history.data.labels = label_day;

                    if (power_yesterday.every(function (number) { return isNaN(number) })) {
                        Chart_history.options.plugins.legend.display = false;
                        Chart_history.data.datasets[1].hidden = true;
                    }
                    else {
                        Chart_history.options.plugins.legend.display = true;
                        Chart_history.data.datasets[1].hidden = false;
                    }

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
            Chart_history.update();
            Chart_history.data.datasets[0].type = 'line';
            Chart_history.data.datasets[0].data = power_today;
            Chart_history.data.datasets[0].label = 'วันนี้';
            Chart_history.data.datasets[1].type = 'line';
            Chart_history.data.datasets[1].data = power_yesterday;
            Chart_history.data.datasets[1].label = 'เมื่อวานนี้';
            Chart_history.data.labels = label_day;

            if (power_yesterday.every(function (number) { return isNaN(number) })) {
                Chart_history.options.plugins.legend.display = false;
                Chart_history.data.datasets[1].hidden = true;
            }
            else {
                Chart_history.options.plugins.legend.display = true;
                Chart_history.data.datasets[1].hidden = false;
            }

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
        $(".history_option_class").show();
        $(".history_view_class").hide();

        Chart_history.resetZoom();
        Chart_history.options.scales['x'].title.text = "วันที่";
        $('#chart_name').text('หน่วยไฟฟ้าแต่ละวัน [kWh]');

        if (label_mouth.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/1.php', {
                id: esp_id,
                skey: sk,
                data: "day",
                range: {
                    start: moment().startOf('month').format('YYYY-MM-DD'),
                    end: moment().format('YYYY-MM-DD'),
                    start2: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
                    end2: moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
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

                    // volt_thismouth = json.voltage;
                    // curr_thismouth = json.current;
                    // power_thismouth = json.power;
                    // power_thismouth.reverse();
                    var _energy_thismouth = json.energy;
                    _energy_thismouth.reverse();
                    // freq_thismouth = json.frequency;
                    // p_f_thismouth = json.pf;
                    var fulldate = json.time;
                    fulldate.reverse();
                    var label_thismouth = [];
                    for (var count = 0; count < fulldate.length; count++) {
                        let timesplit = String(fulldate[count]).split("-");
                        label_thismouth.push(timesplit[2]);
                    }


                    // console.log(label_thismouth);

                    // volt_lastmouth = json.voltage2;
                    // curr_lastmouth = json.current2;
                    // power_lastmouth = json.power2;
                    // power_lastmouth.reverse();
                    var _energy_lastmouth = json.energy2;
                    _energy_lastmouth.reverse();
                    // freq_lastmouth = json.frequency2;
                    // p_f_lastmouth = json.pf2;
                    var fulldate2 = json.time2;
                    fulldate2.reverse();
                    var label_lastmouth = []
                    for (var count = 0; count < fulldate2.length; count++) {
                        let timesplit = String(fulldate2[count]).split("-");
                        label_lastmouth.push(timesplit[2]);
                    }
                    // console.log(label_lastmouth);

                    label_mouth = [...new Set([...label_thismouth, ...label_lastmouth])];
                    label_mouth.sort();
                    label_thismouth.sort();
                    label_lastmouth.sort();

                    // add nan
                    let i1 = 0, i2 = 0;
                    for (var i = 0; i < label_mouth.length; i++) {
                        if (label_mouth[i] == label_lastmouth[i1]) {
                            energy_lastmouth[i] = _energy_lastmouth[i1];
                            i1++;
                        } else {
                            energy_lastmouth[i] = NaN;
                        }
                        if (label_mouth[i] == label_thismouth[i2]) {
                            energy_thismouth[i] = _energy_thismouth[i2];
                            i2++;
                        } else {
                            energy_thismouth[i] = NaN;
                        }
                    }

                    Chart_history.data.datasets[0].data = energy_thismouth;
                    Chart_history.data.datasets[0].label = 'เดือนนี้';

                    Chart_history.data.datasets[1].data = energy_lastmouth;
                    Chart_history.data.datasets[1].label = 'เดือนที่แล้ว';
                    Chart_history.data.labels = label_mouth;
                    Chart_history.data.datasets[0].type = 'bar';
                    Chart_history.data.datasets[1].type = 'bar';

                    // console.log(Chart_history.data.datasets[0].data);
                    // console.log(Chart_history.data.datasets[1].data);
                    // console.log(Chart_history.data.labels);


                    if (energy_lastmouth.every(function (number) { return isNaN(number) })) {
                        Chart_history.options.plugins.legend.display = false;
                        Chart_history.data.datasets[1].hidden = true;
                    }
                    else {
                        Chart_history.options.plugins.legend.display = true;
                        Chart_history.data.datasets[1].hidden = false;

                    }

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
            Chart_history.update();

            Chart_history.data.datasets[0].data = energy_thismouth;
            Chart_history.data.datasets[0].label = 'เดือนนี้';

            Chart_history.data.datasets[1].data = energy_lastmouth;
            Chart_history.data.datasets[1].label = 'เดือนที่แล้ว';
            Chart_history.data.labels = label_mouth;
            Chart_history.data.datasets[0].type = 'bar';
            Chart_history.data.datasets[1].type = 'bar';

            if (energy_lastmouth.every(function (number) { return isNaN(number) })) {
                Chart_history.options.plugins.legend.display = false;
                Chart_history.data.datasets[1].hidden = true;
            }
            else {
                Chart_history.options.plugins.legend.display = true;
                Chart_history.data.datasets[1].hidden = false;
            }

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
        $("#Charthistory").hide();
        $("#uplot").show();
        $(".history_option_class").show();
        $(".history_view_class").show();

        if (typeof uplot === 'undefined') cbTimerange(moment().startOf('days'), moment());

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
            p_id: 1,
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
                p_id: 1
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

        let data = [label_timestamp, volt_history, curr_history, power_history, energy_history, freq_history, p_f_history];

        // console.log(data);
        // console.log(data2);
        if (typeof uplot === 'undefined') {
            const optsAreaChart = {
                ...getSize('areaChart'),
                plugins: [
                    wheelZoomPlugin({ factor: 0.75 })
                ],
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

            uplot = new uPlot(optsAreaChart, data, document.getElementById('areaChart'));

            window.addEventListener("resize", e => {
                uplot.setSize(getSize('areaChart'));
            });
        }
        else {
            uplot.setData(data);
        }
    }

    function tablechart() {

        // prepare data for table chart
        var google_data = [];
        for (var count = label_history.length - 1; count >= 0; count--) {
            google_data.push([volt_history[count], curr_history[count], power_history[count], energy_history[count], freq_history[count], p_f_history[count], label_history[count]]);
        }

        google.charts.load('current', { 'packages': ['table'] });
        google.charts.setOnLoadCallback(drawTable);


        function drawTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Volt');
            data.addColumn('number', 'Curr');
            data.addColumn('number', 'Power');
            data.addColumn('number', 'Energy');
            data.addColumn('number', 'freq');
            data.addColumn('number', 'pf');
            data.addColumn('string', 'time');
            data.addRows(google_data);


            var options = {
                showRowNumber: true,
                allowHtml: true,
                width: '100%', height: '100%',
                page: 'enable', pageSize: 50,
                cssClassNames: {
                    headerRow: 'table-secondary bg-dark',
                    headerCell: 'table-secondary bg-dark',
                    tableCell: 'table-secondary bg-dark'
                }
            };

            var table = new google.visualization.Table(document.getElementById('table_div'));

            table.draw(data, options);
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
            url: "ajax/1.php",
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
                json.voltage.reverse();
                json.current.reverse();
                json.power.reverse();
                json.energy.reverse();
                json.frequency.reverse();
                json.pf.reverse();
                json.time.reverse();

                volt_history = [];
                for (var count = 0; count < json.voltage.length; count++) {
                    volt_history.push(parseFloat(json.voltage[count]));
                }
                curr_history = [];
                for (var count = 0; count < json.current.length; count++) {
                    curr_history.push(parseFloat(json.current[count]));
                }
                power_history = [];
                for (var count = 0; count < json.power.length; count++) {
                    power_history.push(parseFloat(json.power[count]));
                }
                var min_energy_history = parseFloat(json.energy[0]);
                energy_history = [];
                for (var count = 0; count < json.energy.length; count++) {
                    energy_history.push(parseFloat(json.energy[count]) - min_energy_history);
                }
                freq_history = [];
                for (var count = 0; count < json.frequency.length; count++) {
                    freq_history.push(parseFloat(json.frequency[count]));
                }
                p_f_history = [];
                for (var count = 0; count < json.pf.length; count++) {
                    p_f_history.push(parseFloat(json.pf[count]));
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
                    tablechart();
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

    // $('#pin-tab').click(function (e) {

    //     e.preventDefault();

    //     $.ajax({
    //         url: "includes/pin.php",
    //         type:'post',
    //         data: {
    //             id: esp_id,
    //             skey: sk
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             $("#body-content").html(data);
    //         }
    //     });

    // });

});



// for io control
function iowrite() {
    var io = 0b00000000;
    $("input[type='checkbox']").each(function () {
        if ($(this).prop("checked")) {
            if ($(this).attr('id') == 'D0') io |= 0b1;
            else if ($(this).attr('id') == 'D1') io |= 0b10;
            else if ($(this).attr('id') == 'D2') io |= 0b100;
            else if ($(this).attr('id') == 'D3') io |= 0b1000;
            else if ($(this).attr('id') == 'D4') io |= 0b10000;
            else if ($(this).attr('id') == 'D5') io |= 0b100000;
            else if ($(this).attr('id') == 'D6') io |= 0b1000000;
            else if ($(this).attr('id') == 'D7') io |= 0b10000000;
            else if ($(this).attr('id') == 'D8') io |= 0b100000000;
        }
    });

    // console.log(io.toString(2));
    // console.log(io);

    $.post('ajax/io.php', {
        co: io, // control out
        id: esp_id
    })
        .done(function (response) {
            // console.log(response);
            if (response == 1) {
                prev_io = io;
            } else {
                // console.log("update database error");
                iodisplay();
            }
        })
        .fail(function () {
            // console.log("network error");
            iodisplay();
        });
}

function ioread() {

    $.post('ajax/io.php', {
        ci: 0, // control out
        id: esp_id
    })
        .done(function (response) {
            var json = JSON.parse(response);
            // console.log(json.io);
            prev_io = json.io;
            iodisplay();
        })
        .fail(function () {
            // console.log("error");
        });
}

function iodisplay() {

    for (let i = 0; i < 9; i++) { //D0 -> D8
        //   text += cars[i] + "<br>";
        if (prev_io & 0b100000000 >>> i) {
            $("#D" + String(8 - i)).prop('checked', true);
            // console.log("D" + String(8 - i) + " is on");
        } else {
            $("#D" + String(8 - i)).prop('checked', false);
        }
    }

}