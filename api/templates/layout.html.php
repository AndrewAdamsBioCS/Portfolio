<!doctype html>
<html>
    <head>
    <meta charset="utf-8">

    <title><?=$title?></title>

    <link rel="stylesheet" type="text/css" href="css/homeStyle.css?random=<?= uniqid() ?>">
    <link rel="stylesheet" type="text/css" href="css/gameStyle.css?random=<?= uniqid() ?>">
	
    </head>
 
<body>

<header>
	<?php
		$binary = "";
		$dna = "";
		$dna_map = ["A", "C", "G", "T"];

		for ($i = 0; $i < 75; $i++) {
			$binary .= rand(0,1);
			$dna .= $dna_map[rand(0,3)];
		}
	?>

	<div class="header-title-bar-side" style="left: calc(1em + 5px);"><?=$binary?></div>
	<h1>A n d r e w &nbsp&nbsp&nbsp A d a m s</h1>
	<div class="header-title-bar-side" style="right: calc(1em + 5px);"><?=$dna?></div>


	<nav class="header-menu">
	<a class="header-nav-link" id="about" href="about.php">About</a> &#x2022; 
	<a class="header-nav-link" id="experience" href="experience.php">Experience</a> &#x2022; 
	<a class="header-nav-link" id="projects" href="projects.php">Projects</a> &#x2022; 
	<a class="header-nav-link" id="contact" href="contact.php">Contact</a>
	</nav>
	
</header>

<main>
<script type="text/javascript" src="/scripts/nav.js"></script>
<?=$output?>
</main>

</body>
</html>