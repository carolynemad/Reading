import { Router } from "express";
import mostReadBooksController from "../controller/mostReadBooksController";

const router = Router();

router.get("/most-read", mostReadBooksController.getMostReadBooks);

export default router;
