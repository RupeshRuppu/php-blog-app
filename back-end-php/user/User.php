<?php

    include_once '../database/dbconn.php';

    class User extends Database {

        private $uid;
        private $fullname;
        private $email;
        private $password;

        public function __construct($id=null, $fname=null, $e=null, $pass=null) {
            $this->uid = $id;
            $this->fullname = $fname;
            $this->email = $e;
            $this->password = $pass;
        }

        public function process_db_query($query_string) {
            try {
                $q_response = $this->dbconn->query($query_string);
                return $q_response;
            } catch(Exception $e) {
                return $e->getMessage();
            }
        }

        public function create_new_user() {
            if(is_object($this->connect_to_database())) {

                $qstring =<<< EOF
                INSERT INTO users (uid, fullname, email, password) VALUES ('$this->uid', '$this->fullname', '$this->email', md5('$this->password'))
                EOF;

                $r = $this->process_db_query($qstring);
                if(is_string($r)) echo json_encode(array("error" => $r));
                else {
                    $qstring =<<< EOF
                    SELECT uid, fullname, email FROM users WHERE uid='$this->uid';
                    EOF;
                    $r = $this->process_db_query($qstring);
                    if(is_string($r)) echo json_encode(array("error" => $r));
                    else {
                            
                            $to_email = $this->email;
                            $subject = "Welcome mail notification from Deep Dive";
                            $body = "We are happy for being and getting started with us.";
                            $headers = "From: DummyDon Deep Dive Team";

                            mail($to_email, $subject, $body, $headers);
                            
                        echo json_encode(array("user_register_data" => $r->fetch_object()));
                    } 
                }
            }
        }

        public function find_user_with_email() {
            if(is_object($this->connect_to_database())) {

                $qstring =<<< EOF
                SELECT uid, fullname, email FROM users where email='$this->email' and password=md5('$this->password')
                EOF;

                $r = $this->process_db_query($qstring);
                if(is_string($r)) echo json_encode(array("error" => $r));
                else echo json_encode(array('user_login_data' => $r->fetch_object()));
            }
        }

        public function delete_user_with_uid() {
            if(is_object($this->connect_to_database())) {

                $qstring =<<< EOF
                DELETE FROM users where uid='$this->uid'
                EOF;

                $r = $this->process_db_query($qstring);
                if(is_string($r)) echo json_encode(array("error" => $r));
                echo json_encode(array("user_deleted" => $r));
            }
        }
    }
?>