import { createValidator } from 'express-joi-validation';

export const validator = createValidator();

export * from './user-validation';
