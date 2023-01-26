<?php

require 'includes/header.php';

if (!isset($_SESSION['is_login'])) {
    header("Location: http://" . $_SERVER['HTTP_HOST']);
    exit;
}

// device to display
$activedevice = ESP_ID;
?>


<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col">
                <div id="subject" class="d-flex flex-row bd-highlight mb-3">
                    <h1 class="m-0 pr-2">อุปกรณ์บันทึกและแสดงค่าพลังงานไฟฟ้าผ่านเครือข่ายไร้สาย</h1>
                    <span id="device_status" class="badge badge-secondary align-self-center"></span>
                </div>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->



<div class="container-fluid" id="body-content">

    <?php
    require 'includes/custom/1_6phase.php';
    ?>

</div>

<?php require 'includes/footer.php'; ?>

<script type="text/javascript">
    $(document).ready(function() {
        $("a[href='/dashboard']").addClass("active");
        $("a[href='/dashboard']").parent().addClass("menu-open");
    });
</script>