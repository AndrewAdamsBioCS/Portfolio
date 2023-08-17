<head>
<script defer src="https://pyscript.net/latest/pyscript.js"></script>
</head>

<py-config>
	[[fetch]]
	files = ["./algPuzzleSolver.py"]
</py-config>

<div id="puzzle-solver">
<div id="playPuzzDiv" style="width:50%; float:left; border:1px white dashed;">
	<!-- hidden divs for javascript access to py-script results -->
	<div hidden id="newPuzzArr"></div>
	<div hidden id="solvedPuzzArr"></div>
	<div hidden id="solvedStats"></div>

	<py-script>
		from algPuzzleSolver import *
	
		def new_puzzle():
			global thisPuzz
			thisPuzz = scramble(create_puzzle(4,4))
			Element("newPuzzArr").write(thisPuzz)

		def solve(alg):
			solvedStats = []

			if alg == "DFS":
				solved = depth_first(thisPuzz)
			elif alg == "BFS":
				solved = breadth_first(thisPuzz)
			elif alg == "A-star":
				solved = a_star(thisPuzz)

			#solvedStats.append(solved.pop(-1))
			#solvedStats.append(solved.pop(-1))

			Element("solvedPuzzArr").write(solved)
			#Element("solvedStats").write(solvedStats)

	</py-script>

	<canvas id="play-puzz" width="200" height="200"></canvas><br>

	<button onclick="newPuzzle()">New Puzzle</button><br>
	<div id="alg-btns" style="display: none;">
		<button onclick="algSolver('DFS')">Solve with Depth-First Search</button><br>
		<button onclick="algSolver('BFS')">Solve with Breadth-First Search</button><br>
		<button onclick="algSolver('A-star')">Solve with A* Search</button><br>
	</div>

	<script src="/puzzleSolver.js?random=<?= uniqid() ?>"></script>
	<script>
		function newPuzzle(){
			pyscript.interpreter.globals.get('new_puzzle')();
			solveBtns = document.getElementById("alg-btns");
			solveBtns.style.display = "block";
			newPuzz();
		}

		function algSolver(alg) {
			pyscript.interpreter.globals.get('solve')(alg);
			showSolution();
		}
	</script>

</div> <!-- End playPuzzDiv -->

<div id="solutionDiv" style="width:50%; height:100%; float:left;border:1px white dashed; overflow-y: scroll;">
</div>
</div>