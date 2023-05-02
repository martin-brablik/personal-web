<?php

iconv_set_encoding("internal_encoding", "UTF-8");	

    $to = "postmaster@martinbrablik.cz";
    $token = $_POST["g-recaptcha-response"];
    $secret = "";
    $ip = $_SERVER['REMOTE_ADDR'];
    $url = "https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$token."&remoteip=".$ip;
    $request = file_get_contents($url);
    $response = json_decode($request);

    if($response->success == 1) {

        if(!isset($_POST["contact-name"])) {
            echo "<span>Invalid value for Name</span>";
            exit();
        }

        if(!isset($_POST["contact-email"])) {
            echo "<span>Invalid value for Email</span>";
            exit();
        }

        if(!isset($_POST["contact-subject"])) {
            echo "<span>Invalid value for Subject</span>";
            exit();
        }

        if(!isset($_POST["contact-message"])) {
            echo "<span>Invalid value for Message</span>";
            exit();
        }

        $headers = "from: \n".$_POST["contact-email"];

        if(mail(utf8_decode($to), utf8_decode($_POST["contact-subject"]), utf8_decode($_POST["contact-email"] . ' says:' . "\r\n" . $_POST["contact-message"]), utf8_decode($headers))) {
            echo "<span style=\"color: #22CB5C;\">Message sent successfully!</span>";
            exit();
        }
        else {
            echo "<span style=\"color: red;\">Your message could not be sent</span>";
            exit();
        }
    }
    else {
        echo "<span style=\"color: red;\">Human verification failed</span>";
        exit();
    }
?>		