<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=high_scores;charset=utf8mb4', '#####', '#####');

    $sql = 'SELECT `name`, `score`, `id` FROM `high_scores`.`high_scores` ORDER BY `score` DESC';
    $scores = $pdo->query($sql)->fetchAll();

    $sql = 'SELECT COUNT(*) FROM `high_scores`.`high_scores`';
	$score_count = $pdo->query($sql)->fetchColumn();

    if ($score_count != 0) {
        $min_score = $scores[$score_count - 1]['score'];
        $min_player_id = $scores[$score_count - 1]['id'];
    } else {
        $min_score = 0;
        $min_player_id = NULL;
    }
   
    $title = 'Cookies!';

    //header('location: invaders.php');

} catch (PDOException $e) {
    $title = 'An error has occurred';

    $output = 'Database error: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine();

    echo $output;
}

ob_start();
include  __DIR__ . '/templates/invaders.html.php';
$output = ob_get_clean();

include  __DIR__ . '/templates/layout.html.php';
