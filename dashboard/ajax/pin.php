<?php


require($_SERVER['DOCUMENT_ROOT'] . '/includes/init.php');

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if (!empty($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'] . "/dashboard/device.php?id") && (isset($_REQUEST['id']))) {

        // >>>> Security check
        if (empty($_SESSION['skey']) || empty($_REQUEST['skey']) || ($_SESSION['skey'] != $_REQUEST['skey'])) {
            Auth::block();
        }
    } else {
        Auth::block();
    }
} else {
    Auth::block();
}


$pin = new ControlPin();
$pin->esp_id = $_REQUEST['id'];
$oldIO = json_decode(($pin->getLast())['pindata'], true);

// var_dump($_POST);

if (isset($_POST['pin'])) {  //save data
    $newIO = [["pin" => $_POST["pin"], "mode" => $_POST["pin_mode"], "value" => 0, "detail" => $_POST["detail"]]];

    if ($oldIO) {
        // check duplicates
        foreach ($oldIO as $key => $value) {
            if ($value["pin"] == $_POST["pin"]) {
                die("duplicates");
            }
        }
        $newIO = array_merge($newIO, $oldIO);
        usort($newIO, function ($a, $b) {
            return $a['pin'] <=> $b['pin'];
        });
    }
    // var_dump($newIO);
    // var_dump($oldIO);
    $pin->pindata = json_encode($newIO);
    $pin->needupdate = 1;
    // var_dump($pin);
    echo $pin->create();
} elseif (isset($_GET['delpin'])) {
    foreach ($oldIO as $key => $value) {
        if ($value["pin"] == $_REQUEST["delpin"]) {
            unset($oldIO[$key]);
        }
    }
    usort($oldIO, function ($a, $b) {
        return $a['pin'] <=> $b['pin'];
    });
    $pin->pindata = json_encode($oldIO);
    $pin->needupdate = 1;
    echo $pin->create();
} elseif (isset($_GET['changevalue'])) {
    foreach ($oldIO as $key => $value) {
        if ($value["pin"] == $_REQUEST["pin"]) {

            $newIO = [["pin" => $value["pin"], "mode" => $value["mode"], "value" => $_GET['changevalue'], "detail" => $value["detail"]]];
            unset($oldIO[$key]);

            $newIO = array_merge($newIO, $oldIO);
            usort($newIO, function ($a, $b) {
                return $a['pin'] <=> $b['pin'];
            });
            $pin->pindata = json_encode($newIO);
            $pin->needupdate = 1;
            break;
        }
    }

    // $newIO = array_merge($newIO, $oldIO);
    // usort($newIO, function ($a, $b) {
    //     return $a['pin'] <=> $b['pin'];
    // });
    // $pin->pindata = json_encode($newIO);
    // $pin->needupdate = 1;

    echo $pin->create();
} else {  // get data
    $data = [];
    if ($oldIO) {
        foreach ($oldIO as $pin) {
            $data[] = [$pin['pin'], $pin['mode'], $pin['value'], $pin['detail']];
        }
    }
    $result = ["data" => $data];
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

// echo '{"data":[["D2","12:00 AM","0:20:00","",""],["D5","12:00 AM","0:20:00","",""]]}';