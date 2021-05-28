import { body, check, param, query, sanitize } from 'express-validator';


export const validateCreatTaskSchema = [
  body('name')
  .exists()
  .withMessage('name is required'),
];