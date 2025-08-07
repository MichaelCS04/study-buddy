<?php
session_start();
include 'connect.php';

$domain = "dev-j3u0k30o4e238kfc.us.auth0.com";
$client_id = "qFQnEBGcLWmNd2v0XdE04yAefGJO1zO7";
$client_secret = "RtWiz9BkeRf9ToP2C2oA27S-MColKliilWWNo97BYq-gaUYo21tVmaJyakJUN3N6";
$redirect_uri = "https://study-buddy.infinityfree.me/google-callback.php";

if (isset($_GET['code'])) {
    $code = $_GET['code'];

    $token_url = "https://$domain/oauth/token";
    $token_data = [
        "grant_type" => "authorization_code",
        "client_id" => $client_id,
        "client_secret" => $client_secret,
        "code" => $code,
        "redirect_uri" => $redirect_uri
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $token_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($token_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    curl_close($ch);
    $tokens = json_decode($response, true);

    if (isset($tokens['access_token'])) {
        $access_token = $tokens['access_token'];
        $user_url = "https://$domain/userinfo";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $user_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer $access_token"
        ]);
        $user_info = curl_exec($ch);
        curl_close($ch);
        $user = json_decode($user_info, true);

        $firstName = $user['given_name'];
        $lastName = $user['family_name'];
        $email = $user['email'];

        $_SESSION['fName'] = $firstName;
        $_SESSION['lName'] = $lastName;
        $_SESSION['email'] = $email;

        $check = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($conn, $check);

        if (mysqli_num_rows($result) == 0) {
            $insert = "INSERT INTO users (firstName, lastName, email, password)
                       VALUES ('$firstName', '$lastName', '$email', '')";
            mysqli_query($conn, $insert);
        }

        header("Location: homepage.php");
        exit();
    } else {
        echo "Error getting token.";
    }
} else {
    echo "No code provided.";
}
