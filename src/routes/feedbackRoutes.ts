import express from "express";

import * as FeedbackController from "../controllers/feedbackController";


const router = express.Router();
router.post("/", FeedbackController.createFeedback);



router.get("/:userId", FeedbackController.getFeedbackForUser);

export default router;