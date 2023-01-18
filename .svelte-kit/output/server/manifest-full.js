export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/Good-Food-logo.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-bc6cdab3.js","imports":["_app/immutable/start-bc6cdab3.js","_app/immutable/chunks/index-3eda13d0.js","_app/immutable/chunks/singletons-26ce41b3.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/api/adresse",
				pattern: /^\/api\/adresse\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/adresse/_server.ts.js')
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/login/_server.ts.js')
			},
			{
				id: "/api/restaurant",
				pattern: /^\/api\/restaurant\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/restaurant/_server.ts.js')
			},
			{
				id: "/api/user",
				pattern: /^\/api\/user\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/user/_server.ts.js')
			},
			{
				id: "/app/dashboard",
				pattern: /^\/app\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/restaurants",
				pattern: /^\/restaurants\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
