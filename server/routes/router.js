// Register the API routes with express router
import express from 'express';

import {
  signUp,
  signIn
} from '../controllers';

// Express router
const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json('Welcome to the CodizChat API'));
router.route('/signup')
  .post(signUp);
router.route('/signin')
  .get(signIn);

export default router;
