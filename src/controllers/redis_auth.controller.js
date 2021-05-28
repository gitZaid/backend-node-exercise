import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, OK } from "http-status-codes";
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import UsersModel from "../models/users.model";
import { getJWTToken, getEncryptedPassword } from '../libraries/util';
import { makeApiResponce } from '../libraries/responce';
import redis from 'redis' 
let client = redis.createClient() 



export default {

    /**
     * OTHERS USER LOGIN
     * @param {*} 
     */
    async login(req, res) {

      const { email, password } = req.body;

            new Promise((resolve, reject) => {
              client.keys('*', (err, id) => {
                let keys = Object.keys(id);
                resolve([id,keys]);
              });
            })
            .then((res) => {

              if(res[1].length === 0) {
                 return res.send({msg: 'No Record Found'});
              }
              else {
              return new Promise((resolve, reject) => {
                res[1].forEach((row) => {
                  
                  client.hgetall(res[0][row],async (err, obj) => {
                    const userEmail = obj.email;
                    const userPass = obj.password;
                    console.log('obj',obj)
                    if(userEmail === email && userPass === password){
          
                      const token = await getJWTToken({ id: res[0][row] });
          
                      resolve({msg: 'LoggedIn Successfully', token: token})
                    }
                    else{
                      let rowNew = parseInt(row);
                      rowNew++;
          
                      if(rowNew === res[1].length){
                        resolve({msg: "Invalid Email and Passowrd",token: ''})
                      }
                    }
                   })
                });
              }); 
            }
            })
            .then(resPromise => {
              res.send(resPromise);
            })
    },

    /**
     * SIMPLE USER SIGNUP
     * @param {*} 
     */
    async register(req, res) {

          const {email, password} = req.body;
        
          client.keys('*', (err, id) => {
            let keys = Object.keys(id);
            let key = keys.length + 1;
        
            client.hmset(key,[
              'email', email,
              'password', password
            ], (err, reply) => {
              if (err) {
                console.log('err', err) 
              }
          
              if(reply === 'OK'){

                let userResponce = { user: { 
                  id: key, email:  email}
              }

              let result = makeApiResponce('User Created Successfully', 1, OK, userResponce);
              return res.status(OK).json(result);
              }else{
                let result = makeApiResponce('Error', 0, BAD_REQUEST,);
                return res.status(OK).json(result);
              }

            });
          })
    },

    /**
     * GET USER
     * @param {*} 
    */
    async user(req, res) {
        try {

            const currentUser = req.currentUser;

            let userResponce = { user: { 
              ...currentUser
              }
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