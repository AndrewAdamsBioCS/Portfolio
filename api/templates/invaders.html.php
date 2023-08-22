

	<div id="game-div">
		<div id="play-div">
			<div id="end-game-div">
				<div id="high-score-input" style="visibility:hidden;position:absolute;">
					<p class="info-header">High Score!</p>

					<form id="playerInput" action="updateDb.php" method="post">
						<label for="firstname">Name</label>
						<input type="text" name="player_name" id="player_name" maxlength="10">
						<input type="hidden" name="player_score" id="player_score" value="">
						<input type="hidden" name="score_count" id="score_count" value="<?=$score_count?>">
						<input type="hidden" name="min_player_id" id="min_player_id" value="<?=$min_player_id?>">
						<input type="submit" value="GO">
					</form>
				</div>

				<div id="game-over-display" style="visibility:hidden;position:absolute;width:100%;">
				<p class="info-header">GAME OVER!</p>
				<p style="text-align:center;padding:10px;">Play Again? [Y]</p>
				</div>
			</div>
		
			<canvas id="playCanv" width="400" height="400"></canvas>
		</div>
		<div id="info-div">

			<div id="stats-div">
				<p id="level" class="info-header"></p>
				<div id="stat-labels">
					<p>Score:</p>
					<p>Cookies:</p>
				</div>
				<div id="stat-values">
					<p id="score"></p>
					<p id="bullets"></p>
				</div>
			</div>
			<div id="anim-div">
				<canvas id="addBulletCanv"></canvas>
			</div>
			<div id="oven-div">
				<canvas id="bulletGenCanv" class="center"></canvas>

			</div>
		</div>
		
		<div id="high-scores-div" data-scoreCount="<?=$score_count?>" data-minScore="<?=$min_score?>" data-minPlayer="<?=$min_player_id?>">
			
			<div id="high-scores-list">

				<p class="info-header">HIGH SCORES</p>
				
				<div id="high-score-ranks">
					<?php for ($i = 1; $i <= 5; $i++) {
						echo "<p>" . $i . ".</p>";
					} ?>
				</div>

				<div id="high-score-names">
					<?php foreach ($scores as $score): ?>
						<p>
							<?=htmlspecialchars($score['name'], ENT_QUOTES, 'UTF-8')?>

						</p>
					<?php endforeach; ?>
				</div>

				<div id="high-score-scores">
					<?php foreach ($scores as $score): ?>
						<p>
							<?=htmlspecialchars($score['score'], ENT_QUOTES, 'UTF-8')?>
						</p>
					<?php endforeach; ?>
				</div>
			
				<div style="margin-top: 65%; padding-left:5px;">
					<form id="playerInput" action="updateDb.php" method="post">
						<input type="submit" name="scores-reset" value="Reset scores">
					</form>						
				</div>				
			</div>

			<div id="instructions-div">
			<p>Hit the monsters with cookies to make them go away.</p><br>
			<p>Your oven bakes 5 new cookies every 5 seconds.</p><br><br><hr><br>
			<p>Move player: Arrow keys</p>
			<p>Fire cookie: Space bar</p>
			</div>

			<script src="/scripts/invaders.js?random=<?= uniqid() ?>"></script>
		</div> <!--end high-scores-div-->	
	</div> <!--end game-div-->

	<div id="commentary-div">
	<p>Gameplay logic and graphics: JavaScript</p><br>
	<p>Game display: HTML, CSS, PHP</p><br>
	<p>"High Score" records maintained in MySQL database</p>
	<p style="font-size:small;">&emsp;&emsp;&#x2022 Use "Reset Scores" button, if needed, to test database functionality</p>
	</div>



