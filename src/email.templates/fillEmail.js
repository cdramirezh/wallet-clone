import * as fs from "node:fs/promises";
import Handlebars from "handlebars";
import Boom from "@hapi/boom";

export const fillEmail = async (templateFile, data) => {
	const templatesPath = "src/email.templates";
	const template = await fs.readFile(`${templatesPath}/${templateFile}`, "utf8");
	if (!template) throw Boom.badImplementation(`Could not read ${templateFile}`);
	const compiledTemplate = Handlebars.compile(template);
	if (!compiledTemplate)
		throw Boom.badImplementation(`Could not compile ${templateFile}`);
	const emailHtml = compiledTemplate(data);
	if (!emailHtml)
		throw Boom.badImplementation(`Could not fill ${templateFile}`);
	return emailHtml;
};
