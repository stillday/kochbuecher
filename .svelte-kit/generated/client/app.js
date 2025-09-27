export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')
];

export const server_loads = [2];

export const dictionary = {
		"/": [3],
		"/(protected)/cookbooks": [~4,[2]],
		"/(protected)/cookbooks/new": [~5,[2]],
		"/(protected)/cookbooks/[id]": [~6,[2]],
		"/forgot-password": [10],
		"/login": [11],
		"/(protected)/recipes/new": [~7,[2]],
		"/(protected)/recipes/[id]": [~8,[2]],
		"/register": [12],
		"/(protected)/shared-with-me": [~9,[2]],
		"/update-password": [13]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';