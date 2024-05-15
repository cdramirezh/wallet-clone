import { Sequelize } from "sequelize";
import dbUrl from "./dbUrl.js";
import { setUpModels } from "../../models/index.js";

const sequelize = new Sequelize(dbUrl);

await setUpModels(sequelize);

export { sequelize };
