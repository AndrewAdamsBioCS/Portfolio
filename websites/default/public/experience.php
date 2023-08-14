<?php

$title = 'Andrew Adams';

ob_start();
include  __DIR__ . '/../templates/experience.html.php';
$output = ob_get_clean();

include  __DIR__ . '/../templates/layout.html.php';