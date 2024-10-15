import express from 'express';
import * as tokensController from "../controllers/tokensController.js"
const router = express.Router();

router.post("/",tokensController.loginUser);

export default router;