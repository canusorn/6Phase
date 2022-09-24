$(function () {

    $('input.start_time').timepicker({
        interval: 60,
    });
    $('input.interval_sec').timepicker({
        timeFormat: 'H:mm:ss',
        maxTime: new Date(0, 0, 0, 2, 0, 0),
        interval: 10,
    });

    var table = $('#io-timer_table').DataTable({
        "ajax": "ajax/io-timer.php?id=" + esp_id + "&skey=" + sk,
        dom: 'tp',
        ordering: false,
        responsive: true,
        columnDefs: [{
            "render": function (data, type, row) {
                renderdata = '<a href="ajax/io-timer.php?id=' + esp_id + '&skey=' + sk + '&pin=' + row[0] + '&deltime=' + row[1] + '" class="btn btn-outline-danger btn-sm delete"><i class="fa-solid fa-trash-can"></i></a>';
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

                return 'Pin:\t' + data + '<br><small>' + row[4] + '</small>';
            },
            targets: 0,
        },
        {
            render: function (data, type, row) {

                if(row[3]==1)
                active = '<span class="badge bg-primary">Active High</span>';
                else
                active = '<span class="badge bg-secondary">Active Low</span>';
                return 'เริ่ม:\t' + data + '<br>เป็นเวลา:\t' + row[2] + '<br>' + active;
            },
            targets: 1,
        },
        { visible: false, targets: [2,3,4] },
    ],
    });

    // add timer
    $('#io-timer-form').submit(function (e) {

        e.preventDefault();

        var form = $(this);
        var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function (data) {
                // alert(data); // show response from the php script.
                // console.log(data);
                if (data == 1) {
                    table.ajax.reload(null, false);
                } else if (data == "duplicates") {
                    alert("ข้อมูลซ้ำ");
                }
            }
        });

    });

    // del timer
    $('#io-timer_table tbody').on('click', 'a.delete', function (e) {

        e.preventDefault();

        $.ajax({
            url: $(this).attr('href'),
            success: function (data) {
                // alert(data); // show response from the php script.
                // console.log(data);
                if (data == 1) {
                    table.ajax.reload(null, false);
                } 
            }
        });

    });

});