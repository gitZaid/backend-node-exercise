import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const BASE_URL = process.env.BASE_URL
const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL
const ROUTE_IMAGE_PATH = process.env.ROUTE_IMAGE_PATH

export const devConfig = {

    front_end_url: process.env.BASE_URL_ADMIN,
    port: process.env.PORT,
    db_username: process.env.DATABASE_USERNAME,
    db_password: process.env.DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME,
    db_host: process.env.DATABASE_HOST,
    secret: process.env.SECRET_KEY,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_number: process.env.TWILIO_NUMBER,

    images_path: {
        USERS: `${ROUTE_IMAGE_PATH}/users`,
    },
    get_images_path: {
        USERS: `${BASE_IMAGE_URL}/users`,
    },
    email: {
        SERVICE: 'Gmail',
        USER: 'qa.appcrates@gmail.com',
        PASSOWRD: 'tkfnqrfxigmiulht',
        FROM: 'qa.appcrates@gmail.com',
        // USER: 'muhammadzaid435@gmail.com',
        // PASSOWRD: 'niawdfucixatctra',
        // FROM: 'muhammadzaid435@gmail.com',
    }

}