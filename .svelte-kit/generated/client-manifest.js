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
	() => import('./nodes/5')];

export const server_loads = [];

export const dictionary = {
	"/": [4],
	"/admin": [5,[2]],
	"/app/dashboard": [6,[3]],
	"/login": [7],
	"/register": [8],
	"/restaurants": [5]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};