export const grantsObject = {
	admin: {
		user: {
			"create:any": ["*"],
			"read:any": ["*"],
			"update:any": ["*"],
			"delete:any": ["*"],
		},
		label: {
			"create:any": ["*"],
			"read:any": ["*"],
			"update:any": ["*"],
			"delete:any": ["*"],
		},
	},
	user: {
		label: {
			"create:own": ["*"],
			"read:own": ["*"],
			"update:own": ["*"],
			"delete:own": ["*"],
		},
	},
};

// grant list fetched from DB (to be converted to a valid grants object, internally)
export const grantList = [
	{
		role: "admin",
		resource: "video",
		action: "create:any",
		attributes: "*, !views",
	},
	{ role: "admin", resource: "video", action: "read:any", attributes: "*" },
	{
		role: "admin",
		resource: "video",
		action: "update:any",
		attributes: "*, !views",
	},
	{ role: "admin", resource: "video", action: "delete:any", attributes: "*" },

	{
		role: "user",
		resource: "video",
		action: "create:own",
		attributes: "*, !rating, !views",
	},
	{ role: "user", resource: "video", action: "read:any", attributes: "*" },
	{
		role: "user",
		resource: "video",
		action: "update:own",
		attributes: "*, !rating, !views",
	},
	{ role: "user", resource: "video", action: "delete:own", attributes: "*" },
];
