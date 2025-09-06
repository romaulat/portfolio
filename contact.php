<?php
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

if (!$name || !$email || !$subject || !$message) {
    header("Location: index.php?status=" . urlencode("Please fill in all fields."));
    exit();
}

if (!$email) {
    header("Location: index.php?status=" . urlencode("Invalid email address."));
    exit();
}

require "vendor/autoload.php";
require "config.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->Username = 'romaub2017@gmail.com'; // Use the constant from config.php
$mail->Password = 'smii slxr tphl zdws'; // Use the constant from config.php

$mail->CharSet = 'UTF-8';

$mail->setFrom($email, $name);
$mail->addAddress("romaub2017@gmail.com", "Roma");
$mail->Subject = $subject;
$mail->Body = htmlspecialchars($message); // Escape user input in the email body

$messageStatus = '';

try {
    $mail->send();
    $messageStatus = 'Message Sent!';
} catch (Exception $e) {
    // Log the error instead of exposing the error message to the user
    error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    $messageStatus = "Message could not be sent. Please try again later.";
}

// Redirect back to index.php with the message status as a query parameter
header("Location: index.php?status=" . urlencode($messageStatus));
exit();
?>
