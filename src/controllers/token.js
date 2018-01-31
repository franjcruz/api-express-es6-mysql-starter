import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as tokenService from '../services/tokenService';
import passport from 'passport';

require('./../middlewares/passport')(passport);

const router = Router();

/**
 * POST /api/token
 */
router.post('/', (req, res, next) => {
  tokenService
    .login(req.body.email, req.body.password)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/token
 */
router.delete('/:token', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  tokenService
    .deleteToken(req.params.token)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
