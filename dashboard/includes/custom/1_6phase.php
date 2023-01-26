
<!-- Main content -->
<section class="content">
    <div class="container-fluid">

        <div class="d-inline-flex flex-column">
            <div class="btn-group btn-group-toggle mb-3 " data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="radio" name="options" id="overview_option" href="#overview" autocomplete="off" checked> ภาพรวม
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="history_option" autocomplete="off"> ประวัติย้อนหลัง
                </label>
            </div>
        </div>

        <div class="row" id="value">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">ค่าพารามิเตอร์จาก MDB 1</h4>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <!-- ./card-body -->
                    <div class="card-body">
                        <div class="container">
                            <h4><svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" fill="currentColor" class="bi bi-1-square" viewBox="0 0 16 16">
                                    <path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
                                </svg> Phase1</h4>
                            <div class="row">
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 17%</span> -->
                                        <h5 class="description-header mb-2" id="voltage1"></h5>
                                        <span class="description-text">Voltage [v]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block ">
                                        <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                        <h5 class="description-header mb-2" id="current1"></h5>
                                        <span class="description-text">Current [A]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 20%</span> -->
                                        <h5 class="description-header mb-2" id="power1"></h5>
                                        <span class="description-text">Power [W]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="energy1"></h5>
                                        <span class="description-text">Today Energy [kWh]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="frequency1"></h5>
                                        <span class="description-text">Frequency [Hz]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4 ">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="pf1"></h5>
                                        <span class="description-text">power factor</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                            </div>
                        </div>

                        <div class="container mt-2">
                            <h4><svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" fill="currentColor" class="bi bi-2-square" viewBox="0 0 16 16">
                                    <path d="M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
                                </svg> Phase2</h4>
                            <div class="row">
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 17%</span> -->
                                        <h5 class="description-header mb-2" id="voltage2"></h5>
                                        <span class="description-text">Voltage [v]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block ">
                                        <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                        <h5 class="description-header mb-2" id="current2"></h5>
                                        <span class="description-text">Current [A]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 20%</span> -->
                                        <h5 class="description-header mb-2" id="power2"></h5>
                                        <span class="description-text">Power [W]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="energy2"></h5>
                                        <span class="description-text">Today Energy [kWh]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="frequency2"></h5>
                                        <span class="description-text">Frequency [Hz]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4 ">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="pf2"></h5>
                                        <span class="description-text">power factor</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                            </div>
                            <!-- <div class="row justify-content-center">
                                <div class="col-sm-3 col-6">
                                    <div class="description-block">
                                        <span class="description-percentage"><i class="fa-solid fa-wallet"></i> ค่าไฟวันนี้</span>
                                        <h5 class="description-header mb-2 mt-3" id="bill2_111"></h5>
                                        <h5 class="description-header mb-2" id="bill2_112"></h5>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-6">
                                    <div class="description-block">
                                        <span class="description-percentage"><i class="fa-solid fa-wallet"></i> ค่าไฟ30วันล่าสุด</span>
                                        <h5 class="description-header mb-2 mt-3" id="bill2_111_mouth"></h5>
                                        <h5 class="description-header mb-2" id="bill2_112_mouth"></h5>
                                    </div>
                                </div>
                            </div> -->
                        </div>

                        <div class="container mt-2">
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" fill="currentColor" class="bi bi-3-square" viewBox="0 0 16 16">
                                    <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
                                </svg> Phase3</h4>
                            <div class="row">
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 17%</span> -->
                                        <h5 class="description-header mb-2" id="voltage3"></h5>
                                        <span class="description-text">Voltage [v]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block ">
                                        <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                        <h5 class="description-header mb-2" id="current3"></h5>
                                        <span class="description-text">Current [A]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 20%</span> -->
                                        <h5 class="description-header mb-2" id="power3"></h5>
                                        <span class="description-text">Power [W]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="energy3"></h5>
                                        <span class="description-text">Today Energy [kWh]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="frequency3"></h5>
                                        <span class="description-text">Frequency [Hz]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4 ">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="pf3"></h5>
                                        <span class="description-text">power factor</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- <div class="card-footer" id="time"></div> -->
                    <!-- /.card-footer -->
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->

            <div class="col-xl-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">ค่าพารามิเตอร์จาก MDB 2</h4>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <!-- ./card-body -->
                    <div class="card-body">

                        <div class="container">
                            <h4><svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" fill="currentColor" class="bi bi-1-square" viewBox="0 0 16 16">
                                    <path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
                                </svg> Phase1</h4>
                            <div class="row">
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 17%</span> -->
                                        <h5 class="description-header mb-2" id="voltage4"></h5>
                                        <span class="description-text">Voltage [v]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block ">
                                        <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                        <h5 class="description-header mb-2" id="current4"></h5>
                                        <span class="description-text">Current [A]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 20%</span> -->
                                        <h5 class="description-header mb-2" id="power4"></h5>
                                        <span class="description-text">Power [W]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="energy4"></h5>
                                        <span class="description-text">Today Energy [kWh]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="frequency4"></h5>
                                        <span class="description-text">Frequency [Hz]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4 ">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="pf4"></h5>
                                        <span class="description-text">power factor</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                            </div>
                        </div>

                        <div class="container mt-2">
                            <h4><svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" fill="currentColor" class="bi bi-2-square" viewBox="0 0 16 16">
                                    <path d="M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
                                </svg> Phase2</h4>
                            <div class="row">
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 17%</span> -->
                                        <h5 class="description-header mb-2" id="voltage5"></h5>
                                        <span class="description-text">Voltage [v]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block ">
                                        <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                        <h5 class="description-header mb-2" id="current5"></h5>
                                        <span class="description-text">Current [A]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 20%</span> -->
                                        <h5 class="description-header mb-2" id="power5"></h5>
                                        <span class="description-text">Power [W]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="energy5"></h5>
                                        <span class="description-text">Today Energy [kWh]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="frequency5"></h5>
                                        <span class="description-text">Frequency [Hz]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4 ">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="pf5"></h5>
                                        <span class="description-text">power factor</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                            </div>
                        </div>

                        <div class="container mt-2">
                            <h4><svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" fill="currentColor" class="bi bi-3-square" viewBox="0 0 16 16">
                                    <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
                                </svg> Phase3</h4>
                            <div class="row">
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 17%</span> -->
                                        <h5 class="description-header mb-2" id="voltage6"></h5>
                                        <span class="description-text">Voltage [v]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block ">
                                        <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                        <h5 class="description-header mb-2" id="current6"></h5>
                                        <span class="description-text">Current [A]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-success"><i class="fas fa-caret-up"></i> 20%</span> -->
                                        <h5 class="description-header mb-2" id="power6"></h5>
                                        <span class="description-text">Power [W]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="energy6"></h5>
                                        <span class="description-text">Today Energy [kWh]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="frequency6"></h5>
                                        <span class="description-text">Frequency [Hz]</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <div class="col-md-2 col-4 ">
                                    <div class="description-block">
                                        <!-- <span class="description-percentage text-danger"><i class="fas fa-caret-down"></i> 18%</span> -->
                                        <h5 class="description-header mb-2" id="pf6"></h5>
                                        <span class="description-text">power factor</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="card-footer" id="time"></div> -->
                    <!-- /.card-footer -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <div class="row">
            <div class="col-md-12" id="chart">
                <div class="card">
                    <!-- Loading (remove the following to stop the loading)-->
                    <div class="overlay dark">
                        <i class="fas fa-3x fa-sync-alt"></i>
                        <h3></h3>
                    </div>
                    <!-- end loading -->
                    <div class="card-header">
                        <h5 class="card-title" id="chart_name">ค่ากำลังไฟฟ้าล่าสุด [watt]</h5>
                        <div class="card-tools history_option_class">
                            <ul class="nav nav-pills ml-auto p-2">
                                <li class="nav-item day_view_class p-1"><a class="nav-link active" id="day_view" href="#Chart1" data-toggle="tab">รายวัน</a></li>
                                <li class="nav-item day_view_class p-1"><a class="nav-link" id="mouth_view" href="#Charthistory" data-toggle="tab">เดือน</a></li>
                                <li class="nav-item day_view_class p-1 pr-2"><a class="nav-link" id="history_view" href="#uplot" data-toggle="tab">ย้อนหลัง</a></li>
                                <button type="button" id="csvdownload" class="btn btn-outline-secondary text-light btn-sm  history_view_class" title="download csv file">
                                    <i class="fa-solid fa-download"></i>&nbsp;<span>CSV</span>
                                </button>
                                <button type="button" class="btn btn-outline-secondary text-light btn-sm daterange history_view_class" title="Date range">
                                    <i class="far fa-calendar-alt"></i>&nbsp;<span></span>
                                </button>
                                <button type="button" class="btn btn-tool history_view_class" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </ul>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">

                        <!-- /.card-header -->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="chart" id="Charthistory">
                                    <canvas id="Chart_history" height="300" style="height: 300px;"></canvas>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="chart" id="uplot">
                                    <div id="areaChart1" style="min-height: 250px; height: 400px; max-height: 400px; max-width: 100%;"></div>
                                    <div class="mt-5" id="areaChart2" style="min-height: 250px; height: 400px; max-height: 400px; max-width: 100%;"></div>
                                    <div class="mt-5" id="areaChart3" style="min-height: 250px; height: 400px; max-height: 400px; max-width: 100%;"></div>
                                    <div class="mt-5" id="areaChart4" style="min-height: 250px; height: 400px; max-height: 400px; max-width: 100%;"></div>
                                    <div class="mt-5" id="areaChart5" style="min-height: 250px; height: 400px; max-height: 400px; max-width: 100%;"></div>
                                    <div class="mt-5" id="areaChart6" style="min-height: 250px; height: 400px; max-height: 400px; max-width: 100%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card day-view-page">
                    <!-- Loading (remove the following to stop the loading)-->
                    <div class="overlay dark">
                        <i class="fas fa-3x fa-sync-alt"></i>
                        <h3></h3>
                    </div>
                    <!-- end loading -->
                    <div class="card-header">
                        <h5 class="card-title">ค่าไฟวันนี้</h5>
                        <div class="card-tools">
                            <ul class="nav nav-pills ml-auto p-2">
                                <button type="button" id="day_csvdownload" class="btn btn-outline-secondary text-light btn-sm  day-view-page" title="download csv file">
                                    <i class="fa-solid fa-download"></i>&nbsp;<span>CSV</span>
                                </button>
                                <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </ul>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-12 ">
                                <div class="chart">
                                    <canvas id="Chart_minute_bill" height="300" style="height: 300px;"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- daily load curve -->
                <div class="card overview-page">
                    <div class="card-header">
                        <h5 class="card-title">Daily Load Curve</h5>
                        <div class="card-tools">
                            <ul class="nav nav-pills ml-auto p-2">
                                <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </ul>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-12 ">
                                <div class="chart">
                                    <canvas id="daily_load_curve" height="300" style="height: 300px;"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- daily load curve -->
                <div class="card overview-page">
                    <div class="card-header">
                        <h5 class="card-title">Daily Load Curve</h5>
                        <div class="card-tools">
                            <ul class="nav nav-pills ml-auto p-2">
                                <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </ul>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-12 ">
                                <div class="chart">
                                    <canvas id="daily_load_curve_2" height="300" style="height: 300px;"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- daily load curve -->
                <div class="card overview-page">
                    <div class="card-header">
                        <h5 class="card-title">Daily Load Curve</h5>
                        <div class="card-tools">
                            <ul class="nav nav-pills ml-auto p-2">
                                <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </ul>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-12 ">
                                <div class="chart">
                                    <canvas id="daily_load_curve_3" height="300" style="height: 300px;"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card overview-page">
                    <div class="card-header">
                        <h5 class="card-title">Weekly Load Bar Chart</h5>
                        <div class="card-tools">
                            <!-- <ul class="nav nav-pills ml-auto p-2"> -->
                            <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <!-- </ul> -->
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-sm-1">
                                    <div class="row justify-content-center">
                                        <div class="description-block ">
                                            <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                            <h5 class="description-header" id="week_energy"></h5>
                                            <span class="description-text">ค่าพลังงานที่ใช้ไป(kWh)</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-11">
                                    <div class="chart">
                                        <canvas id="weekly_load_bar" height="300" style="height: 300px;"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card month-view-page">
                    <!-- Loading (remove the following to stop the loading)-->
                    <div class="overlay dark">
                        <i class="fas fa-3x fa-sync-alt"></i>
                        <h3></h3>
                    </div>
                    <!-- end loading -->
                    <div class="card-header">
                        <h5 class="card-title">ค่าไฟแต่ละวัน</h5>
                        <div class="card-tools">
                            <!-- <ul class="nav nav-pills ml-auto p-2"> -->
                            <button type="button" id="month_csvdownload" class="btn btn-outline-secondary text-light btn-sm  month-view-page" title="download csv file">
                                <i class="fa-solid fa-download"></i>&nbsp;<span>CSV</span>
                            </button>
                            <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <!-- </ul> -->
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-md-2">
                                    <div class="row justify-content-center">
                                        <div class="description-block ">
                                            <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                            <h5 class="description-header mb-2" id="month_energy"></h5>
                                            <span class="description-text">หน่วยในเดือนนี้</span>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center">
                                        <div class="description-block ">
                                            <!-- <span class="description-percentage text-warning"><i class="fas fa-caret-left"></i> 0%</span> -->
                                            <h5 class="description-header mb-2" id="month_bill"></h5>
                                            <span class="description-text">ค่าไฟเดือนนี้</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-10 ">
                                    <div class="chart">
                                        <canvas id="Chart_day_bill" height="300" style="height: 300px;"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card month-view-page">
                    <!-- Loading (remove the following to stop the loading)-->
                    <div class="overlay dark">
                        <i class="fas fa-3x fa-sync-alt"></i>
                        <h3></h3>
                    </div>
                    <!-- end loading -->
                    <div class="card-header">
                        <h5 class="card-title">ค่าไฟแต่ละเดือน</h5>
                        <div class="card-tools">
                            <!-- <ul class="nav nav-pills ml-auto p-2"> -->
                            <button type="button" id="eachmonth_csvdownload" class="btn btn-outline-secondary text-light btn-sm  month-view-page" title="download csv file">
                                <i class="fa-solid fa-download"></i>&nbsp;<span>CSV</span>
                            </button>
                            <button type="button" class="btn btn-tool text-light" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <!-- </ul> -->
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-md-12 ">
                                    <div class="chart">
                                        <canvas id="Chart_month_bill" height="300" style="height: 300px;"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- toast  -->
            <div aria-live="polite" aria-atomic="true" class="position-fixed bottom-5 right-5 p-5 m-3" style="z-index: 5; right: 5px; bottom: 5px;">
                <div class="toast text-white bg-success border-0" data-delay="5000" style="position: absolute; bottom: 0; right: 0;">
                    <div class="toast-header">
                        <i class="fa-solid fa-bell"></i>
                        <strong class="mr-auto"> IoTkiddie</strong>
                        <!-- <small>now</small> -->
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="toast-body">
                        <p id="toast-body"></p>
                    </div>
                </div>
            </div>


</section>


<!-- script for real time chart -->
<script>
    var esp_id = <?= ESP_ID ?>;
</script>
<script type="text/javascript" src="js/ebill.js?n=2"></script>
<script type="text/javascript" src="includes/custom/1_6phase.js?n=2"></script>