import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as tokenService from '../services/tokenService';

const router = Router();

/**
 * POST /api/token
 */
router.post('/', (req, res, next) => {
  tokenService
    .refreshToken(req.body.username, req.body.refreshToken)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/token/reject
 */
router.post('/reject', (req, res, next) => {
  tokenService
    .rejectToken(req.body.refreshToken)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
