import Joi from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

export const postUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .alphanum()
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
});

export const putUserSchema = Joi.object({
    login: Joi.string(),
    password: Joi.string().alphanum(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130),
});

export const autoSuggestUsersSchema = Joi.object({
    loginSubstring: Joi.string(),
    limit: Joi.number(),
});

export interface UsersRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string;
        password: string;
        age: number;
    };
}

export interface AutoSuggestUsersSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        loginSubstring: string;
        limit: number;
    };
}
