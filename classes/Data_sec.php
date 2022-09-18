<?php

/**
 * SQLite Create Table Demo
 */
class Data_sec
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
    public $time;

    public function __construct($esp_id)
    {
        $this->esp_id = $esp_id;
        $this->pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
    }

    public function createTables()
    {
        $commands = [
            'CREATE TABLE IF NOT EXISTS \'sec\'(
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
	                                    time TEXT NOT NULL UNIQUE)',
            'CREATE INDEX IF NOT EXISTS time_index ON \'sec\' (time);'
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
        $sql = "INSERT INTO 'sec' VALUES(:v1,:i1,:p1,:e1,:f1,:pf1,:v2,:i2,:p2,:e2,:f2,:pf2,:v3,:i3,:p3,:e3,:f3,:pf3,:time)";
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
        $stmt->bindValue(':time', $this->time);
        if ($stmt->execute()) {
            return true;
        } else {
            return $stmt->errorInfo();
        }

        //$this->pdo->lastInsertId();
    }


    public static function getByESPID($esp_id, $columns = '*')
    {
        $sql = "SELECT {$columns}
                FROM 'sec'
                ORDER BY 'time' DESC;";
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $stmt = $pdo->query($sql);
        //var_dump($sql);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    // public static function checkExist($pdo, $tablename)
    // {
    //     $sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='{$tablename}'";
    //     $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
    //     //var_dump($sql);
    //     $stmt = $pdo->query($sql);
    //     return $stmt->fetch();
    // }


    public static function getLast($esp_id, $columns = '*')
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT $columns FROM 'sec' ORDER BY time DESC LIMIT 1";
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
        }
    }

    public static function delLast($esp_id)
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "DELETE FROM 'sec' WHERE time=(select max(time) from '{$esp_id}')";
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
        }
    }

    public static function getMinEnergy($esp_id, $time)
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT min(e1),min(e2),min(e3) 
        FROM 'sec' 
        WHERE DATE(time) = DATE('{$time}');";
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
        $sql = "SELECT $columns FROM 'sec' ORDER BY time DESC LIMIT {$limit}";
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
    }

    public static function getDaily($esp_id, $time)
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT max(e1)-min(e1) 
                FROM 'sec' 
                WHERE DATE(time) = DATE('{$time}');";
        //var_dump($sql);
        $stmt = $pdo->prepare($sql);
        //$stmt->bindValue(':esp_id', $esp_id);
        if ($stmt->execute()) {
            $result = $stmt->fetch();
            return $result[0];
        }
    }

    public static function getAvMin($esp_id, $time)
    {
        $pdo = new \PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/db/$esp_id.db");
        $sql = "SELECT printf('%.1f',avg(v1)),printf('%.3f',avg(i1)),printf('%.1f',avg(p1)),printf('%.3f',max(e1)),printf('%.1f',avg(f1)),printf('%.2f',avg(pf1))
                      ,printf('%.1f',avg(v2)),printf('%.3f',avg(i2)),printf('%.1f',avg(p2)),printf('%.3f',max(e2)),printf('%.1f',avg(f2)),printf('%.2f',avg(pf2))
                      ,printf('%.1f',avg(v3)),printf('%.3f',avg(i3)),printf('%.1f',avg(p3)),printf('%.3f',max(e3)),printf('%.1f',avg(f3)),printf('%.2f',avg(pf3))
                FROM 'sec' 
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
        $sql = "SELECT $columns FROM 'sec' 
        WHERE datetime(time) 
        BETWEEN datetime('{$start}') AND datetime('{$end}')
        ORDER BY time DESC";
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
        $sql = "DELETE FROM 'sec' 
        WHERE date(time) <= date('now', '-" . SECDATALIMIT . " days')";
        $stmt = $pdo->prepare($sql);
        // $stmt->bindValue(':esp_id', $esp_id);
        return $stmt->execute();
    }
}
