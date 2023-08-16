<head>
<script defer src="https://pyscript.net/latest/pyscript.js"></script>
</head>

<py-config>
	[[fetch]]
	files = ["./algPuzzleSolverPy.py"]
</py-config>

<div id="puzzle-solver">
<div id="newPuzzArr"></div>

<py-script>
	from algPuzzleSolverPy import *
	
	def new_puzzle():
		global thisPuzz
		thisPuzz = scramble(create_puzzle(4,4))
		Element("newPuzzArr").write(thisPuzz)

	def solve(alg):
		print(thisPuzz)
		if alg == "DFS":
			solved = depth_first(thisPuzz)
		elif alg == "BFS":
			solved = breadth_first(thisPuzz)
		elif alg == "A-star":
			solved = a_star(thisPuzz)
		print(solved)

</py-script>

<canvas id="play-puzz" width="200" height="200"></canvas><br>

<button onclick="newPuzzle()">New Puzzle</button><br>
<button onclick="algSolver('DFS')">Solve with Depth-First Search</button><br>
<button onclick="algSolver('BFS')">Solve with Breadth-First Search</button><br>
<button onclick="algSolver('A-star')">Solve with A* Search</button><br>

<script src="/puzzleSolver.js?random=<?= uniqid() ?>"></script>
<script>
	function newPuzzle(){
		pyscript.interpreter.globals.get('new_puzzle')();
		newPuzz();
	}

	function algSolver(alg) {
		pyscript.interpreter.globals.get('solve')(alg);
	}
</script>


</div>