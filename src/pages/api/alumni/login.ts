// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToSql, disconnect } from '../../../utils/db'

const SECRET_KEY = process.env.SECRET_KEY || 'secret' ;
/**
  * Request body:
  * {
  *  "email": "johncena@gawd.com",
  *  "password": "123456789"
  *  }
  * */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  try {
    const connection = connectToSql();
    // check if record exists
    connection.query('SELECT * FROM alumni WHERE email = ?', [req.body.email], async function (error: Object, results: any, _fields: any) {
      if (error) {
        res.json({'error': error})
      }

      if(results.length == 0){
        res.json({'error': 'Alumni does not exist'})
      } else {
        const match = await bcrypt.compare(req.body.password, results[0].password);
        if(!match){
          res.json({'error': 'Incorrect credentials'})
        } else {
          let col = results[0]
          var data = {
            rollid: col.rollid,
            name: col.name,
            email: col.email,
            ctc: col.ctc,
            role_applied: col.role_applied,
            type: 'alumni'
          };
          const token = jwt.sign({
            username: data.name,
            email: data.email
          }, SECRET_KEY, {});
          res.json({'token': token, 'data': data})
        }
      }
    disconnect(connection);
    });
  } catch (error) {
    res.json({'error': error})
  }
}
