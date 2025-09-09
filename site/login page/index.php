<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UOC Football - Team Portal Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">

        <div class="home-button">
            <a href="../landing page/main_index.html#header" id="homeBtn">Home</a>
        </div>

        <div class="login-container">
            <div class="logo-section">
                <img src="images/Logo.png" alt="UOC Football Logo" class="logo">
                <h1 class="title">Team Portal</h1>
                <p class="subtitle">login</p>
            </div>

            <?php
            if (isset($_SESSION['error'])) {
                echo "<p style='color:red; text-align:center; margin-bottom:16px;'>"
                     . htmlspecialchars($_SESSION['error']) .
                     "</p>";
                unset($_SESSION['error']);
            }
            ?>

            <form class="login-form" id="loginForm" action="login.php" method="POST">
                <div class="input-group">
                    <input type="text" id="indexNumber" name="indexNumber" placeholder="Index number" required>
                </div>

                <div class="input-group">
                    <input type="password" id="password" name="password" placeholder="Password" required>
                </div>

                <div class="forgot-password">
                    <a href="#" id="forgotPasswordLink">Forgot password?</a>
                </div>

                <button type="submit" class="login-btn">Login</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
