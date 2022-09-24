 <?php

if (isset($_POST['id'])) {
    $thisID = $_POST['id'];
} else {
    $thisID = $_GET['id'];
}

if (isset($_POST['skey'])) {
    $thisSKEY = $_POST['skey'];
} else {
    $thisSKEY = $_SESSION['skey'];
}

?> 


<!-- Main content -->
<section class="content">
    <div class="container-fluid">

        <style type="text/css">
            fieldset {
                border: 2px solid dimgray;
                padding: 10px;
                border-radius: 5px;
            }
        </style>

        <script type="text/javascript">
            // bootstrap tooltips
            $(function() {
                $('[data-toggle="tooltip"]').tooltip()
            })
        </script>

        <div class="row">

            <div class="col-md-6 col-sm-12" id="io">
                <div class="card card-dark">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fa-solid fa-toggle-off"></i> Input Output</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">

                        <div id="output-io">
                            <form method="post" action="ajax/pin.php" id="pin-form">

                                <fieldset>
                                    <legend>เพิ่มพิน</legend>
                                    <div class="row">
                                        <input type="hidden" name="id" value="<?= $thisID ?>" />
                                        <input type="hidden" name="skey" value="<?= $thisSKEY; ?>" />

                                        <div class="col-3">
                                            <div class="form-group">
                                                <label for="pin" data-toggle="tooltip" title="Pin ที่ต้องการใช้งาน ต้องเป็น pin ที่ไม่ได้งานกับเซนเซอร์อยู่แล้ว">Pin</label><select class="custom-select form-control-border border-width-2" name="pin" required>
                                                    <option>D0</option>
                                                    <option>D1</option>
                                                    <option>D2</option>
                                                    <option>D3</option>
                                                    <option>D4</option>
                                                    <option>D5</option>
                                                    <option>D6</option>
                                                    <option>D7</option>
                                                    <option>D8</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-group">
                                                <label for="pin_mode" data-toggle="tooltip" title="Mode ที่ใช้งาน">Mode</label><select class="custom-select form-control-border border-width-2" name="pin_mode" required>
                                                    <option>INPUT</option>
                                                    <option>OUTPUT</option>
                                                    <option>PWM</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-group"><label for="detail" data-toggle="tooltip" title="ตั้งชื่อเพื่อให้จำง่าย">ชื่อ</label> <input type="text" class="form-control form-control-border" name="detail" placeholder="ตั้งชื่อ" /></div>
                                        </div>

                                    </div>

                                    <div class="d-flex justify-content-end mr-2">
                                        <button type="submit" class="btn btn-primary" id="pin_add"><i class="fa-solid fa-circle-plus"></i> เพิ่ม</button>
                                    </div>
                                </fieldset>
                            </form>

                            <hr class="mb-3">
                            <h3>พินที่ใช้งาน</h3>
                            <table class="table table-hover table-striped text-center text-light" id="pin_table" style="width:100%">
                                <thead>
                                    <tr>
                                        <th scope="col">Pin</th>
                                        <th scope="col">Mode</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                            </table>

                            <script>
                                var esp_id = <?= $thisID ?>;
                                var sk = '<?= $thisSKEY; ?>';
                            </script>
                            <script type="text/javascript" src="js/pin.js"></script>
                        </div>

                    </div>

                </div>
                <!-- /.card-body -->
            </div>


            <div class="col-md-6 col-sm-12" id="timer">
                <div class="card card-dark">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fa-solid fa-stopwatch"></i> Timer</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">

                        <div id="output-timer">
                            <fieldset>
                                <legend>เพิ่ม Timer</legend>

                                <form method="post" action="ajax/io-timer.php" id="io-timer-form">
                                    <div class="row">

                                        <input type="hidden" name="id" value="<?= $thisID ?>" />
                                        <input type="hidden" name="skey" value="<?= $thisSKEY; ?>" />

                                        <div class="col-3">
                                            <div class="form-group">
                                                <label for="pin_timer" data-toggle="tooltip" title="Pin ที่ต้องการใช้งาน ต้องเป็น pin ที่ไม่ได้งานกับเซนเซอร์อยู่แล้ว">Pin</label><select class="custom-select form-control-border border-width-2" name="pin_timer" required>
                                                    <option>D0</option>
                                                    <option>D1</option>
                                                    <option>D2</option>
                                                    <option>D3</option>
                                                    <option>D4</option>
                                                    <option>D5</option>
                                                    <option>D6</option>
                                                    <option>D7</option>
                                                    <option>D8</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-3">
                                            <div class="form-group">
                                                <label for="start_time" data-toggle="tooltip" title="ต้องเวลาที่เริ่ม On">เวลาเริ่ม</label> <input type="text" class="start_time form-control form-control-border" placeholder="เวลาเริ่มเปิด" name="start_time" required />
                                            </div>
                                        </div>

                                        <div class="col-3">
                                            <div class="form-group"><label for="interval_sec" data-toggle="tooltip" title="ระยะเวลาที่ต้องการให้ On">ระยะเวลา</label> <input type="text" class="interval_sec form-control form-control-border" placeholder="ชม:นาที:วินาที" name="interval_sec" REQUIRED /></div>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-group"><label for="h-l" data-toggle="tooltip" title="Active High จ่ายไฟ 3v, Active Low - จ่ายไฟ 0v">Active H/L</label> <select class="custom-select form-control-border border-width-2" name="h-l" required>
                                                    <option value="1">Active High</option>
                                                    <option value="0">Active Low</option>
                                                </select></div>
                                        </div>

                                        <div class="col">
                                            <div class="form-group"><label for="detail" data-toggle="tooltip" title="ตั้งชื่อเพื่อให้จำง่าย">ชื่อ</label> <input type="text" class="form-control form-control-border" name="detail" placeholder="ตั้งชื่อ" /></div>
                                        </div>

                                    </div>
                                    <div class="d-flex justify-content-end mr-2">
                                        <button type="submit" class="btn btn-primary" id="timer_add"><i class="fa-solid fa-circle-plus"></i> เพิ่ม</button>
                                    </div>
                                </form>
                            </fieldset>

                            <hr class="mb-3">
                            <h3>Timer ที่ใช้งาน</h3>
                            <table class="table table-hover table-striped text-center text-light" id="io-timer_table" style="width:100%">
                                <thead>
                                    <tr>
                                        <th scope="col">pin</th>
                                        <th scope="col">เวลา</th>
                                        <th scope="col">ระยะเวลาเปิด</th>
                                        <th scope="col">Active H/L</th>
                                        <th scope="col">detail</th>
                                        <th scope="col">ลบ</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <script>
                            var esp_id = <?= $thisID ?>;
                            var sk = '<?= $thisSKEY; ?>';
                        </script>
                        <script type="text/javascript" src="js/io-timer.js"></script>
                        <!-- /.card-body -->

                    </div>

                </div>
                <!-- /.card-body -->
            </div>

        </div>

    </div>
</section>