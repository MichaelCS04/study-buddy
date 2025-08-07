<?php

$host = "sql311.infinityfree.com";
$user = "if0_39641930";
$pass = "vtqJ9smFacJE5N"; 
$db   = "if0_39641930_study_buddy_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Failed to connect DB: " . $conn->connect_error);
}
?>
