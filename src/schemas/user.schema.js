import Joi from "joi";

export const id = Joi.string().guid({ version: ["uuidv4"] });
export const firstName = Joi.string();
export const lastName = Joi.string();
export const email = Joi.string().email();

export const getUserSchema = Joi.object({ id: id.required() });

export const createUserSchema = Joi.object({
	firstName: firstName.required(),
	lastName,
	email: email.required(),
});

export const updateUserSchema = Joi.object({
	firstName: firstName.required(),
	lastName,
	email: email.required(),
});

export const partiallyUpdateUserSchema = Joi.object({
	firstName,
	lastName,
	email,
}).xor("firstName", "lastName", "email");
