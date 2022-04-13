<?php
    class Database {

        private $host = "127.0.0.1";
        private $user = "root";
        private $password = "";
        private $database = "php";
        public $dbconn; 

        public function __construct() {
            $this->dbconn = null;
        }

        public function connect_to_database() {
            try {
                $this->dbconn = new mysqli($this->host, $this->user, $this->password, $this->database);
                return $this->dbconn;
            } catch(Exception $e) {
                return $e->getMessage();
            }
        }     
    }
?>