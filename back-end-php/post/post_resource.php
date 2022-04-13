<?php

    include_once '../config.php';
    include_once './Post.php';

    $query_string = $_SERVER['QUERY_STRING'];
    parse_str($query_string, $types);
  
    $logic = $types['logic'];
    $userid = $postid = $searchParam = null;
    if(array_key_exists('userid', $types)) $userid = $types['userid'];
    if(array_key_exists('postid', $types)) $postid = $types['postid'];
    if(array_key_exists('search', $types)) $searchParam = $types['search'];
    switch ($logic) {
        case 'fetch_non_user_posts':
            $posts = new Post(null, null, null, null, $userid);
            $posts->fetch_all_posts();
            break;
        case 'fetch_user_posts':
            $posts = new Post(null, null, null, null, $userid);
            $posts->fetch_all_posts(true);
            break;
        case 'update_post':
            $posts = new Post($postid, $_POST['title'], $_POST['data'], $_POST['category']);
            $posts->update_post_with_pid();
            break;
        case 'specific_post':
            $posts = new Post($postid);
            $posts->fetch_all_posts(true, null, true);
            break;
        case 'delete_post':
            $posts = new Post($postid, null, null, null, $userid);
            $posts->delete_post_with_pid();
            break;
        case 'search_post':
            $posts = new Post();
            $posts->fetch_all_posts(true, $searchParam);
            break;
        case 'create_post':
            $posts = new Post(null, $_POST['title'], $_POST['data'], $_POST['category'], $userid);
            $posts->create_post();
            break;
    }