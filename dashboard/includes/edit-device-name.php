<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // var_dump($_POST);
    if (isset($_POST["device-name"])) {
        Esp_ID::rename($conn, $_GET['id'], $_POST['device-name']);
    }
}
