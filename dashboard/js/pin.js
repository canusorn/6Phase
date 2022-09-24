$(function () {

    // $('input.start_time').timepicker({
    //     interval: 60,
    // });
    // $('input.interval_sec').timepicker({
    //     timeFormat: 'H:mm:ss',
    //     maxTime: new Date(0, 0, 0, 2, 0, 0),
    //     interval: 10,
    // });

    var pin_table = $('#pin_table').DataTable({
        "ajax": "ajax/pin.php?id=" + esp_id + "&skey=" + sk,
        dom: 'tp',
        ordering: false,
        responsive: true,
        columnDefs: [{
            "render": function (data, type, row) {
                renderdata = '<a href="ajax/pin.php?id=' + esp_id + '&skey=' + sk + '&delpin=' + row[0] + '" class="btn btn-outline-danger btn-sm delete"><i class="fa-solid fa-trash-can"></i></a>';
                return renderdata;
            },
            "targets": -1
        },
        // {
        //     "render": function (data, type, row) {
        //         if(row[3]==1)
        //         renderdata = 'Active High';
        //         else
        //         this.renderdata = "Active Low";
        //         return renderdata;
        //     },
        //     "targets": 3
        // },
        {
            render: function (data, type, row) {

                return data + '<br>' + row[1] + '<br><small>' + row[3] + '</small>';
            },
            targets: 0,
        },
        {
            render: function (data, type, row) {

                if (row[1] == 'INPUT') {
                    if (row[2]) {
                        value = '<span style="font-size: 2em; color:Tomato;"><i class="fa-solid fa-lightbulb"></i></span>';
                    } else {
                        value = '<span style="font-size: 2em; color:gray;"><i class="fa-regular fa-lightbulb"></i></span>';
                    }
                }
                else if (row[1] == 'OUTPUT') {
                    value = '<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input pin-switch" id="output-' + row[0] + '"';
                    if (row[2] == 1) value += ' checked';
                    value += '><label class="custom-control-label" for="output-' + row[0] + '"></label></div>';
                }
                else if (row[1] == 'PWM') {
                    value = '<div class="form-group"><label id="pwm-' + row[0] + '-label" for="pwm-' + row[0] + '">' + row[2] + '/255</label><input type="range" class="custom-range pin-range" id="pwm-' + row[0] + '" value="' + row[2] + '" min="0" max="255"></div>';
                }

                return value;
            },
            targets: 2,
        },
        { visible: false, targets: [1] },
        ],
    });


    setInterval( function () {
        pin_table.ajax.reload( null, false ); // user paging is not reset on reload
    }, 5000 );

    // add timer
    $('#pin-form').submit(function (e) {

        e.preventDefault();

        var form = $(this);
        var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function (data) {
                // alert(data); // show response from the php script.
                console.log(data);
                if (data == 1) {
                    pin_table.ajax.reload(null, false);
                } else if (data == "duplicates") {
                    alert("ข้อมูลซ้ำ");
                }
            }
        });

    });

    // del timer
    $('#pin_table tbody').on('click', 'a.delete', function (e) {

        e.preventDefault();

        $.ajax({
            url: $(this).attr('href'),
            success: function (data) {
                // alert(data); // show response from the php script.
                // console.log(data);
                if (data == 1) {
                    pin_table.ajax.reload(null, false);
                }
            }
        });

    });


    $("#pin_table tbody").on('change', "input[type='checkbox']", function (e) {

        let pin = $(this).attr('id').split("-");
        let value = ($(this).prop('checked')) ? 1 : 0;
        // console.log(pin[1] + " checkbox : " + value);

        $.ajax({
            url: 'ajax/pin.php?id=' + esp_id + '&skey=' + sk + '&pin=' + pin[1] + '&changevalue=' + value,
            success: function (data) {
                // console.log(data);
                if (data == 1) {
                    pin_table.ajax.reload(null, false);
                }
            }
        });

    });

    $("#pin_table tbody").on('change', "input[type='range']", function (e) {

        let pin = $(this).attr('id').split("-");
        let value = $(this).val();
        $('#pwm-' + pin[1] + '-label').text(value + "/1024");
        // console.log(pin[1] + "range value : " + value);

        $.ajax({
            url: 'ajax/pin.php?id=' + esp_id + '&skey=' + sk + '&pin=' + pin[1] + '&changevalue=' + value,
            success: function (data) {
                // console.log(data);
                if (data == 1) {
                    pin_table.ajax.reload(null, false);
                }
            }
        });
    });

});