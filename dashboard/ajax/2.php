<?php


require($_SERVER['DOCUMENT_ROOT'] . '/includes/init.php');

$esp_id = 0;
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if (!empty($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'] . "/dashboard") && isset($_REQUEST['id'])) {

        // >>>> Security check
        if (empty($_SESSION['skey']) || empty($_POST['skey']) || ($_SESSION['skey'] != $_POST['skey'])) {
            Auth::block();
        } else {
            // echo "AJAX request";
            $esp_id = $_REQUEST['id'];
        }
    } else if (!empty($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'] . "/preview")) {
        $esp_id = 2639673;
    } else {
        Auth::block();
    }
} else {
    Auth::block();
}


if ($esp_id) {
    try {
        if (isset($_REQUEST['point'])) {
            if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
                $results = Data_2_sec::getLastMulti($esp_id, $_REQUEST['point']);
                $db = new Database();
                $conn = $db->getConn();
                $lastupdate = Esp_ID::getByESPID($conn, $esp_id)->lastupdate;
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
                $results = Data_2_min::getLastMulti($esp_id, $_REQUEST['point']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
                $results = Data_2_hr::getLastMulti($esp_id, $_REQUEST['point']);
            } else { // get day data
            }
        } else if (isset($_REQUEST['range'])) {
            if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_2_sec::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_2_sec::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_2_sec::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_2_min::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_2_min::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_2_min::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_2_hr::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_2_hr::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_2_hr::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "day") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_2_day::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_2_day::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_2_day::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        }
    } catch (Throwable $e) {
        die("nodata");
    }
}
if (isset($results2)) {
    $pm1 = [];
    $pm2 = [];
    $pm10 = [];
    $time = [];
    $pm12 = [];
    $pm22 = [];
    $pm102 = [];
    $time2 = [];
    foreach ($results as $result) {
        $pm1[] = number_format((float)$result['pm1'], 1, '.', '');
        $pm2[] = number_format((float)$result['pm2'], 1, '.', '');
        $pm10[] = number_format((float)$result['pm10'], 1, '.', '');
        $time[] = $result['time'];
    }
    foreach ($results2 as $result2) {
        $pm12[] = number_format((float)$result2['pm1'], 1, '.', '');
        $pm22[] = number_format((float)$result2['pm2'], 1, '.', '');
        $pm102[] = number_format((float)$result2['pm10'], 1, '.', '');
        $time2[] = $result2['time'];
    }
    $data = array(
        "pm1" => $pm1, "pm2" => $pm2, "pm10" => $pm10,  "time" => $time,
        "pm12" => $pm12, "pm22" => $pm22, "pm102" => $pm102,  "time2" => $time2
    );

    echo json_encode($data);
} else if (isset($results)) {
    $pm1 = [];
    $pm2 = [];
    $pm10 = [];
    $time = [];
    foreach ($results as $result) {
        $pm1[] = number_format((float)$result['pm1'], 1, '.', '');
        $pm2[] = number_format((float)$result['pm2'], 1, '.', '');
        $pm10[] = number_format((float)$result['pm10'], 1, '.', '');
        $time[] = $result['time'];
    }
    $data = array("pm1" => $pm1, "pm2" => $pm2, "pm10" => $pm10, "time" => $time);
    if (isset($lastupdate) && !is_null($lastupdate)) {
        $data += ["lastupdate" => $lastupdate];
    }
    // var_dump(json_encode($data));
    echo json_encode($data);
    // echo json_encode($_REQUEST);
}
