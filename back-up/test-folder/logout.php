<?php
session_start();
session_destroy();

// Redirect to Auth0 logout
$auth0_domain = "dev-j3u0k30o4e238kfc.us.auth0.com";
$client_id = "qFQnEBGcLWmNd2v0XdE04yAefGJO1zO7";
$return_to = "https://study-buddy.infinityfree.me";

header("Location: https://$auth0_domain/v2/logout?client_id=$client_id&returnTo=" . urlencode($return_to));
exit();
?>
