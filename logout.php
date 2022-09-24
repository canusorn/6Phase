<?php

require 'includes/init.php';

$_SESSION = [];

setcookie("is_login", 0, time() - 100); // delete

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

session_destroy();

header("Location: http://" . $_SERVER['HTTP_HOST']);
exit;
