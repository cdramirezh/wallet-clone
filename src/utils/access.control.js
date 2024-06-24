import { AccessControl } from "accesscontrol";
import { grantsObject } from "../../config/grants.js";

export const ac = new AccessControl(grantsObject);
