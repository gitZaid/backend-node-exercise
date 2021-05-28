import { body, check, param, query, sanitize } from 'express-validator';

export const validateLoginSchema = [
    body('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is not correct formet'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('min 6 character required')
];

export const validateSignupSchema = [
    body('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is not correct formet'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('min 6 character required')
];