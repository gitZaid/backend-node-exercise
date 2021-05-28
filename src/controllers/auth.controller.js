import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, OK } from "http-status-codes";
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import UsersModel from "../models/users.model";
import { getJWTToken, getEncryptedPassword } from '../libraries/util';
import { makeApiResponce } from '../libraries/responce';

export default {

    /**
     * OTHERS USER LOGIN
     * @param {*} 
     */
    async login(req, res) {
        try {
            // VALIDATE THE REQUEST
            const errors = validationResult(req);
            if (errors && Object.keys(errors.errors).length) {
                let err = errors.errors.map((e) => e.msg)
                let result = makeApiResponce(err, false, BAD_REQUEST)
                return res.status(BAD_REQUEST).json(result);
            }

            const { email, password } = req.body;

            // FETCH THE USER
            const userQuery = { email: email };
            let user = await UsersModel.findOne(userQuery);
            if (!user) {
                let result = makeApiResponce('Invalid Email and Passowrd', false, BAD_REQUEST)
                return res.status(BAD_REQUEST).json(result);
            }
            const matched = await bcryptjs.compare(password, user.password)
            if (!matched) {
                let result = makeApiResponce('Invalid Email and Passowrd', false, BAD_REQUEST)
                return res.status(BAD_REQUEST).json(result);
            }

            const token = await getJWTToken({ id: user._id });
            let userResponce;
            userResponce = {
                user_id: user._id,
                email: user.email,
                token: token
            }
            let result = makeApiResponce('LoggedIn Successfully', true, OK, userResponce);
            return res.status(OK).json(result);

        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', false, INTERNAL_SERVER_ERROR);
            return res.status(INTERNAL_SERVER_ERROR).json(result)
        }
    },

    /**
     * SIMPLE USER SIGNUP
     * @param {*} 
     */
    async register(req, res) {
        try {
            // VALIDATE THE REQUEST
            const errors = validationResult(req);
            if (errors && Object.keys(errors.errors).length) {
                let err = errors.errors.map((e) => e.msg)
                let result = makeApiResponce(err, false, BAD_REQUEST)
                return res.status(BAD_REQUEST).json(result);
            }

            const { email, password } = req.body;

            const existingUser = await UsersModel.findOne({ email: email });
            if (existingUser) {
                let result = makeApiResponce('Email is Already Exsit', 0, BAD_REQUEST)
                return res.status(BAD_REQUEST).json(result);
            }

            const hash = await getEncryptedPassword(password);

            const user = await UsersModel.create({
                email: email,
                password: hash
            });

            let userResponce = { user: { 
                id: user._id, email:  user.email}
            }

            let result = makeApiResponce('User Created Successfully', 1, OK, userResponce);
            return res.status(OK).json(result);

        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, INTERNAL_SERVER_ERROR);
            return res.status(INTERNAL_SERVER_ERROR).json(result)
        }
    },

    /**
     * TEST
     * @param {*} 
    */
    async user(req, res) {
        try {

            const currentUser = req.currentUser;

            let userResponce = { user: { 
                id: currentUser._id, email:  currentUser.email}
            }

            let result = makeApiResponce('Successfully', true, OK, userResponce);
            return res.status(OK).json(result);

        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', false, INTERNAL_SERVER_ERROR);
            return res.status(INTERNAL_SERVER_ERROR).json(result)
        }
    }
}