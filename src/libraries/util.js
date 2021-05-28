import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto'
import moment from "moment";
import { devConfig } from '../config/config.js';

export const getJWTToken = async payload => {
  const token = jwt.sign(
    payload, 
    devConfig.secret, {
      expiresIn: '1d',
    }
  );
  return token;
};

export const getEncryptedPassword = async password => {
  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

export const objConvertJsonParse = async(obj) => {
  const objParse = JSON.parse(obj)
  return objParse
};

export const randomValueHex = async(len) => {

  let randomstring = crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
        return randomstring;
}

/**
 * 
 * @param {*} data 
 */
export const shallowCopy = (data) => {
  return JSON.parse(JSON.stringify(data));
};


/**
 * 
 * @param {*} 
 */
 export const currentDate = () => {
  const todayDate = new Date();
  const momentdate = moment(todayDate).format('DD-MM-YYYY');
  return momentdate;

};


/**
 * 
 * @param {*} 
 */
 export const makeSulg = (name) => {
  const slug = name.trim().toLowerCase().replace(/\s+/g, '_');
  return slug;

};


/**
 * RANDOM DATA
 * @param {*} 
 */
export async function randomOTP(){
  return Math.floor(1000 + Math.random() * 9000);
}