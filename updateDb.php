<?php

header('Location: invaders.php');

try {
	$pdo = new PDO('mysql:host=localhost;dbname=high_scores;charset=utf8mb4', 'update', 'newscore');
} catch (PDOException $e) {
	$title = 'An error has occurred';

	$output = 'Database error: ' . $e->getMessage() . ' in ' .
	$e->getFile() . ':' . $e->getLine();

	echo $output;
}

// If "scores-reset" button is pushed, delete all scores from table
if (isset($_POST['scores-reset'])) {
	$sql = 'DELETE FROM `high_scores`.`high_scores`';
	$pdo->query($sql);
}
// Add new high score record to table
else {
	// Handle blank name input
	if ($_POST['player_name'] != "") {
		$name = $_POST['player_name'];
	} else {
		$name = 'Unknown';
	}
	
	$score = $_POST['player_score'];
	$score_count = $_POST['score_count'];
	$min_player_id = $_POST['min_player_id'];

	if ($score_count >= 5) {
		$sql = 'DELETE FROM `high_scores`.`high_scores` WHERE
		`id` = :playerID';

		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':playerID', $min_player_id);
		$stmt->execute();
	}

	$sql = 'INSERT INTO `high_scores`.`high_scores` SET
		`name` = :playerName,
		`score` = :playerScore';

	$stmt = $pdo->prepare($sql);
	$stmt->bindValue(':playerName', $name);
	$stmt->bindValue(':playerScore', $score);
	$stmt->execute();
}





