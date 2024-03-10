import { Router } from 'express';
import usersRouter from './users';
import cardsRouter from './cards';

const rootRouter = Router();

rootRouter.use(usersRouter, cardsRouter);

export default rootRouter;
