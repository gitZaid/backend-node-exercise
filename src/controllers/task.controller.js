import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, OK } from "http-status-codes";
import { validationResult } from 'express-validator';

import Taskodel from "../models/task.model";
import { makeApiResponce } from '../libraries/responce';


export default {

    async getTasks(req, res) {
        try {
            const task = await Taskodel.find();
            let result = makeApiResponce('Success', 1, OK, task);
            return res.json(result);

        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, INTERNAL_SERVER_ERROR);
            return res.status(INTERNAL_SERVER_ERROR).json(result)
        }
    },
    async createTask(req, res) {

        try {

            // VALIDATE THE REQUEST
            const errors = validationResult(req);
            if (errors && Object.keys(errors.errors).length) {
                let err = errors.errors.map((e) => e.msg)
                let result = makeApiResponce(err, false, BAD_REQUEST)
                return res.status(BAD_REQUEST).json(result);
            }

            const { name } = req.body;

            const task = await Taskodel.create({
                name: name,
            });

            let taskResponce = {
                task: {
                    id: task._id, email: task.name
                }
            }

            let result = makeApiResponce('Task Created Successfully', 1, OK, taskResponce);
            return res.status(OK).json(result);

        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, INTERNAL_SERVER_ERROR);
            return res.status(INTERNAL_SERVER_ERROR).json(result)
        }

    },

}