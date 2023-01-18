export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9')];

export const server_loads = [];

export const dictionary = {
	"/": [4],
	"/admin": [5,[2]],
	"/login": [7],
	"/register": [8],
	"/restaurants": [9]
	"/account": [~5],
	"/admin": [6,[2]],
	"/app/dashboard": [7,[3]],
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};