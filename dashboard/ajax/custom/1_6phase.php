<?php

require($_SERVER['DOCUMENT_ROOT'] . '/includes/init.php');

$esp_id = ESP_ID;
try {
    if (isset($_REQUEST['point'])) {
        if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
            $results_1 = Data_sec::getLastMulti($esp_id, $_REQUEST['point']);
            //get minimize
            date_default_timezone_set('Asia/Bangkok');
            $date = new Datetime();
            $min1 = Data_sec::getMinEnergy($esp_id, $date->format('Y-m-d'));
            $min_e1 = $min1['min(e1)'];
            $min_e2 = $min1['min(e2)'];
            $min_e3 = $min1['min(e3)'];
            $min_e4 = $min1['min(e4)'];
            $min_e5 = $min1['min(e5)'];
            $min_e6 = $min1['min(e6)'];
            try {
                $last30day1 = Data_day::getLastCostom($esp_id, "1 months", "SUM(e1),SUM(e2),SUM(e3),SUM(e4),SUM(e5),SUM(e6)");
            } catch (Throwable $e) {
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
            $results_1 = Data_min::getLastMulti($esp_id, $_REQUEST['point']);
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
            $results_1 = Data_hr::getLastMulti($esp_id, $_REQUEST['point']);
        } else { // get day data
        }
    } else if (isset($_REQUEST['range'])) {
        if (isset($_REQUEST['data']) && $_REQUEST['data'] == "sec") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_sec::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "min") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_min::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "hr") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_hr::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
        } else if (isset($_REQUEST['data']) && $_REQUEST['data'] == "day") {
            if (isset($_REQUEST['range']['start'])) {
                $results_1 = Data_day::getRange($esp_id, $_REQUEST['range']['start'], $_REQUEST['range']['end']);
            }
            try {
                $last1year = Data_day::getLastCostom($esp_id, "1 years", "e1,e2,e3,e4,e5,e6,time");
            } catch (Throwable $e) {
            }
        }
    }
} catch (Throwable $e) {
    die("nodata");
}

if (isset($results_1)) {
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
        $v4[] = number_format((float)$result['v4'], 1, '.', '');
        $i4[] = number_format((float)$result['i4'], 3, '.', '');
        $p4[] = number_format((float)$result['p4'], 1, '.', '');
        $e4[] = number_format((float)$result['e4'], 3, '.', '');
        $f4[] = number_format((float)$result['f4'], 1, '.', '');
        $pf4[] = number_format((float)$result['pf4'], 2, '.', '');
        $v5[] = number_format((float)$result['v5'], 1, '.', '');
        $i5[] = number_format((float)$result['i5'], 3, '.', '');
        $p5[] = number_format((float)$result['p5'], 1, '.', '');
        $e5[] = number_format((float)$result['e5'], 3, '.', '');
        $f5[] = number_format((float)$result['f5'], 1, '.', '');
        $pf5[] = number_format((float)$result['pf5'], 2, '.', '');
        $v6[] = number_format((float)$result['v6'], 1, '.', '');
        $i6[] = number_format((float)$result['i6'], 3, '.', '');
        $p6[] = number_format((float)$result['p6'], 1, '.', '');
        $e6[] = number_format((float)$result['e6'], 3, '.', '');
        $f6[] = number_format((float)$result['f6'], 1, '.', '');
        $pf6[] = number_format((float)$result['pf6'], 2, '.', '');
        $time1[] = $result['time'];
    }

    $data = array(
        "v1" => $v1, "i1" => $i1, "p1" => $p1, "e1" => $e1, "f1" => $f1, "pf1" => $pf1, "v2" => $v2, "i2" => $i2, "p2" => $p2, "e2" => $e2, "f2" => $f2, "pf2" => $pf2, "v3" => $v3, "i3" => $i3, "p3" => $p3, "e3" => $e3, "f3" => $f3, "pf3" => $pf3,
        "v4" => $v4, "i4" => $i4, "p4" => $p4, "e4" => $e4, "f4" => $f4, "pf4" => $pf4, "v5" => $v5, "i5" => $i5, "p5" => $p5, "e5" => $e5, "f5" => $f5, "pf5" => $pf5, "v6" => $v6, "i6" => $i6, "p6" => $p6, "e6" => $e6, "f6" => $f6, "pf6" => $pf6,
        "time1" => $time1
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
        $data += ["sum_e1" => $last30day1[0]['SUM(e1)'], "sum_e2" => $last30day1[0]['SUM(e2)'], "sum_e3" => $last30day1[0]['SUM(e3)'], "sum_e4" => $last30day1[0]['SUM(e4)'], "sum_e5" => $last30day1[0]['SUM(e5)'], "sum_e6" => $last30day1[0]['SUM(e6)']];
    }
    if (isset($last1year)) {
        $month = ["0", "0", "0"];
        $energy = 0.0;
        $month_energy = [];
        $month_label = [];

        foreach ($last1year as $thisday) {
            $thismonth = explode("-", $thisday['time']);
            if ($thismonth[1] != $month[1]) {
                if ($energy) {
                    $thisdate = $month[0] . "-" . $month[1];
                    $month_energy[] =  $energy;
                    $month_label[] = $thisdate;
                }
                $month = $thismonth;
                $energy = 0;
                $energy += $thisday['e1'] + $thisday['e2'] + $thisday['e3'] + $thisday['e4'] + $thisday['e5'] + $thisday['e6'];
            } else {
                $energy += $thisday['e1'] + $thisday['e2'] + $thisday['e3'] + $thisday['e4'] + $thisday['e5'] + $thisday['e6'];
            }
        }
        if ($energy) {
            $thisdate = $month[0] . "-" . $month[1];
            $month_energy[] =  $energy;
            $month_label[] = $thisdate;
        }

        $data += ["month_energy" => $month_energy, "month_label" => $month_label];
    }
    // var_dump(json_encode($data));
    echo json_encode($data);
    // echo json_encode($_REQUEST);
}
