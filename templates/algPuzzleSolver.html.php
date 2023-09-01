<head>
<script defer src="https://pyscript.net/latest/pyscript.js"></script>
</head>

<py-config>
	[[fetch]]
	files = ["./algPuzzleSolverScript.py"]
</py-config>

<py-script>
	from algPuzzleSolverScript import *
	
	def new_puzzle():
		global thisPuzz
		thisPuzz = scramble(create_puzzle(4,4))
		Element("newPuzzArr").write(thisPuzz)

	def solve(alg):
		if alg == "DFS":
			solved = depth_first(thisPuzz)
		elif alg == "BFS":
			solved = breadth_first(thisPuzz)
		elif alg == "A-star":
			solved = a_star(thisPuzz)

		Element("solvedPuzzArr").write(solved)

	# Create initial puzzle
	new_puzzle()
	#Element("puzzDesc").write("Turn off all the lights!")
</py-script>

<!-- hidden divs for javascript access to py-script results -->
<div hidden id="newPuzzArr"></div>
<div hidden id="solvedPuzzArr"></div>

<div id="puzzle-solver">
<div id="puzzle-left-div">
<div id="playPuzzDiv">
	<div id="puzzDesc" style="margin-bottom:10px;">Loading puzzle...</div>
	<div id="puzzLoaded" style="min-width: 100%; display:none;">
		<div id="puzzDiv">
			<canvas id="play-puzz" width="200" height="200" style="float:left; margin-bottom:15px;"></canvas>

			<button onclick="newPuzzle()" style="margin-right:15px;">New Puzzle</button>
			<button onclick="resetPuzzle()">Reset Puzzle</button>
		</div>

		<div id="algBtns" style="display:inline-block; width:50%; float:left; padding-left: 15px;">
			<button onclick="algSolver('DFS')">Solve</button>: Depth-First Search<br>
			<button onclick="algSolver('BFS')">Solve</button>: Breadth-First Search<br>
			<button onclick="algSolver('A-star')">Solve</button>: A* Search<br>
		</div>
	</div>
</div> <!-- End playPuzzDiv -->

<div id="projectDesc" style="display:none; width:90%; float:left; margin:20px; padding:5px; border:1px red solid;">Adapted from an academic project for <i>CMPT 310: Artificial Intelligence Survey</i>, taken Fall 2017 at Simon Fraser University (Instructor: Dr. Maxwell Libbrecht). The original project was a Python script using DFS, BFS, and A* algorithms to solve 100 randomly generated puzzles, reporting total moves, search steps, and completion time for each algorithm. Click <a href="algPuzzleSolverProject.py" target="_blank">here</a> to download the original Python script, adapted for this page using PyScript and JavaScript.</div>
</div> <!-- End puzzle-left-div -->

<div id="solutionDiv"></div>
</div> <!-- End puzzle-solver div -->

<script src="/scripts/puzzleSolver.js?random=<?= uniqid() ?>"></script>
<script>
	// Create initial puzzle
	let initLoop = setInterval(initPuzzle, 1000);
	function initPuzzle() {
		if(document.getElementById("newPuzzArr").innerHTML != ""){
			clearInterval(initLoop);
			newPuzz();

			description = "<i>Turn off all the lights!</i><br>Click a cell to toggle it and its neighbors (above/below, right/left). When toggled, lit (white) cells go dark, and unlit (black) cells light up. The puzzle is solved when all lights are out. Try it yourself, and then test out the solutions found by the different search algorithms.<br><br><hr><br>";
			document.getElementById("puzzDesc").innerHTML = description;
			document.getElementById("puzzLoaded").style.display = "block";
			document.getElementById("projectDesc").style.display = "block";
		}
	}

	function newPuzzle(){
		pyscript.interpreter.globals.get('new_puzzle')();
		document.getElementById("solutionDiv").style.display = "none";
		newPuzz();
	}

	function algSolver(alg) {
		pyscript.interpreter.globals.get('solve')(alg);
		document.getElementById("solutionDiv").style.display = "block";
		showSolution(alg);
	}
</script>