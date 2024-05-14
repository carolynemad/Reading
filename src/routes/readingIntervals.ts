import { Router } from 'express';
import readingIntervalController from '../controller/readingIntervalController';

const router = Router();

router.post('/add', readingIntervalController.addReadingInterval);

export default router;
