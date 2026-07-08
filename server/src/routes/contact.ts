import express, { Router } from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { name, email, subject, message } = req.body;
      await ContactMessage.create({ name, email, subject, message });
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
      console.error('Failed to save contact message:', err);
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
);

export default router;
