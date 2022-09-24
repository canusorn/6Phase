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
        $esp_id = 4719397;
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
                $results = Data_6_sec::getLastMulti($esp_id, $_REQUEST['point']);

                //get minimize
                date_default_timezone_set('Asia/Bangkok');
                $date = new Datetime();
                $min = Data_6_sec::getMinEnergy($esp_id, $date->format('Y-m-d'));
                $min_e1 = $min['min(e1)'];
                $min_e2 = $min['min(e2)'];
                $min_e3 = $min['min(e3)'];
                $db = new Database();
                $conn = $db->getConn();
                $lastupdate = Esp_ID::getByESPID($conn, $esp_id)->lastupdate;
                try {
                    $last30day = Data_6_day::getLastCostom($esp_id, "1 months", "SUM(e1),SUM(e2),SUM(e3)");
                } catch (Throwable $e) {
                }
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
                $results = Data_6_min::getLastMulti($esp_id, $_REQUEST['point']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
                $results = Data_6_hr::getLastMulti($esp_id, $_REQUEST['point']);
            } else { // get day data
            }
        } else if (isset($_REQUEST['range'])) {
            // if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
            //     $results = Data_6_sec::getRange($esp_id, $_REQUEST['point']);
            // } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
            //     $results = Data_6_min::getLastMulti($esp_id, $_REQUEST['point']);
            // } else 
            if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
                if (isset($_REQUEST['range']['start']))
                    $results = Data_6_sec::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
                if (isset($_REQUEST['range']['start']))
                    $results = Data_6_min::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
                if (isset($_REQUEST['range']['start']))
                    $results = Data_6_hr::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "day") {
                if (isset($_REQUEST['range']['start']))
                    $results = Data_6_day::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        }
    } catch (Throwable $e) {
        die("nodata");
    }
}

if (isset($results)) {
    $v1 = [];
    $i1 = [];
    $p1 = [];
    $e1 = [];
    $f1 = [];
    $pf1 = [];
    $v2 = [];
    $i2 = [];
    $p2 = [];
    $e2 = [];
    $f2 = [];
    $pf2 = [];
    $v3 = [];
    $i3 = [];
    $p3 = [];
    $e3 = [];
    $f3 = [];
    $pf3 = [];
    $time = [];
    foreach ($results as $result) {
        $v1[] = number_format((float)$result['v1'], 1, '.', '');
        $i1[] = number_format((float)$result['i1'], 3, '.', '');
        $p1[] = number_format((float)$result['p1'], 1, '.', '');
        $e1[] = number_format((float)$result['e1'], 3, '.', '');
        $f1[] = number_format((float)$result['f1'], 1, '.', '');
        $pf1[] = number_format((float)$result['pf1'], 2, '.', '');
        $v2[] = number_format((float)$result['v2'], 1, '.', '');
        $i2[] = number_format((float)$result['i2'], 3, '.', '');
        $p2[] = number_format((float)$result['p2'], 1, '.', '');
        $e2[] = number_format((float)$result['e2'], 3, '.', '');
        $f2[] = number_format((float)$result['f2'], 1, '.', '');
        $pf2[] = number_format((float)$result['pf2'], 2, '.', '');
        $v3[] = number_format((float)$result['v3'], 1, '.', '');
        $i3[] = number_format((float)$result['i3'], 3, '.', '');
        $p3[] = number_format((float)$result['p3'], 1, '.', '');
        $e3[] = number_format((float)$result['e3'], 3, '.', '');
        $f3[] = number_format((float)$result['f3'], 1, '.', '');
        $pf3[] = number_format((float)$result['pf3'], 2, '.', '');
        $time[] = $result['time'];
    }
    $data = array("v1" => $v1, "i1" => $i1, "p1" => $p1, "e1" => $e1, "f1" => $f1, "pf1" => $pf1, "v2" => $v2, "i2" => $i2, "p2" => $p2, "e2" => $e2, "f2" => $f2, "pf2" => $pf2, "v3" => $v3, "i3" => $i3, "p3" => $p3, "e3" => $e3, "f3" => $f3, "pf3" => $pf3, "time" => $time);
    if (isset($min_e1)) {
        $data += ["min_e1" => $min_e1];
    }
    if (isset($min_e2)) {
        $data += ["min_e2" => $min_e2];
    }
    if (isset($min_e3)) {
        $data += ["min_e3" => $min_e3];
    }
    if (isset($lastupdate) && !is_null($lastupdate)) {
        $data += ["lastupdate" => $lastupdate];
    }
    if (isset($last30day)) {
        $data += ["sum_e1" => $last30day[0]['SUM(e1)'], "sum_e2" => $last30day[0]['SUM(e2)'], "sum_e3" => $last30day[0]['SUM(e3)']];
    }
    // var_dump(json_encode($data));
    echo json_encode($data);
    // echo json_encode($_REQUEST);
}
