// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToSql, disconnect } from '../../../utils/db'

const SECRET_KEY = process.env.SECRET_KEY || 'secret' ;
/**
  * Request body:
  * {
  *  "rollid": "2101AI40",
  *  "name": "Doe",
  *  "company": "googol",
  *  "email": "johncena@gawd.com",
  *  "ctc": 1000000,
  *  "role_applied": "software engineer"
  *  "password": 565662656,
  *  "confirmPassword": 565662656
  *  }
  * */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  // verify data is correct
  if(req.body.password.localeCompare(req.body.confirmPassword)!==0){
    return res.json({'error': 'Confirm password must match the password provided'})
  }
  try {
    const connection = connectToSql();
    // check if record exists already
    connection.query('SELECT * FROM alumni WHERE rollid = ?', [req.body.rollid], async function (error: Object, results: any, _fields: any) {
      if (error) {
        res.json({'error': error})
      }
      if(results.length > 0){
        res.json({'error': 'Alumni already exists'})
      } else {
        // insert into db
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        var data = {
          rollid: req.body.rollid,
          name: req.body.name,
          company: req.body.company,
          email: req.body.email,
          ctc: req.body.ctc,
          role_applied: req.body.role_applied,
          password: secPass,
        };
        connection.query('INSERT INTO alumni SET ?', data, function (error: Object, _results: any, _fields: any) {
          if (error) {
            res.json({'error': error})
          }
          const authtoken = jwt.sign({
            username: data.name,
            email: data.email
          }, SECRET_KEY, {});

          res.json({data, authtoken})
       });
      }
    disconnect(connection);
    });
  } catch (error) {
    res.json({'error': error})
  }
}
