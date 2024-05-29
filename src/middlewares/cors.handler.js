import cors from "cors";

const whitelist = [
	"http://localhost:8080",
	"https://my-wallet-clone.com",
	"https://my-other-app.com",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("CORS no te deja"));
		}
	},
};

export const setUpCors = cors(corsOptions);
