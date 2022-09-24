var prev_io;

$(document).ready(function () {

    //last data
    var humid = [],
        temp = [],
        label = [];
    var lastupdate;

    // today and yesterday
    var humid_today = [],
        temp_today = [],
        humid_yesterday = [],
        temp_yesterday = [],
        label_day = [];

    // this mouth and last month
    var humid_thismouth = [],
        temp_thismouth = [],
        humid_lastmouth = [],
        temp_lastmouth = [],
        label_mouth = [];

    // custom history range
    var humid_history = [],
        temp_history = [],
        label_history = [],
        label_timestamp = [],
        uplot;

    // for device setting
    var setting;
    var online_state;

    var dhtChart, Chart_history;
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
                legendItem.hidden = true;
            } else {
                ci.show(index);
                legendItem.hidden = false;
            }

            if (ci.isDatasetVisible(0) || ci.isDatasetVisible(1)) ci.options.scales['yt'].display = true;
            else ci.options.scales['yt'].display = false;
            if (ci.isDatasetVisible(2) || ci.isDatasetVisible(3)) ci.options.scales['yh'].display = true;
            else ci.options.scales['yh'].display = false;

            ci.update();
        };

        dhtChart = new Chart(
            document.getElementById('dhtChart'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'humid',
                    data: [],
                    yAxisID: 'y',
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
                    label: 'temp',
                    data: [],
                    yAxisID: 'y1',
                    tension: 0.1,
                    backgroundColor: 'rgba(210, 214, 222, 0.5)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    pointRadius: 0.5,
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
                        display: true
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
                        title: {
                            display: true,
                            text: "เวลา",
                        }, time: {
                            unit: 'minute'
                        },
                        // ticks: {
                        //     source: 'auto',
                        //     autoSkip: true,
                        // },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Humid",
                        },
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        title: {
                            display: true,
                            text: "Temp",
                        },
                        type: 'linear',
                        display: true,
                        position: 'right',
                    }
                }
            }
        }
        );

        Chart_history = new Chart(
            document.getElementById('Chart_history'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Temp-Today',
                    data: [],
                    tension: 0.1,
                    yAxisID: 'yt',
                    backgroundColor: 'rgba(60,141,188,0.5)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    // pointRadius: 0.5,
                }, {
                    label: 'Temp-Lastday',
                    data: [],
                    yAxisID: 'yt',
                    tension: 0.1, backgroundColor: 'rgba(210, 214, 222, 0.3)',
                    borderColor: 'rgba(210, 214, 222, 1)', fill: true,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    // pointRadius: 0.5,
                }, {
                    label: 'Humid-Today',
                    data: [],
                    yAxisID: 'yh',
                    tension: 0.1, backgroundColor: '#b643cd50',
                    borderColor: '#b643cd',
                    fill: true,
                    pointColor: '#b643cd',
                    pointStrokeColor: '#b643cd',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#b643cd',
                    // pointRadius: 0.5,
                    hidden: true,
                }, {
                    label: 'Humid-Lastday',
                    data: [],
                    yAxisID: 'yh',
                    tension: 0.1, backgroundColor: 'rgba(0,141,0,0.5)',
                    borderColor: 'rgba(0,141,0,0.8)',
                    fill: true,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(0,141,0,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,141,0,1)',
                    // pointRadius: 0.5,
                    hidden: true,
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
                        onClick: axiscontrol
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
                    yt: {
                        display: true,
                        title: {
                            display: true,
                            text: "Temp",
                        },
                        beginAtZero: false,
                    },
                    yh: {
                        display: false,
                        title: {
                            display: true,
                            text: "Humid",
                        },
                        beginAtZero: false,
                        position: 'right',
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
            url: "ajax/4.php",
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

                    json.humid.reverse();
                    json.temp.reverse();
                    json.time.reverse();

                    humid = json.humid;
                    temp = json.temp;
                    label = json.time;

                    lastupdate = json.lastupdate;
                    updateStatus();

                    $("#humid").html(json.humid[json.humid.length - 1]);
                    $("#temp").html(json.temp[json.temp.length - 1]);
                    $("#time").html(json.time[json.time.length - 1]);

                    dhtChart.data.datasets[0].data = humid;
                    dhtChart.data.datasets[0].label = 'humid';
                    dhtChart.data.datasets[1].data = temp;
                    dhtChart.data.datasets[1].label = 'temp';
                    dhtChart.data.labels = label;
                    dhtChart.update();

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

    function updateLastData() {
        $.ajax({
            url: "ajax/4.php",
            type: "post",
            data: {
                id: esp_id,
                skey: sk,
                data: "sec",
                point: 1
            },
            success: function (data) {

                var json = JSON.parse(data);
                let fulltime = json.time[0];

                if (label[label.length - 1] != fulltime) {

                    if (label.length > 1000) {
                        label.shift();
                        humid.shift();
                        temp.shift();
                    }

                    humid.push(json.humid[0]);
                    temp.push(json.temp[0]);
                    label.push(json.time[0]);

                    $("#humid").html(json.humid[0]);
                    $("#temp").html(json.temp[0]);
                    $("#time").html(json.time[0]);

                    dhtChart.update();
                }
                lastupdate = json.lastupdate;
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
        $(".overview-page").show();
        $("#uplot").hide();
        $("#google_table").hide();
        $(".setting-page").hide();
        $("#Charthistory").hide();
        $("#Chart1").show();
        $("#range_display").hide();
        $(".history_view_class").hide();
        $(".history_option_class").hide();
        $('#chart_name').text('อุณหภูมิ ความชื้น ล่าสุด');

        if (label.length) $(".overlay").hide();
        else overlayNodata();

        dhtChart.resetZoom();
        dhtChart.data.datasets[0].data = [];
        dhtChart.data.datasets[1].data = [];
        dhtChart.update();

        dhtChart.data.datasets[0].data = humid;
        dhtChart.data.datasets[0].label = 'humid';
        dhtChart.data.datasets[1].data = temp;
        dhtChart.data.datasets[1].label = 'temp';
        dhtChart.data.labels = label;
        dhtChart.update();

    });

    // for tab select
    $("#history_option, #day_view").click(function () {

        $("#value").hide();
        $("#io").hide();
        $(".overview-page").hide();
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

        $('#chart_name').text('วันนี้ vs เมื่อวาน');
        Chart_history.options.scales['x'].title.text = "เวลา";

        if (label_day.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/4.php', {
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

                    var _temp_today = json.temp;
                    _temp_today.reverse();
                    var _humid_today = json.humid;
                    _humid_today.reverse();
                    let fulltime = json.time;
                    fulltime.reverse();
                    var label_today = [];
                    for (var count = 0; count < fulltime.length; count++) {
                        let timesplit = String(fulltime[count]).split(" ");
                        label_today.push(timesplit[1]);
                    }

                    var _temp_yesterday = json.temp2;
                    _temp_yesterday.reverse();
                    var _humid_yesterday = json.humid2;
                    _humid_yesterday.reverse();
                    let fulltime2 = json.time2;
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
                            temp_yesterday[i] = _temp_yesterday[i1];
                            humid_yesterday[i] = _humid_yesterday[i1];
                            i1++;
                        } else {
                            temp_yesterday[i] = NaN;
                            humid_yesterday[i] = NaN;
                        }
                        if (label_day[i] == label_today[i2]) {
                            temp_today[i] = _temp_today[i2];
                            humid_today[i] = _humid_today[i2];
                            i2++;
                        } else {
                            temp_today[i] = NaN;
                            humid_today[i] = NaN;
                        }
                    }
                    Chart_history.type = 'line';
                    Chart_history.data.datasets[0].data = temp_today;
                    Chart_history.data.datasets[0].label = 'อุณหภูมิวันนี้';
                    Chart_history.data.datasets[1].data = temp_yesterday;
                    Chart_history.data.datasets[1].label = 'อุณหภูมิเมื่อวานนี้';
                    Chart_history.data.datasets[2].data = humid_today;
                    Chart_history.data.datasets[2].label = 'ความชื้นวันนี้';
                    Chart_history.data.datasets[3].data = humid_yesterday;
                    Chart_history.data.datasets[3].label = 'ความชื้นเมื่อวานนี้';
                    Chart_history.data.datasets[0].type = 'line';
                    Chart_history.data.datasets[1].type = 'line';
                    Chart_history.data.datasets[2].type = 'line';
                    Chart_history.data.datasets[3].type = 'line';
                    Chart_history.data.labels = label_day;

                    if (temp_yesterday.every(function (number) { return isNaN(number) })) {
                        // Chart_history.options.plugins.legend.display = false;
                        Chart_history.data.datasets[1].hidden = true;
                        Chart_history.data.datasets[3].hidden = true;
                    }
                    else {
                        // Chart_history.options.plugins.legend.display = true;
                        Chart_history.data.datasets[1].hidden = false;
                        // Chart_history.data.datasets[3].hidden = false;
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
            Chart_history.data.datasets[2].data = [];
            Chart_history.data.datasets[3].data = [];
            Chart_history.update();
            Chart_history.type = 'line';
            Chart_history.data.datasets[0].data = temp_today;
            Chart_history.data.datasets[0].label = 'อุณหภูมิวันนี้';
            Chart_history.data.datasets[1].data = temp_yesterday;
            Chart_history.data.datasets[1].label = 'อุณหภูมิเมื่อวานนี้';
            Chart_history.data.datasets[2].data = humid_today;
            Chart_history.data.datasets[2].label = 'ความชื้นวันนี้';
            Chart_history.data.datasets[3].data = humid_yesterday;
            Chart_history.data.datasets[3].label = 'ความชื้นเมื่อวานนี้';
            Chart_history.data.datasets[0].type = 'line';
            Chart_history.data.datasets[1].type = 'line';
            Chart_history.data.datasets[2].type = 'line';
            Chart_history.data.datasets[3].type = 'line';
            Chart_history.data.labels = label_day;

            if (temp_yesterday.every(function (number) { return isNaN(number) })) {
                // Chart_history.options.plugins.legend.display = false;
                Chart_history.data.datasets[1].hidden = true;
                Chart_history.data.datasets[3].hidden = true;
            }
            else {
                // Chart_history.options.plugins.legend.display = true;
                Chart_history.data.datasets[1].hidden = false;
                // Chart_history.data.datasets[3].hidden = false;
            }

            Chart_history.update();
        }
    });

    // for tab select
    $("#mouth_view").click(function () {

        $("#chart").show();
        $(".overview-page").hide();
        $("#uplot").hide();
        $("#google_table").hide();
        $(".setting-page").hide();
        $("#Charthistory").show();
        $("#Chart1").hide();
        $(".history_option_class").show();
        $(".history_view_class").hide();

        Chart_history.resetZoom();
        Chart_history.options.scales['x'].title.text = "วันที่";
        $('#chart_name').text('ค่าเฉลี่ยในแต่ละวัน');

        if (label_mouth.length == 0) { // if empty array let get new

            $(".overlay").show();

            $.post('ajax/4.php', {
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

                    var _temp_thismouth = json.temp;
                    _temp_thismouth.reverse();
                    var _humid_thismouth = json.humid;
                    _humid_thismouth.reverse();
                    var fulldate = json.time;
                    fulldate.reverse();
                    var label_thismouth = [];
                    for (var count = 0; count < fulldate.length; count++) {
                        let timesplit = String(fulldate[count]).split("-");
                        label_thismouth.push(timesplit[2]);
                    }
                    // console.log(label_thismouth);

                    var _temp_lastmouth = json.temp2;
                    _temp_lastmouth.reverse();
                    var _humid_lastmouth = json.humid2;
                    _humid_lastmouth.reverse();
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
                            temp_lastmouth[i] = _temp_lastmouth[i1];
                            humid_lastmouth[i] = _humid_lastmouth[i1];
                            i1++;
                        } else {
                            temp_lastmouth[i] = NaN; humid_lastmouth[i] = NaN;
                        }
                        if (label_mouth[i] == label_thismouth[i2]) {
                            temp_thismouth[i] = _temp_thismouth[i2]; humid_thismouth[i] = _humid_thismouth[i2];
                            i2++;
                        } else {
                            temp_thismouth[i] = NaN; humid_thismouth[i] = NaN;
                        }
                    }

                    Chart_history.data.datasets[0].type = 'bar';
                    Chart_history.data.datasets[1].type = 'bar';
                    Chart_history.data.datasets[2].type = 'bar';
                    Chart_history.data.datasets[3].type = 'bar';
                    Chart_history.data.datasets[0].data = temp_thismouth;
                    Chart_history.data.datasets[0].label = 'อุณหภูมิเดือนนี้';
                    Chart_history.data.datasets[1].data = temp_lastmouth;
                    Chart_history.data.datasets[1].label = 'อุณหภูมิเดือนที่แล้ว';
                    Chart_history.data.datasets[2].data = humid_thismouth;
                    Chart_history.data.datasets[2].label = 'ความชื้นเดือนนี้';
                    Chart_history.data.datasets[3].data = humid_lastmouth;
                    Chart_history.data.datasets[3].label = 'ความชื้นเดือนที่แล้ว';
                    Chart_history.data.labels = label_mouth;

                    if (temp_lastmouth.every(function (number) { return isNaN(number) })) {
                        // Chart_history.options.plugins.legend.display = false;
                        Chart_history.data.datasets[1].hidden = true;
                        Chart_history.data.datasets[3].hidden = true;
                    }
                    else {
                        // Chart_history.options.plugins.legend.display = true;
                        Chart_history.data.datasets[1].hidden = false;
                        // Chart_history.data.datasets[3].hidden = false;
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
            Chart_history.data.datasets[2].data = [];
            Chart_history.data.datasets[3].data = [];
            Chart_history.update();
            Chart_history.data.datasets[0].type = 'bar';
            Chart_history.data.datasets[1].type = 'bar';
            Chart_history.data.datasets[2].type = 'bar';
            Chart_history.data.datasets[3].type = 'bar';
            Chart_history.data.datasets[0].data = temp_thismouth;
            Chart_history.data.datasets[0].label = 'อุณหภูมิเดือนนี้';
            Chart_history.data.datasets[1].data = temp_lastmouth;
            Chart_history.data.datasets[1].label = 'อุณหภูมิเดือนที่แล้ว';
            Chart_history.data.datasets[2].data = humid_thismouth;
            Chart_history.data.datasets[2].label = 'ความชื้นเดือนนี้';
            Chart_history.data.datasets[3].data = humid_lastmouth;
            Chart_history.data.datasets[3].label = 'ความชื้นเดือนที่แล้ว';
            Chart_history.data.labels = label_mouth;

            if (temp_lastmouth.every(function (number) { return isNaN(number) })) {
                // Chart_history.options.plugins.legend.display = false;
                Chart_history.data.datasets[1].hidden = true;
                Chart_history.data.datasets[3].hidden = true;
            }
            else {
                // Chart_history.options.plugins.legend.display = true;
                Chart_history.data.datasets[1].hidden = false;
                // Chart_history.data.datasets[3].hidden = false;
            }

            Chart_history.update();
        }
    });

    // for tab select
    $("#history_view").click(function () {

        $("#chart").show();
        $(".overview-page").hide();
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
        $(".overview-page").hide();


        if (typeof setting === 'undefined') {
            getlinedata();
        }
    });

    $('#linedata-save').click(function () {

        // console.log($('#dailynotify').prop('checked') ? 1 : 0);

        $.post('ajax/setting.php', {
            id: esp_id,
            skey: sk,
            p_id: 4,
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
                p_id: 4
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

        let data = [label_timestamp, temp_history, humid_history];

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

                        spanGaps: true,

                        // in-legend display
                        label: "temp",
                        scale: "t",
                        value: (self, rawValue) => rawValue.toFixed(1) + " °C",

                        stroke: "red",
                        width: 2,
                        fill: "rgba(255, 0, 0, 0.1)"
                    },
                    {
                        // initial toggled state (optional)
                        show: true,

                        spanGaps: true,

                        // in-legend display
                        label: "humid",
                        scale: "h",
                        value: (self, rawValue) => rawValue.toFixed(1) + " %RH",

                        stroke: "blue",
                        width: 2,
                        fill: "rgba(0, 0, 255, 0.1)"
                    },
                ],
                axes: [
                    {
                        // space: 50,
                        // size: 30,
                        label: "เวลา",
                        labelSize: 20,
                        stroke: "white",
                    },
                    {
                        // space: 50,
                        //	size: 40,
                        // side: 1,
                        scale: "t",
                        label: "Temp",
                        stroke: "rgb(255, 200, 200)",
                    }
                    ,
                    {
                        // space: 50,
                        //	size: 40,
                        scale: "h",
                        side: 1,
                        label: "Humid",
                        stroke: "rgb(200, 255, 255)",
                    }
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
            google_data.push([humid_history[count], temp_history[count], label_history[count]]);
        }

        google.charts.load('current', { 'packages': ['table'] });
        google.charts.setOnLoadCallback(drawTable);

        function drawTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'humid');
            data.addColumn('number', 'temp');
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
            url: "ajax/4.php",
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

                // reverse for uplot
                json.humid.reverse();
                json.temp.reverse();
                json.time.reverse();

                humid_history = [];
                for (var count = 0; count < json.humid.length; count++) {
                    humid_history.push(parseFloat(json.humid[count]));
                }
                temp_history = [];
                for (var count = 0; count < json.temp.length; count++) {
                    temp_history.push(parseFloat(json.temp[count]));
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
        startDate: moment().subtract(1, 'hour'),
        endDate: moment()
    }, cbTimerange);


    $("#csvdownload").click(function () {
        var data = [
            ["time", "humid", "temp"]
        ];

        // console.log(label_history.length);return;

        for (var count = 0; count < label_history.length; count++) {
            data.push([label_history[count], humid_history[count], temp_history[count]]);
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