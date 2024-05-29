import helmet from "helmet";

const helmetOptions = {
	// contentSecurityPolicy: {
	// 	directives: {
	// 		"script-src": ["'self'", "example.com"],
	// 		"style-src": null,
	// 	},
	// },
	// crossOriginResourcePolicy: { policy: "same-site" },
	// crossOriginEmbedderPolicy: { policy: "credentialless" },
};

export const setUpHelmet = helmet(helmetOptions);
