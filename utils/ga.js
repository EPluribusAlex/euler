const GA = class {
	constructor({
		grid = [],
		population,
		crossover,
		mutation,
		generations
	}) {
		this.grid = grid;
		this.population = population;
		this.crossover = crossover;
		this.mutation = mutation;
		this.generations = generations;
	}

	evaluate(gene) {
		const grid = this.grid;
		
		const values = () => {
			const arr = [];
			gene.forEach(e => {
				for (const f of grid) {
					if (f[0] === e[0] && f[1] === e[1]) {
						arr.push(f[2]);
						break;
					}
				}
			});
			return arr;
		}

		return values();
	}

	generate() {
		const randomPoint = () => Math.floor(Math.random() * 20 + 1);

		const start = [randomPoint(), randomPoint()];

		// N, NE, E, SE, S, SW, W, NW
		let directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

		if (start[0] < 4) { // valid directions...
			if (start[1] < 4) { 
				directions = directions.slice(2, 5); // E, SE, S
			} else if (start[1] > 17) { 
				directions = directions.slice(4, 7); // S, SW, W
			} else { 
				directions = directions.slice(2, 7); // E, SE, S, SW, W
			} 
		} else if (start[0] > 17) {
				if (start[1] < 4) { 
					directions = directions.slice(0, 3); // N, NE, E
				} else if (start[1] > 17) { 
					directions = [...directions.slice(0, 1), ...directions.slice(6)]; // N, W, NW
				} else { 
					directions = [...directions.slice(0, 3), ...directions.slice(6)]; // N, NE, E, W, NW
				} 
			} else {
				if (start[1] < 4) { 
					directions = directions.slice(0, 5); // N, NE, E, SE, S
				} else if (start[1] > 17) { 
					directions = [...directions.slice(0, 1), ...directions.slice(4)]; // N, S, SW, W, NW
				} // "else" leave all
			}

		const change = directions[Math.floor(Math.random() * directions.length)];

		const gene = [start];

		for (let i = 0; i < 3; i++) {
			const nextRow = gene[i][0] + change[0];
			const nextCol = gene[i][1] + change[1]; 
			gene.push([nextRow, nextCol]);
		}

		// normalize ascending (priority: row)
		if (change[0] === -1) {
			gene.reverse();
		} else if (change[0] === 0 && change[1] === -1) {
			gene.reverse();
		}

		return gene;
	}

	populate() {
		const popArr = [];
		for (let i = 0; i < this.population; i++) {
			const gene = this.generate();
			const fitness = this.evaluate(gene);
			popArr.push({ gene, fitness });
		}
		return popArr;
	}
}

export default GA;