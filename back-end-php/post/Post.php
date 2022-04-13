<?php

    include_once '../database/dbconn.php';

    class Post extends Database {

        private $postid;
        private $posttitle;
        private $postdata;
        private $postcategory;
        private $useruid;

        public function __construct($pid=null, $ptitle=null, $pdata=null, $pcategory=null, $uuid=null) {
            $this->postid = $pid;
            $this->posttitle = $ptitle;
            $this->postdata = $pdata;
            $this->postcategory = $pcategory;
            $this->useruid = $uuid;
        }

        public function process_db_query($query_string) {
            try {
                $q_response = $this->dbconn->query($query_string);
                return $q_response;
            } catch(Exception $e) {
                return $e->getMessage();
            }
        }

        public function process_all_posts($r) {
            $array = array();
            while($row = $r->fetch_object()) {
                array_push($array, $row);
            } 
            return $array;
        }

        public function fetch_all_posts($users_posts=null, $search=null, $postid=null) {
            if(is_object($this->connect_to_database())) {
                $qstring = "";
                if(!$users_posts) {
                    $qstring =<<< EOF
                    SELECT * FROM posts WHERE uid!='$this->useruid'
                    EOF;
                } else if($search) {
                    $qstring =<<< EOF
                    SELECT *
                    FROM posts
                    WHERE LOWER(posttitle)
                    LIKE LOWER('%$search%')
                    EOF;
                } else if($postid) {
                    $qstring =<<< EOF
                    SELECT *
                    FROM posts WHERE postid='$this->postid'
                    EOF;
                } else {
                    $qstring =<<< EOF
                    SELECT * FROM posts WHERE uid='$this->useruid'
                    EOF;
                }

                $r = $this->process_db_query($qstring);
                if(is_string($r)) echo json_encode(array("error" => $r));
                else { 
                    echo json_encode(array("posts" => $this->process_all_posts($r)));
                }  
            }
        }

        public function update_post_with_pid() {
            if(is_object($this->connect_to_database())) {

                $qstring =<<< EOF
                UPDATE posts
                SET posttitle='$this->posttitle', postcategory='$this->postcategory', postdata='$this->postdata'
                WHERE postid='$this->postid'
                EOF;

                $r = $this->process_db_query($qstring);
                if(is_string($r)) echo json_encode(array("error" => $r));
                else echo json_encode(array("updated" => $r));
            }
        }

        public function delete_post_with_pid() {
            if(is_object($this->connect_to_database())) {

                $qstring =<<< EOF
                DELETE FROM posts where postid='$this->postid'
                EOF;

                $r = $this->process_db_query($qstring);
                if(is_string($r)) echo json_encode(array("error" => $r));
                else $this->fetch_all_posts(true);
            }
        }

        public function create_post() {
            if(is_object($this->connect_to_database())) {

                $qstring =<<< EOF
                INSERT INTO posts (posttitle, postdata, postcategory, uid) VALUES (
                    '$this->posttitle',
                    '$this->postdata',
                    '$this->postcategory',
                    '$this->useruid')
                EOF;

                $r = $this->process_db_query($qstring);
                if(is_string($r)) echo json_encode(array("error" => $r));
                else $this->fetch_all_posts();
            }
        }
    }
?>