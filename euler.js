import GA from './utils/ga.js';

const euler = {
	functions: {},
	get problems() {
		const arr = [];
		for (const prop in this.functions) {
			if (Object.hasOwn(this.functions, prop)) {
				arr.push(prop);
			}
		}
		return arr;
	}
};

// Add Problems Below 

euler.functions['11'] = () => {
	const gridLiteral = `
		08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
		49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
		81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
		52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
		22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
		24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
		32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
		67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
		24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
		21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
		78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
		16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
		86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
		19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
		04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
		88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
		04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
		20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
		20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
		01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48
	`;

	const re = /\s/;
	const grid = gridLiteral.split(re).filter(e => e);

	grid.forEach((e, i, a) => {
		const row = Math.ceil((i + 1) / 20);
		const col = ((i + 1) - (20 * (Math.ceil((i + 1) / 20) - 1)));
		a[i] = [row, col, parseInt(e)];
	});

	const ga11 = new GA({
		grid,
		population: 100,
		crossover: 0.7,
		mutation: 0.05,
		generations: 100
	});

	return ga11.evaluate([[11, 14], [11, 15], [11, 16], [11, 17]]);
}

euler.functions['10'] = () => {
	const primes = [2, 3];

	nextVal: for (let i = 5; i < 2000000; i += 2) {
		for (let j = 1; j < primes.length; j++) {
			if (primes[j] > Math.floor(Math.sqrt(i))) {
				break;
			} else if (i % primes[j] === 0) {
				continue nextVal;
			}
		}

		primes.push(i);
	}

	return primes.reduce((a, b) => 
		a + b, 
		0,
	);
}

euler.functions['9'] = () => {
	const resultsPool = [];

	for (let i = 0; i < 333; i++) {
		for (let j = i + 1; j < 500; j++) {
			for (let k = j + 1; k < 1000; k++) {
				if ((i + j + k) === 1000) {
					resultsPool.push([i, j, k]);
				}
			}
		}
	}

	let product;

	resultsPool.every(e => {
		if (e[0] ** 2 + e[1] ** 2 === e[2] ** 2) {
			product = e[0] * e[1] * e[2];
			return false;
		}
		return true;
	});

	return product;
}

euler.functions['8'] = () => {
	const number = '7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450';

	const numArr = number.split('');

	numArr.forEach((e, i, a) => {
		a[i] = parseInt(e);
	});

	let highestProduct = 0;

	for (let i = 0; i < numArr.length - 12; ) {
		const sequence = numArr.slice(i, i + 13);
		const zeroIndex = sequence.findLastIndex(e => { return e === 0; });
		if (zeroIndex === -1) {
			const product = sequence.reduce((a, b) => { return a * b; });
			if (product > highestProduct) { highestProduct = product }
			i++;
		} else {
			i += (zeroIndex + 1);
		}
	}

	return highestProduct;
}

euler.functions['7'] = () => {
	function findPrime(number) {
		const primes = [2, 3];

		nextPrime: for (let i = 2; i < number; i++) {
			checkNextNum: for (let j = primes[i - 1] + 2;; j += 2) {
				for (let k = 1; k < primes.length; k++) {
					if (primes[k] > Math.floor(Math.sqrt(j))) {
						break;
					} else if (j % primes[k] === 0) {
						continue checkNextNum;
					}
				}

				primes.push(j);
				continue nextPrime;
			}
		}

		return primes[primes.length - 1];
	}

	return findPrime(10001);
}

euler.functions['6'] = () => {
	const difference = () => {
		let squareSum = 0;
		let sumSquares = 0;
		for (let i = 1; i <= 100; i++) {
			squareSum += i;
			sumSquares += (i ** 2);
		}
		squareSum = squareSum ** 2;
		return squareSum - sumSquares;
	}

	return difference();
}

euler.functions['5'] = () => {
	const initialProduct = 20 * 19;
	const maxProduct = 20 * 19 * 18 * 17 * 16 * 15 * 14 * 13 * 12 * 11;

	const answer = () => {
		for (let i = initialProduct; i <= maxProduct; i += 20) {
			for (let j = 19; j >= 11; j--) {
				if (i % j !== 0) { break; }
					else if (j === 11) {
						return i;
					}
			}
		}
		return null;
	}

	return answer();
}

euler.functions['4'] = () => {
	function checkIfPalindrome(a) {
		const arr = a.toString().split('');
		const revArr = [];
		for (let i = arr.length - 1; i >= 0; i--) {
			revArr.push(arr[i]);
		}
		return a === parseInt(revArr.join(''));
	}

	const largestProduct = (maxProduct) => {
		const minProduct = 100 ** 2;
		for (let i = maxProduct; i >= minProduct; i--) {
			if (checkIfPalindrome(i) === true) {
				return i;
			}
		}
	}

	const factors = (a) => {
		for (let i = 999; i >= 100; i--) {
			if (a % i === 0 && a / i <= 999 && a / i >= 100) {
				return [a, i, a / i];
			}
		}
		return null;
	}

	const answer = () => {
		let value = 999 ** 2;
		const product = () => { return largestProduct(value); }

		while (factors(product()) === null) {
			value = product() - 1;
		}

		return factors(product());
	}

	return answer();
}

euler.functions['3'] = () => {
	let num = 600851475143;

	const primeFactors = [];

	for (let i = 3;;) {
		if (num === 1) {
			break;
		}

		if (num % i === 0) {
			primeFactors.push(i);
			num = num / i;
		} else {
			i += 2;
		}
	}

	const largest = primeFactors.pop();

	return largest;
}

euler.functions['2'] = () => {
	let 
		last = 0, 
		count = 1,
		sum = 0;

	for (let i = 1; i <= 4000000; ) {
		if (count === 3) {
			count = 1;
			sum += i;
		} else {
			count++;
		}

		const next = i + last;
		last = i;
		i = next;
	}

	return sum;
}

euler.functions['1'] = () => {
	let sum = 0;

	for (let i = 0; i < 1000; i++) {
		if (i % 3 === 0 || i % 5 === 0) {
			sum += i;
		}
	}

	return sum;
}

export default euler;