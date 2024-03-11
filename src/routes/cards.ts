import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCards,
  createCard,
  delCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { idRegEx } from '../utils/constants';

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

cardsRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(idRegEx).required(),
  }),
}), delCardById);

cardsRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(idRegEx).required(),
  }),
}), likeCard);

cardsRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(idRegEx).required(),
  }),
}), dislikeCard);

export default cardsRouter;
