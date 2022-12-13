/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 *     the dictionary present inside of the Boggle board.
 * @param {Array.<string[]>} grid The Boggle game board.
 * @param {string[]} dictionary The list of available words.
 * @return {string[]} solutions Possible solutions to the Boggle board.
 */
exports.findAllSolutions = function(grid, dictionary) {
	let solutions = [];

	if (dictionary.length == 0) return solutions;
	if (grid.length < 2) return solutions;

	console.table(grid);
	console.log(dictionary);

	grid = grid.map((subGrid) => subGrid.map((letter) => letter.toLowerCase()));

	console.table(grid);
	console.log(dictionary);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			const visited = new Array(grid.length).fill(false).map(() => {
				return new Array(grid.length).fill(false);
			});
			const word = [];
			// console.log(`[] {${i+1} ${j+1}} Starting Position`)
			findWords(word, grid, dictionary, i, j, visited, solutions);
		}
	}

	solutions = Array.from(new Set(solutions));
	console.log(solutions);
	return solutions;
};

/**
 * Given a Boggle board, a dictionary, a ord, indices, visited locations,
 *     and current solutions, find the rest of words.
 * @param {string} word A word.
 * @param {Array.<string[]>} grid The Boggle game board.
 * @param {string[]} dictionary The list of available words.
 * @param {number} i x position index.
 * @param {number} j y position index.
 * @param {Array.<boolean[]>} visited Visited location grid.
 * @param {string[]} solutions Current solutions.
 * @return {void}
 */
function findWords(word, grid, dictionary, i, j, visited, solutions) {
	const lookupIndices = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
		[1, 0],
		[1, -1],
		[0, -1],
	];

	if (i < 0 || i >= grid.length || j < 0 || j >= grid.length) {
		// console.log(`[${word}] {${i} ${j}} Out of Bounds`)
		return;
	}

	if (visited[i][j] == true) {
		// console.log(`[${word}] {${i} ${j}} Already Visited ${grid[i][j]}`)
		return;
	}

	word += grid[i][j];
	// console.log(`[${word}] {${i} ${j}} Current Guess`)

	if (isPrefix(dictionary, word)) {
		visited[i][j] = true;
		console.log(`[${word}] {${i} ${j}} Prefix Found`);

		if (isWord(dictionary, word)) {
			console.log(`[${word}] {${i} ${j}} Word Found`);
			solutions.push(word);
		}

		// console.log(`[${word}] {${i} ${j}} Starting Recurvise Search`)
		for (let x = 0; x < lookupIndices.length; x++) {
			const deltaX = lookupIndices[x][0];
			const deltaY = lookupIndices[x][1];
			findWords(word, grid, dictionary, i + deltaX, j + deltaY,
				visited, solutions);
		}
	}


	visited[i][j] = false;
}

/**
 * Given a word and a dictionary, returns true if any word in the
 *     dictionary starts with the word given.
 * @param {string[]} dictionary The list of available words.
 * @param {string} word A word.
 * @return {bool} isWord boolean determining if any word in the dictionary
 *     starts with the word given.
 */
function isPrefix(dictionary, word) {
	for (const dictionaryWord of dictionary) {
		if (dictionaryWord.substr(0, word.length).toLowerCase() ==
      word.toLowerCase()) {
			return true;
		}
	}
	return false;
}

/**
 * Given a word and a dictionary, returns true if the word is in the dictionary
 * @param {string[]} dictionary The list of available words.
 * @param {string} word A word.
 * @return {bool} isWord boolean determining if the word is in the dictionary.
 */
function isWord(dictionary, word) {
	for (const dictionaryWord of dictionary) {
		if (dictionaryWord.toLowerCase() == word.toLowerCase() &&
      word.length >= 3) {
			return true;
		}
	}
	return false;
}

const grid = [["T", "W", "Y", "R"],
	["E", "N", "P", "H"],
	["G", "Z", "Qu", "R"],
	["St", "N", "T", "A"]];
const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
	"pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
	"ten", "went", "wet", "arty", "egg", "not", "quar"];

console.log(exports.findAllSolutions(grid, dictionary));



var grid2 = [["t", "w", "y", "r"],
	["e", "n", "p", "h"],
	["g", "z", "qu", "r"],
	["o", "n", "t", "a"]];
var dictionary2 = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
	"pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
	"ten", "went", "wet", "arty", "egg", "not", "quar"];


console.log(exports.findAllSolutions(grid2, dictionary2));

