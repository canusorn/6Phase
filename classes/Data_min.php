<?php

/**
 * SQLite Create Table Demo
 */
class Data_min
{

    private $pdo;
    public $esp_id;
    public $v1;
    public $i1;
    public $p1;
    public $e1;
    public $f1;
    public $pf1;
    public $v2;
    public $i2;
    public $p2;
    public $e2;
    public $f2;
    public $pf2;
    public $v3;
    public $i3;
    public $p3;
    public $e3;
    public $f3;
    public $pf3;
    public $v4;
    public $i4;
    public $p4;
    public $e4;
    public $f4;
    public $pf4;
    public $v5;
    public $i5;
    public $p5;
    public $e5;
    public $f5;
    public $pf5;
    public $v6;
    public $i6;
    public $p6;
    public $e6;
    public $f6;
    public $pf6;
    public $time;

    public function __construct($esp_id)
    {
        $this->esp_id = $esp_id;
        $this->pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
    }

    public function createTables()
    {
        $commands = [
            'CREATE TABLE IF NOT EXISTS \'min\'(
                                        v1	REAL,
                                        i1	REAL,
                                        p1	REAL,
                                        e1	REAL,
                                        f1	REAL,
                                        pf1	REAL,
                                        v2	REAL,
                                        i2	REAL,
                                        p2	REAL,
                                        e2	REAL,
                                        f2	REAL,
                                        pf2	REAL,
                                        v3	REAL,
                                        i3	REAL,
                                        p3	REAL,
                                        e3	REAL,
                                        f3	REAL,
                                        pf3	REAL,
                                        v4	REAL,
	                                    i4	REAL,
	                                    p4	REAL,
	                                    e4	REAL,
	                                    f4	REAL,
	                                    pf4	REAL,
                                        v5	REAL,
	                                    i5	REAL,
	                                    p5	REAL,
	                                    e5	REAL,
	                                    f5	REAL,
	                                    pf5	REAL,
                                        v6	REAL,
	                                    i6	REAL,
	                                    p6	REAL,
	                                    e6	REAL,
	                                    f6	REAL,
	                                    pf6	REAL,
	                                    time TEXT NOT NULL UNIQUE)',
            'CREATE INDEX IF NOT EXISTS time_index ON \'min\' (time);'
        ];
        //var_dump($commands);

