$(function () {

    $('#project-1-tab').click(function (e) {

        e.preventDefault();

        $.ajax({
            url: "ajax/get-project.php?v=" + version,
            type: 'post',
            data: {
                id: esp_id,
                skey: sk,
                p_id: 1
            },
            success: function (data) {
                // console.log(data);
                $("#body-content").html(data);
                window.history.pushState("Details", "Title", "/dashboard/device.php?id=" + esp_id + "&project=1");
            }
        });
    });

    $('#project-2-tab').click(function (e) {

        e.preventDefault();

        $.ajax({
            url: "ajax/get-project.php?v=" + version,
            type: 'post',
            data: {
                id: esp_id,
                skey: sk,
                p_id: 2
            },
            success: function (data) {
                // console.log(data);
                $("#body-content").html(data);
                window.history.pushState("Details", "Title", "/dashboard/device.php?id=" + esp_id + "&project=2");
            }
        });
    });

    $('#project-3-tab').click(function (e) {

        e.preventDefault();

        $.ajax({
            url: "ajax/get-project.php?v=" + version,
            type: 'post',
            data: {
                id: esp_id,
                skey: sk,
                p_id: 3
            },
            success: function (data) {
                // console.log(data);
                $("#body-content").html(data);
                window.history.pushState("Details", "Title", "/dashboard/device.php?id=" + esp_id + "&project=3");
            }
        });
    });

    $('#project-4-tab').click(function (e) {

        e.preventDefault();

        $.ajax({
            url: "ajax/get-project.php?v=" + version,
            type: 'post',
            data: {
                id: esp_id,
                skey: sk,
                p_id: 4
            },
            success: function (data) {
                // console.log(data);
                $("#body-content").html(data);
                window.history.pushState("Details", "Title", "/dashboard/device.php?id=" + esp_id + "&project=4");
            }
        });
    });

    $('#pin-tab').click(function (e) {

        e.preventDefault();

        $.ajax({
            url: "ajax/get-pin.php",
            type: 'post',
            data: {
                id: esp_id,
                skey: sk
            },
            success: function (data) {
                // console.log(data);
                $("#body-content").html(data);
                window.history.pushState("Details", "Title", "/dashboard/device.php?id=" + esp_id + "&p=pin");
            }
        });

    });

});