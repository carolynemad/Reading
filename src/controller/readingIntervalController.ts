import { Request, Response } from 'express';
import { ReadingInterval } from '../models/ReadingInterval';
import { SMSService } from '../services/smsService';

const smsService = new SMSService();

const addReadingInterval = async (req: Request, res: Response) => {
  try {
    const { userId, bookId, startPage, endPage, phoneNumber } = req.body;
    const readingInterval = new ReadingInterval({ userId, bookId, startPage, endPage });
    await readingInterval.save();

    // Send SMS
    await smsService.sendSMS(phoneNumber, 'Thank you!');

    res.status(201).send(readingInterval);
  } catch (error) {
    console.error('Error adding reading interval:', error);
    res.status(500).send(error);
  }
};

const readingIntervalController = {
  addReadingInterval,
};

export default readingIntervalController;
