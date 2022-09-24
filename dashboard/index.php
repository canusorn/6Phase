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
            <div class="col-sm-6">
                <div class="d-flex flex-row bd-highlight mb-3">
                    <h1 class="m-0 pr-2"><?= $activedevice ?></h1>
                    <span id="device_status" class="badge badge-secondary align-self-center"></span>
                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#editdevicename">
                        <i class="bi bi-pencil-square text-dark"></i>
                    </button>
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

<!-- for rename device -->
<div class="modal fade" id="editdevicename" tabindex="-1" aria-labelledby="edit-device-name" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="edit-device-name">แก้ไขชื่ออุปกรณ์</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="edit-form" action="device.php?id=<?= $_GET['id'] ?>" method="post">
                    <div class="form-group">
                        <label for="device-name" class="col-form-label">ชื่ออุปกรณ์:</label>
                        <input type="text" class="form-control" id="device-name" name="device-name" value="<?= $activedevice['device_name'] ?>">
                    </div>
                    <div style="text-align: right">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                        <button type="submit" class="btn btn-primary">ตกลง</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    <?php
    if (!is_null($activedevice['version']) && $activedevice['version'] >= 9) : ?>
        var version = <?= $activedevice['version'] ?>;
    <?php else : ?>
        var version = 0;
    <?php endif; ?>
</script>
<script src="js/pagefetch.js"></script>

<?php require 'includes/footer.php'; ?>

<script type="text/javascript">
    $(document).ready(function() {
        $("a[href='/dashboard']").addClass("active");
        $("a[href='/dashboard']").parent().addClass("menu-open");
    });
</script>