        // execute the sql commands to create new tables
        $error = [];
        foreach ($commands as $command) {
            if (!$this->pdo->exec($command)) {
                $error[] = 1;
            }
        }
        if (empty($error)) {
            return true;
        }
    }

    public function insert()
    {
        $sql = "INSERT INTO 'min' VALUES(:v1,:i1,:p1,:e1,:f1,:pf1,:v2,:i2,:p2,:e2,:f2,:pf2,:v3,:i3,:p3,:e3,:f3,:pf3,:v4,:i4,:p4,:e4,:f4,:pf4,:v5,:i5,:p5,:e5,:f5,:pf5,:v6,:i6,:p6,:e6,:f6,:pf6,:time)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':v1', $this->v1);
        $stmt->bindValue(':i1', $this->i1);
        $stmt->bindValue(':p1', $this->p1);
        $stmt->bindValue(':e1', $this->e1);
        $stmt->bindValue(':f1', $this->f1);
        $stmt->bindValue(':pf1', $this->pf1);
        $stmt->bindValue(':v2', $this->v2);
        $stmt->bindValue(':i2', $this->i2);
        $stmt->bindValue(':p2', $this->p2);
        $stmt->bindValue(':e2', $this->e2);
        $stmt->bindValue(':f2', $this->f2);
        $stmt->bindValue(':pf2', $this->pf2);
        $stmt->bindValue(':v3', $this->v3);
        $stmt->bindValue(':i3', $this->i3);
        $stmt->bindValue(':p3', $this->p3);
        $stmt->bindValue(':e3', $this->e3);
        $stmt->bindValue(':f3', $this->f3);
        $stmt->bindValue(':pf3', $this->pf3);
        $stmt->bindValue(':v4', $this->v4);
        $stmt->bindValue(':i4', $this->i4);
        $stmt->bindValue(':p4', $this->p4);
        $stmt->bindValue(':e4', $this->e4);
        $stmt->bindValue(':f4', $this->f4);
        $stmt->bindValue(':pf4', $this->pf4);
        $stmt->bindValue(':v5', $this->v5);
        $stmt->bindValue(':i5', $this->i5);
        $stmt->bindValue(':p5', $this->p5);
        $stmt->bindValue(':e5', $this->e5);
        $stmt->bindValue(':f5', $this->f5);
        $stmt->bindValue(':pf5', $this->pf5);
        $stmt->bindValue(':v6', $this->v6);
        $stmt->bindValue(':i6', $this->i6);
        $stmt->bindValue(':p6', $this->p6);
        $stmt->bindValue(':e6', $this->e6);
        $stmt->bindValue(':f6', $this->f6);
        $stmt->bindValue(':pf6', $this->pf6);
        $stmt->bindValue(':time', $this->time);
        if ($stmt->execute()) {
            return true;
        } else {
            return $stmt->errorInfo();
        }

        //$this->pdo->lastInsertId();
    }

    public static function getLast($esp_id, $limit = 1, $columns = '*')
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT $columns FROM 'min' ORDER BY time DESC LIMIT {$limit}";
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
        }
    }

    public static function getLastMulti($esp_id, $limit = 10, $columns = '*')
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT $columns FROM 'min' ORDER BY time DESC LIMIT {$limit}";
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
    }

    public static function getAvHr($esp_id, $time)
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT printf('%.1f',avg(v1)),printf('%.3f',avg(i1)),printf('%.1f',avg(p1)),printf('%.3f',max(e1)),printf('%.1f',avg(f1)),printf('%.2f',avg(pf1))
                      ,printf('%.1f',avg(v2)),printf('%.3f',avg(i2)),printf('%.1f',avg(p2)),printf('%.3f',max(e2)),printf('%.1f',avg(f2)),printf('%.2f',avg(pf2))
                      ,printf('%.1f',avg(v3)),printf('%.3f',avg(i3)),printf('%.1f',avg(p3)),printf('%.3f',max(e3)),printf('%.1f',avg(f3)),printf('%.2f',avg(pf3))
                      ,printf('%.1f',avg(v4)),printf('%.3f',avg(i4)),printf('%.1f',avg(p4)),printf('%.3f',max(e4)),printf('%.1f',avg(f4)),printf('%.2f',avg(pf4))
                      ,printf('%.1f',avg(v5)),printf('%.3f',avg(i5)),printf('%.1f',avg(p5)),printf('%.3f',max(e5)),printf('%.1f',avg(f5)),printf('%.2f',avg(pf5))
                      ,printf('%.1f',avg(v6)),printf('%.3f',avg(i6)),printf('%.1f',avg(p6)),printf('%.3f',max(e6)),printf('%.1f',avg(f6)),printf('%.2f',avg(pf6))
                FROM 'min' 
                WHERE time LIKE '{$time}%';";
        //var_dump($sql);
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetch();
            // var_dump($result);
            return $result;
        }
    }

    public static function getRange($esp_id, $start, $end, $columns = '*')
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT $columns FROM 'min' 
        WHERE datetime(time) 
        BETWEEN datetime('{$start}') AND datetime('{$end}')
        ORDER BY time DESC LIMIT 49999";
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
    }

    public static function deleteOldData($esp_id)
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "DELETE FROM 'min' 
        WHERE date(time) <= date('now', '-" . MINDATALIMIT . " days')";
        $stmt = $pdo->prepare($sql);
        // $stmt->bindValue(':esp_id', $esp_id);
        return $stmt->execute();
    }
}
