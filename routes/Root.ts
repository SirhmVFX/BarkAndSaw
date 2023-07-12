import { NextFunction, Request, Response, Router } from 'express';
import { router as Role } from './role.route';
import { router as Category } from './category.route';

const _router: Router = Router({
  mergeParams: true,
});


_router.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Api-Version', 'v1');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});


_router.route('/v1/health-check').get(function (req: Request, res: Response) {
  return res.status(200).json({ healthy: true, version: 'v1' });
});


_router.use('/v1/role', Role);
_router.use('/v1/category', Category);

export const router = _router;
