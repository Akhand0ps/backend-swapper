import express from 'express';


import * as sessionController from '../controllers/sessionController';
const router = express.Router();




router.post("/",sessionController.createSession);
router.get("/:userId", sessionController.getSessionsForUser);
router.patch("/status", sessionController.updateStatus);



export default router;  