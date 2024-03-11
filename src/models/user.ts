import { Schema, model } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [200, 'Максимальная длина поля "about" - 200'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://practicum.yandex.ru/learn/web-plus/courses/0d769aee-3d7c-4d24-bb14-893f2a3ab823/sprints/87034/topics/372ae48f-8490-48fb-9f87-233f8cb70d9f/lessons/843aa6c7-2f6c-4414-a6a5-534a6e56bb2e/#:~:text=avatar%20%E2%80%94-,%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0,-%3B',
      validate: {
        validator: (v: string) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'Некорректный email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.index({ email: 1 }, { unique: true });

export default model<IUser>('user', userSchema);
