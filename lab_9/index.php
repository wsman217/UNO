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
        <?php
        $topSongs = fopen("./universal_top_spotify_songs.csv", "r");
        foreach (explode(",", fgets($topSongs)) as $title) {
            echo "<input type='text' placeholder='$title' name='$title'>";
        }
        ?>
    </label>
    <button type='submit'>submit</button>
</form>
<?php
$topSongs = fopen("./universal_top_spotify_songs.csv", "r");
if ($topSongs && isset($_GET)) {
    echo "<table>";
    foreach (explode(",", fgets($topSongs)) as $title) {
        echo "<th>" . $title . "</th>";
    }
    while ($currentLine = fgets($topSongs)) {
        $containsAll = True;
        $notEmpty = False;
        $seperatedLine = explode(",", $currentLine);
        $counter = 0;

        foreach ($_GET as $titleName) {
            if ($titleName !== "") {
                $notEmpty = True;
            }

            if ($titleName !== "" && !str_contains(strtolower($seperatedLine[$counter]), strtolower($titleName))) {
                $containsAll = False;
            }

            $counter++;
        }
        
        if ($containsAll) {
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
