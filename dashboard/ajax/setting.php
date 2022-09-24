<?php

require($_SERVER['DOCUMENT_ROOT'] . '/includes/init.php');
//$data = $_POST;

if (isset($_REQUEST['id']) && isset($_REQUEST['p_id']) && isset($_REQUEST['linetoken'])) { // save data
    echo (Linenotify::saveSetting($_REQUEST['id'], $_REQUEST['p_id'], $_REQUEST['linetoken'], $_REQUEST['dailynotify'], $_REQUEST['offlinenotify'], $_REQUEST['online_state']));
} else if (isset($_REQUEST['id']) && isset($_REQUEST['p_id'])) { // get data

    $data = Linenotify::getAll($_REQUEST['id'], $_REQUEST['p_id']);
    // var_dump($data);
    if ($data)
        echo json_encode($data);
    else echo ("");
}
