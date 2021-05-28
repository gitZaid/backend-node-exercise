


import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { devConfig } from '../config/config.js';

dotenv.config({ path: '.env' });

const NODE_ENV = process.env.NODE_ENV
const DB_URL = NODE_ENV == 'local' ? `mongodb://localhost/${devConfig.db_name}` : `mongodb+srv://${devConfig.db_username}:${devConfig.db_password}@${devConfig.db_host}/${devConfig.db_name}?retryWrites=true&w=majority`;

export const configureDb = () => {

    mongoose.Promise = global.Promise;
    mongoose
        .connect(
            DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        )
        .then(() => console.log('%s Database connected successfully!', chalk.green('✓')))
        .catch((err) => console.error('Could not connect to Mongodb.. ', err));

}