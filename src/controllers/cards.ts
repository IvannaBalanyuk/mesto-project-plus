import { Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Card from '../models/card';
import { ICustomRequest } from '../utils/types';
import NotFoundError from '../errors/404-not-found-error';
import IncorrectDataError from '../errors/400-incorrect-data';
import RequestStatuses from '../utils/constants';

export const getCards = (req: ICustomRequest, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.status(RequestStatuses.OK_SUCCESS).send({ data: cards }))
    .catch(next);
};

export const createCard = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user && req.user._id })
    .then((card) => {
      res.status(RequestStatuses.CREATED_SUCCESS).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        const customError = new IncorrectDataError('Переданы некорректные данные при создании карточки');
        return next(customError);
      }
      return next(err);
    });
};

export const delCardById = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }

      Card.findByIdAndDelete(cardId)
        .then((deletedCard) => res.status(RequestStatuses.OK_SUCCESS).send({ data: deletedCard }));
    })
    .catch(next);
};

export const likeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user && req.user._id;

    return Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
  } catch (error) {
    return next(error);
  }
};

export const dislikeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user && req.user._id;

    return Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
  } catch (error) {
    return next(error);
  }
};
