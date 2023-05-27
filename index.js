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

	const method = euler.functions[prompt.problem.toString()];

	console.clear();
	console.log(figlet.textSync(json.name));
	console.log('Working...');
	console.time();
	const answer = method();
	console.timeEnd();
	console.log(answer);

	run()
}

run();