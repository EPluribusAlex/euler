const GA = class {
	constructor({
		grid = [],
		population,
		crossRate,
		mutationRate,
		generations
	}) {
		this.grid = grid;
		this.population = population;
		this.crossRate = crossRate;
		this.mutationRate = mutationRate;
		this.generations = generations;
		this.members = [];
	}

	run() {
		for (let i = 0; i < this.population; i++) {
			const member = this.generate();
			this.members.push(member);
		}

		for (let i = 0; i < this.generations; i++) {
			const newMembers = [];

			const fittest = this.findFittest(this.members);

			newMembers.push(fittest);

			while (newMembers.length < this.population) {
				const
					parentA = this.parentSelector(),
					parentB = this.parentSelector(),
					crossover = Math.random() < this.crossRate ? true : false,
					mutateA = Math.random() < this.mutationRate ? true : false,
					mutateB = Math.random() < this.mutationRate ? true : false;

				let [ childA, childB ] = 
					crossover === true ? this.crossover(parentA.genes, parentB.genes)
					: [ parentA, parentB ];
				
				if (mutateA) { childA = this.mutate(childA.genes); }

				if (mutateB) { childB = this.mutate(childB.genes); }

				newMembers.push(childA);

				if (newMembers.length < this.population) {
					newMembers.push(childB);
				}
			}

			this.members = newMembers;
		}

		return this.findFittest(this.members);
	}

	generate(start = false, direction = false) {
		if (start === false) {
			const randomPoint = () => Math.floor(Math.random() * 20 + 1);

			start = [randomPoint(), randomPoint()];
		}

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

		if (direction === false || directions.includes(direction) === false) {
			direction = directions[Math.floor(Math.random() * directions.length)];
		}

		const genes = [start];

		for (let i = 0; i < 3; i++) {
			const nextRow = genes[i][0] + direction[0];
			const nextCol = genes[i][1] + direction[1]; 
			genes.push([nextRow, nextCol]);
		}

		// normalize ascending (priority: row)
		if (direction[0] === -1) {
			genes.reverse();
		} else if (direction[0] === 0 && direction[1] === -1) {
			genes.reverse();
		}

		// calculate fitness
		const { fitness, product } = this.evaluate(genes);

		return { genes, fitness, product };
	}

	evaluate(genes) {
		const grid = this.grid;

		let accumulator = 1;

		genes.forEach(e => {
			for (const f of grid) {
				if (f[0] === e[0] && f[1] === e[1]) {
					accumulator = accumulator * f[2];
					break;
				}
			}
		});
		
		const target = 96059601 // 99^4

		return { 
			fitness: Math.sqrt(accumulator / target),
			product: accumulator
		};
	}

	findFittest() {
		let tracker = 0;
		let member = {};

		this.members.forEach(e => {
			if (e.fitness > tracker) {
				tracker = e.fitness;
				member = e;
			}
		});

		return member;
	}

	parentSelector() {
		// selection weighted via "pie" method
		const pieArr = [];

		let max = 0;

		this.members.forEach(e => {
			pieArr.push(e.fitness + max);
			max += e.fitness;
		});

		const selector = Math.random() * max;

		for (let i = 0; i < this.members.length; i++) {
			if (selector <= pieArr[i]) {
				return this.members[i];
			}
		}
	}

	crossover(a, b) {
		// Pick any point beloning to either parent for each child (duplicates kept to increase their weight)
		const points = [...a, ...b];
		const startA = points[Math.floor(Math.random() * points.length)];
		const startB = points[Math.floor(Math.random() * points.length)];

		// for randomly rounding up or down
		const round = (val) => { 
			return Math.floor(Math.random() * 2) === 1 ? Math.ceil(val)
			: Math.floor(val);
		}

		// average parent directions
		const dirA = [a[1][0] - a[0][0], a[1][1] - a[0][1]];
		const dirB = [b[1][0] - b[0][0], b[1][1] - b[0][1]];
		const dirC = [round((dirA[0] + dirB[0]) / 2), round((dirA[1] + dirB[1]) / 2)];

		const childA = this.generate(startA, dirC);
		const childB = this.generate(startB, dirC);

		return [childA, childB];
	}

	mutate(genes) {
		const newGenes = this.generate().genes;
		const crossover = this.crossover(genes, newGenes);

		return crossover[0];
	}
}

export default GA;