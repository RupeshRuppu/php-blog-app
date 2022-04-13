<?php

    include_once '../config.php';
    include_once './User.php';

    $query_string = $_SERVER['QUERY_STRING'];
    parse_str($query_string, $types);

    if($types['user'] === "register") {

        $new_user = new User(uniqid(), $_POST['fullname'], $_POST['email'], $_POST['password']);
        $new_user->create_new_user();

    } elseif ($types['user'] === "login") {

        $new_user = new User(null, null, $_POST['email'], $_POST['password']);
        $new_user->find_user_with_email();

    } else if ($types['user'] === "delete") {

        $new_user = new User($types['uid']);
        $new_user->delete_user_with_uid();

    }