// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToSql, disconnect } from '../../../utils/db'

const SECRET_KEY = process.env.SECRET_KEY || 'secret' ;
/**
  * Request body:
  * {
  *  "name": "googol",
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
    connection.query('SELECT * FROM company WHERE name = ?', [req.body.name], async function (error: Object, results: any, _fields: any) {
      if (error) {
        res.json({'error': error})
      }
      if(results.length == 0){
        res.json({'error': 'Company does not exist'})
      } else {
        const match = await bcrypt.compare(req.body.password, results[0].password);
        if(!match){
          res.json({'error': 'Incorrect credentials'})
        } else {
          let col = results[0]
          var data = {
            id: col.id,
            name: col.name,
            roles_offered: col.roles_offered,
            eligibility: col.eligibility,
            CTC: col.CTC,
            Hr_contacts: col.Hr_contacts,
          };
          const token = jwt.sign({
              username: data.name,
              email: data.Hr_contacts,
            },
            SECRET_KEY,
            {}
          );
          res.json({'token': token, 'data': data})
        }
      }
    disconnect(connection);
    });
  } catch (error) {
    res.json({'error': error})
  }
}
