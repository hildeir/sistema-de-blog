<?php
session_start();
$_SESSION["email"] = "";

header("Location: login_blogueiro.html");