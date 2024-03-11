import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users:userId', getUserById);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

export default usersRouter;
