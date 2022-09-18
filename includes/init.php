<?php

/**
 * Initialisations
 *
 * Register an autoloader, start or resume the session etc.
 */

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

spl_autoload_register(function ($class) {
    require dirname(__DIR__) . "/classes/{$class}.php";
});

session_start();

require dirname(__DIR__) . "/includes/config.php";