<?php
session_start();
include "../../model/login page/db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $indexNumber = $_POST["indexNumber"];
    $password = $_POST["password"];

    // Check credentials
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=MD5(?)");
    $stmt->bind_param("ss", $indexNumber, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $_SESSION["username"] = $indexNumber;
        header("Location: ../../view/login page/welcome.php");
        exit();
    } else {
        $_SESSION['error'] = "Invalid index number or password";
        header("Location: ../../view/login page/index.php");
        exit();
    }
}
?>
