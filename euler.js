import * as eulerdata from './eulerdata/index.js';
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

euler.functions['13'] = (digits = 10) => {
	const numbersLiteral = eulerdata.data13;
	const re = /\s/;
	const values = numbersLiteral.split(re).filter(e => e); //100 numbers, 50 digits each

	values.forEach((e, i, a) => {
		a[i] = e.split('');
	});

	let sum = 0;
	
	for (let i = 0; i <= digits; i++) {
		const place = 10 ** (digits - (i + 3));
		values.forEach(e => {
			sum += e[i] * place;
		});
	}

	return sum;
}

euler.functions['12'] = (exceedFactors = 500) => {
	const findTriangle = num => {
		let accumulator = 0;
		for (let i = 1; i <= num; i++) {
			accumulator += i;
		}
		return accumulator;
	}

	const findFactors = num => {
		const factorsA = [];
		const factorsB = [];
		for (let i = 1; i <= Math.sqrt(num); i++) {
			if (num % i === 0) { 
				factorsA.push(i);
				factorsB.push(num / i); 
			}
		}
		return [...new Set([...factorsA, ...factorsB])];
	}

	for (let i = 1;; i++) {
		const triangle = findTriangle(i);

		if (triangle < exceedFactors) { continue; }

		const factors = findFactors(triangle);

		if (factors.length > exceedFactors) {
			return triangle;
		}
	}
}

euler.functions['11'] = () => {
	const gridLiteral = eulerdata.data11;
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
		crossRate: 0.5,
		mutationRate: 0.05,
		generations: 100
	});

	return ga11.run();
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
	const number = eulerdata.data8;

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