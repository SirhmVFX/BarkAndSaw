import { Router } from 'express';
import { userController } from '@controllers';

const _router: Router = Router({
    mergeParams: true,
});

_router.route('').get(userController.getUser);
_router.route('').put(userController.updateUser);
_router.route('/password').post(userController.changePassword);

export const router = _router;
