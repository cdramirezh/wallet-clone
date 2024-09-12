import Joi from "joi";
export { id as userId } from "./user.schema.js";

export const id = Joi.string().guid({ version: ["uuidv4"] });
export const name = Joi.string();
export const color = Joi.string()
	.pattern(/^[0-9A-F]{6}$/)
	.message("Invalid uppercase hex color code");
export const autoAssignToNewRecords = Joi.boolean();
export const archived = Joi.boolean();

export const getLabelSchema = Joi.object({ id: id.required() });

export const createLabelSchema = Joi.object({
	name: name.required(),
	color: color.required(),
	autoAssignToNewRecords: autoAssignToNewRecords.required(),
});

export const updateLabelSchema = Joi.object({
	name: name.required(),
	color: color.required(),
	autoAssignToNewRecords: autoAssignToNewRecords.required(),
	archived: archived.required(),
});

export const partiallyUpdateLabelSchema = Joi.object({
	name: name,
	color: color,
	autoAssignToNewRecords: autoAssignToNewRecords,
	archived: archived,
}).xor("name", "color", "autoAssignToNewRecords", "archived");
