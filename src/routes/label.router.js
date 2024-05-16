import e from "express";
import { LabelService } from "../services/label.service.js";

const router = e.Router();
const service = new LabelService();

router.get("/", async (req, res) => {
	const labels = await service.find();
	res.send(labels);
});

export const labelsRouter = router;
