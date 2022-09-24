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


$io = new ControlTimer();
$io->esp_id = $_REQUEST['id'];
$oldIO = json_decode(($io->getLast())['timedata'], true);


if (isset($_POST['pin_timer'])) {  //save data
    $newIO = [["pin" => $_POST["pin_timer"], "start" => $_POST["start_time"], "interval" => $_POST["interval_sec"], "h-l" => $_POST["h-l"], "detail" => $_POST["detail"]]];

    if ($oldIO) {
        // check duplicates
        foreach ($oldIO as $key => $value) {
            if ($value["pin"] == $_POST["pin_timer"] && $value["start"] == $_POST["start_time"]) {
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
    $io->timedata = json_encode($newIO);
    $io->needupdate = 1;
    // var_dump($io);
    echo $io->create();
} elseif (isset($_GET['deltime'])) {
    foreach ($oldIO as $key => $value) {
        if ($value["pin"] == $_REQUEST["pin"] && $value["start"] == $_REQUEST["deltime"]) {
            unset($oldIO[$key]);
        }
    }
    usort($oldIO, function ($a, $b) {
        return $a['pin'] <=> $b['pin'];
    });
    $io->timedata = json_encode($oldIO);
    $io->needupdate = 1;
    echo $io->create();
} else {  // get data
    $data = [];
    if ($oldIO) {
        foreach ($oldIO as $io) {
            $data[] = [$io['pin'], $io['start'], $io['interval'], $io["h-l"], $io['detail'], ""];
        }
    }
    $result = ["data" => $data];
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

// echo '{"data":[["D2","12:00 AM","0:20:00","",""],["D5","12:00 AM","0:20:00","",""]]}';