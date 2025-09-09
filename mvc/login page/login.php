<?php
session_start();
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $indexNumber = $_POST["indexNumber"];  // matches your HTML input name
    $password    = $_POST["password"];

    // Prepare and execute query
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=MD5(?)");
    $stmt->bind_param("ss", $indexNumber, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $_SESSION["username"] = $indexNumber;
        header("Location: welcome.php");
        exit();
    } else {
        $_SESSION['error'] = "Invalid index number or password";
        header("Location: index.php");
        exit();
    }
}
?>
