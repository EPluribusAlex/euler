import inquirer from 'inquirer';
import figlet from 'figlet';
import json from './package.json' assert { type: 'json' };
import euler from './euler.js';

const problems = euler.problems;

console.log(figlet.textSync(json.name));

async function run() {
	const prompt = await inquirer.prompt({
		type: 'input',
		name: 'problem',
		get message() {
			return `Please enter the number for the problem you would like to test. There are currently solution functions for ${problems.length} problems available.    `;
		}
	});

	console.clear();
	console.log(figlet.textSync(json.name));
	console.log('Working...');

	const input = prompt.problem.split(', ');
	const method = euler.functions[input[0]];
	const args = input.slice(1);

	console.time();
	const answer = method(...args);
	console.timeEnd();
	console.log('Answer: ', answer);

	run()
}

run();