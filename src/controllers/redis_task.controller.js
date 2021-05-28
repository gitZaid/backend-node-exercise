import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, OK } from "http-status-codes";
import { makeApiResponce } from '../libraries/responce';
import redis from 'redis' 
let client = redis.createClient() 



export default {

    async getTasks(req, res) {

        let taskArray = []

        client.keys('*', (err, id) => {

            let keys = Object.keys(id)
            let i = 0
            keys.forEach((l) => {
                client.hgetall(id[l], (e, obj) => {
                    i++
                    if (e) { console.log('dddddddddddddde',e) } else {

                        // get the task list
                        if(Object.keys(obj).length && obj.name){

                            let taskObj = { 'id': id[l], ...obj}
                            taskArray.push(taskObj)

                        }   
                    }

                    if (i == keys.length) {
                        res.send({ task: taskArray })
                    }
                })
            })
        })

    },
    async createTask(req, res) {

        const {name} = req.body;
        
        client.keys('*', (err, id) => {
          let keys = Object.keys(id);
          let key = keys.length + 1;
      
          client.hmset(key,[
            'name', name,
          ], (err, reply) => {
            if (err) {
              console.log('err', err) 
            }
    
            if(reply === 'OK'){

              let userResponce = { user: { 
                id: key, name:  name}
            }

            let result = makeApiResponce('Task Created Successfully', 1, OK, userResponce);
            return res.status(OK).json(result);

            }else{
              let result = makeApiResponce('Error', 0, BAD_REQUEST,);
              return res.status(OK).json(result);
            }

          });
        })

    },

}