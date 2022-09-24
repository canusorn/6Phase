<?php

require($_SERVER['DOCUMENT_ROOT'] . '/includes/init.php');

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if (!empty($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'] . "/dashboard/device.php") && (isset($_REQUEST['id']))) {

    } else {
        Auth::block();
    }
} else {
    Auth::block();
}
// var_dump($_REQUEST);

if (isset($_REQUEST['id'])) {
    $io = new ControlIO();
    $io->esp_id = $_REQUEST['id'];
    $io->createTables();


    if (isset($_REQUEST['co'])) { //control out from client to database

        date_default_timezone_set('Asia/Bangkok');
        $dateTime = new DateTime();
        $io->time = $dateTime->format('Y-m-d H:i:s');
        $io->needupdate = 1;

        $io->io = $_REQUEST['co'];
        echo ($io->create());
    } elseif (isset($_REQUEST['ci'])) { // control in from database to client

        $co = $io->getLast();
        echo(json_encode($co));
    }
}
