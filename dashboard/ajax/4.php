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
        $esp_id = 1058658;
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
                $results = Data_4_sec::getLastMulti($esp_id, $_REQUEST['point']);
                $db = new Database();
                $conn = $db->getConn();
                $lastupdate = Esp_ID::getByESPID($conn, $esp_id)->lastupdate;
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
                $results = Data_4_min::getLastMulti($esp_id, $_REQUEST['point']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
                $results = Data_4_hr::getLastMulti($esp_id, $_REQUEST['point']);
            } else { // get day data
            }
        } else if (isset($_REQUEST['range'])) {
            if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_4_sec::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_4_sec::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_4_sec::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_4_min::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_4_min::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_4_min::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_4_hr::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_4_hr::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_4_hr::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "day") {
                if (isset($_REQUEST['range']['start2'])) {
                    $results = Data_4_day::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                    $results2 = Data_4_day::getRange($esp_id, $_REQUEST['range']['start2'], $_REQUEST['range']['end2']);
                } else if (isset($_REQUEST['range']['start']))
                    $results = Data_4_day::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        }
    } catch (Throwable $e) {
        die("nodata");
    }
}
if (isset($results2)) {
    $humid = [];
    $temp = [];
    $time = [];
    $humid2 = [];
    $temp2 = [];
    $time2 = [];
    foreach ($results as $result) {
        $humid[] = number_format((float)$result['humid'], 1, '.', '');
        $temp[] = number_format((float)$result['temp'], 1, '.', '');
        $time[] = $result['time'];
    }
    foreach ($results2 as $result2) {
        $humid2[] = number_format((float)$result2['humid'], 1, '.', '');
        $temp2[] = number_format((float)$result2['temp'], 1, '.', '');
        $time2[] = $result2['time'];
    }
    $data = array(
        "humid" => $humid, "temp" => $temp,  "time" => $time,
        "humid2" => $humid2, "temp2" => $temp2, "time2" => $time2
    );

    echo json_encode($data);
} else if (isset($results)) {
    $humid = [];
    $temp = [];
    $time = [];
    foreach ($results as $result) {
        $humid[] = number_format((float)$result['humid'], 1, '.', '');
        $temp[] = number_format((float)$result['temp'], 1, '.', '');
        $time[] = $result['time'];
    }
    $data = array("humid" => $humid, "temp" => $temp, "time" => $time);
    if (isset($lastupdate) && !is_null($lastupdate)) {
        $data += ["lastupdate" => $lastupdate];
    }
    // var_dump(json_encode($data));
    echo json_encode($data);
    // echo json_encode($_REQUEST);
}



// if (isset($_REQUEST['id'])) {
//     $data = Data_4_sec::getLast($_REQUEST['id']);
// }
//var_dump($data);
// echo json_encode($data);
