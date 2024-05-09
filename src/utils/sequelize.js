import { Sequelize } from "sequelize";
import dbUrl from "./dbUrl.js";

export const sequelize = new Sequelize(dbUrl);
