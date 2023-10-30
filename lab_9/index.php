<!DOCTYPE html>
<html lang="en">
<style>
    table, th, td {
        border: 1px solid black;
    }
</style>
<head>
    <title>COSC 4351 - Lab 9</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="body">
<header class="header">
    <h1>Search by the top 50 songs on Spotify</h1>
</header>
<form method="get">
    <label>
        <input type="text" name="to_search">
    </label>
    <!--input type="button" value="click"-->
    <button type='button'>submit</button>
</form>
<?php
$topSongs = fopen("./universal_top_spotify_songs.csv", "r");
if ($topSongs && isset($_GET["to_search"])) {
    echo "<table>";
    foreach (explode(",", fgets($topSongs)) as $title) {
        echo "<th>" . $title . "</th>";
    }
    while ($currentLine = fgets($topSongs)) {
        if (str_contains(strtolower($currentLine), strtolower($_GET["to_search"]))) {
            echo "<tr>";
            foreach (explode(",", $currentLine) as $element) {
                echo "<td>" . $element . "</td>";
            }
        }
    }
    echo "</table>";
}
?>
</body>
<footer>
    <p>Designed and built by <i>Christian Wade</i>, <i>Weston Sublett</i>, and <i>Hayden Rawlings</i></p>
</footer>
</html>
