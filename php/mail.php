<?php

iconv_set_encoding("internal_encoding", "UTF-8");	

    $to = "br.martin1@email.cz";
    $from = $_POST["contact-email"];
    $name = $_POST["contact-name"];
    $subject = $_POST["contact-subject"];
    $message = $_POST["contact-message"];
    $g_token = $_POST["g-recaptcha-response"];
    $g_secret = "";
    $ip = $_SERVER['REMOTE_ADDR'];
    $g_url = "https://www.google.com/recaptcha/api/siteverify?secret=".$g_secret."&response=".$g_token."&remoteip=".$ip;
    $g_request = file_get_contents($g_url);
    $g_response = json_decode($g_request);

    if($g_response->success == 1) {

        if(!isset($name)) {
            echo "<span>Invalid value for Name</span>";
            exit();
        }

        if(!isset($from)) {
            echo "<span>Invalid value for Email</span>";
            exit();
        }

        if(!isset($subject)) {
            echo "<span>Invalid value for Subject</span>";
            exit();
        }

        if(!isset($message)) {
            echo "<span>Invalid value for Message</span>";
            exit();
        }

        $url = "https://api.sendgrid.com/v3/mail/send";
        $data = "{\"personalizations\": [{\"to\": [{\"email\": \"martin.brablik@sensio.cz\"}]}], \"from\": {\"email\": \"$to\"}, \"subject\": \"$name - $subject\", \"content\": [{\"type\": \"text/plain\", \"value\": \"Reply to: $from $message\"}]}";
        $curl = curl_init($url);
        
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Authorization: Bearer ",
        ));
        
        $response = curl_exec($curl);

        if($response !== false) {
            echo "<span style=\"color: green;\">Message sent successfully</span>";
            curl_close($curl);
            exit();
        }
        else {
            echo "<span style=\"color: red;\">Message could not be sent</span>";
            curl_close($curl);
            exit();
        }
    }
    else {
        echo "<span style=\"color: red;\">Human verification failed</span>";
        exit();
    }
?>		