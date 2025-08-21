<?php
$host = "localhost";
$user = "root";      // your MySQL username
$pass = "Isum2003#";          // your MySQL password
$db   = "login_system";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
