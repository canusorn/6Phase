<?php

require($_SERVER['DOCUMENT_ROOT'] . '/includes/init.php');

$esp_id = 0;
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if (!empty($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'] . "/dashboard/device.php?id") && (isset($_POST['p_id']) || isset($_POST['id']))) {

        // >>>> Security check
        if (empty($_SESSION['skey']) || empty($_POST['skey']) || ($_SESSION['skey'] != $_POST['skey'])) {
            Auth::block();
        }
    } else {
        Auth::block();
    }
} else {
    Auth::block();
}

$ota = new OTA();
if (isset($_POST['p_id'])) {
    $bininfo = $ota->getBin($_POST['p_id']);
    echo $bininfo['lastversion'];
} elseif (isset($_POST['id'])) {
    $db = new Database();
    $conn = $db->getConn();
    if (isset($_POST['updated'])) {
        Esp_ID::setNeedOTA($conn, $_POST['id'], 0);// set state to need finished
    } else {
        Esp_ID::setNeedOTA($conn, $_POST['id'], 1); // set state to need update
    }
}
// echo 8;