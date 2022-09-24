<?php

require($_SERVER['DOCUMENT_ROOT'] . '/includes/init.php');


if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if (!empty($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'] . "/dashboard/customdashboard")) {

        // >>>> Security check
        if (empty($_SESSION['skey']) || empty($_POST['skey']) || ($_SESSION['skey'] != $_POST['skey'])) {
            Auth::block();
        } else {
            // echo "AJAX request";
            $esp_id1 = 4925120;
            $esp_id2 = 123456;
        }
    } else {
        Auth::block();
    }
} else {
    Auth::block();
}


try {
    if (isset($_REQUEST['point'])) {
        if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
            $results_1 = Data_6_sec::getLastMulti($esp_id1, $_REQUEST['point']);
            $results_2 = Data_6_sec::getLastMulti($esp_id2, $_REQUEST['point']);
            //get minimize
            date_default_timezone_set('Asia/Bangkok');
            $date = new Datetime();
            $min1 = Data_6_sec::getMinEnergy($esp_id1, $date->format('Y-m-d'));
            $min_e1 = $min1['min(e1)'];
            $min_e2 = $min1['min(e2)'];
            $min_e3 = $min1['min(e3)'];
            $min2 = Data_6_sec::getMinEnergy($esp_id2, $date->format('Y-m-d'));
            $min_e4 = $min2['min(e1)'];
            $min_e5 = $min2['min(e2)'];
            $min_e6 = $min2['min(e3)'];
            try {
                $last30day1 = Data_6_day::getLastCostom($esp_id1, "1 months", "SUM(e1),SUM(e2),SUM(e3)");
            } catch (Throwable $e) {
            }
            try {
                $last30day2 = Data_6_day::getLastCostom($esp_id2, "1 months", "SUM(e1),SUM(e2),SUM(e3)");
            } catch (Throwable $e) {
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
            $results_1 = Data_6_min::getLastMulti($esp_id1, $_REQUEST['point']);
            $results_2 = Data_6_min::getLastMulti($esp_id2, $_REQUEST['point']);
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
            $results_1 = Data_6_hr::getLastMulti($esp_id1, $_REQUEST['point']);
            $results_2 = Data_6_hr::getLastMulti($esp_id2, $_REQUEST['point']);
        } else { // get day data
        }
    } else if (isset($_REQUEST['range'])) {
        // if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
        //     $results = Data_6_sec::getRange($esp_id, $_REQUEST['point']);
        // } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
        //     $results = Data_6_min::getLastMulti($esp_id, $_REQUEST['point']);
        // } else 
        if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_6_sec::getRange($esp_id1, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                $results_2 = Data_6_sec::getRange($esp_id2, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_6_min::getRange($esp_id1, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                $results_2 = Data_6_min::getRange($esp_id2, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_6_hr::getRange($esp_id1, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                $results_2 = Data_6_hr::getRange($esp_id2, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "day") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_6_day::getRange($esp_id1, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
                $results_2 = Data_6_day::getRange($esp_id2, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        }
    }
} catch (Throwable $e) {
    die("nodata");
}

if (isset($results_1) || isset($results_2)) {
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
    $v4 = [];
    $i4 = [];
    $p4 = [];
    $e4 = [];
    $f4 = [];
    $pf4 = [];
    $v5 = [];
    $i5 = [];
    $p5 = [];
    $e5 = [];
    $f5 = [];
    $pf5 = [];
    $v6 = [];
    $i6 = [];
    $p6 = [];
    $e6 = [];
    $f6 = [];
    $pf6 = [];
    $time1 = [];
    $time2 = [];
    foreach ($results_1 as $result) {
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
        $time1[] = $result['time'];
    }
    foreach ($results_2 as $result) {
        $v4[] = number_format((float)$result['v1'], 1, '.', '');
        $i4[] = number_format((float)$result['i1'], 3, '.', '');
        $p4[] = number_format((float)$result['p1'], 1, '.', '');
        $e4[] = number_format((float)$result['e1'], 3, '.', '');
        $f4[] = number_format((float)$result['f1'], 1, '.', '');
        $pf4[] = number_format((float)$result['pf1'], 2, '.', '');
        $v5[] = number_format((float)$result['v2'], 1, '.', '');
        $i5[] = number_format((float)$result['i2'], 3, '.', '');
        $p5[] = number_format((float)$result['p2'], 1, '.', '');
        $e5[] = number_format((float)$result['e2'], 3, '.', '');
        $f5[] = number_format((float)$result['f2'], 1, '.', '');
        $pf5[] = number_format((float)$result['pf2'], 2, '.', '');
        $v6[] = number_format((float)$result['v3'], 1, '.', '');
        $i6[] = number_format((float)$result['i3'], 3, '.', '');
        $p6[] = number_format((float)$result['p3'], 1, '.', '');
        $e6[] = number_format((float)$result['e3'], 3, '.', '');
        $f6[] = number_format((float)$result['f3'], 1, '.', '');
        $pf6[] = number_format((float)$result['pf3'], 2, '.', '');
        $time2[] = $result['time'];
    }

    $data = array(
        "v1" => $v1, "i1" => $i1, "p1" => $p1, "e1" => $e1, "f1" => $f1, "pf1" => $pf1, "v2" => $v2, "i2" => $i2, "p2" => $p2, "e2" => $e2, "f2" => $f2, "pf2" => $pf2, "v3" => $v3, "i3" => $i3, "p3" => $p3, "e3" => $e3, "f3" => $f3, "pf3" => $pf3, "time1" => $time1,
        "v4" => $v4, "i4" => $i4, "p4" => $p4, "e4" => $e4, "f4" => $f4, "pf4" => $pf4, "v5" => $v5, "i5" => $i5, "p5" => $p5, "e5" => $e5, "f5" => $f5, "pf5" => $pf5, "v6" => $v6, "i6" => $i6, "p6" => $p6, "e6" => $e6, "f6" => $f6, "pf6" => $pf6, "time2" => $time2
    );
    if (isset($min_e1)) {
        $data += ["min_e1" => $min_e1];
    }
    if (isset($min_e2)) {
        $data += ["min_e2" => $min_e2];
    }
    if (isset($min_e3)) {
        $data += ["min_e3" => $min_e3];
    }
    if (isset($min_e4)) {
        $data += ["min_e4" => $min_e4];
    }
    if (isset($min_e5)) {
        $data += ["min_e5" => $min_e5];
    }
    if (isset($min_e6)) {
        $data += ["min_e6" => $min_e6];
    }
    if (isset($last30day1)) {
        $data += ["sum_e1" => $last30day1[0]['SUM(e1)'], "sum_e2" => $last30day1[0]['SUM(e2)'], "sum_e3" => $last30day1[0]['SUM(e3)']];
    }
    if (isset($last30day2)) {
        $data += ["sum_e4" => $last30day2[0]['SUM(e1)'], "sum_e5" => $last30day2[0]['SUM(e2)'], "sum_e6" => $last30day2[0]['SUM(e3)']];
    }
    // var_dump(json_encode($data));
    echo json_encode($data);
    // echo json_encode($_REQUEST);
}
