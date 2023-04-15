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
    connection.query('SELECT * FROM students WHERE email = ?', [req.body.email], async function (error: Object, results: any, _fields: any) {
      if (error) {
        res.status(500).json({ error: error });
      }

      if(results.length == 0){
        res.status(500).json({ error: "Student does not exist" });
      } else {
        const match = await bcrypt.compare(req.body.password, results[0].password);
        if(!match){
          res.status(500).json({ error: "Incorrect credentials" });
        } else {
          let col = results[0]
          var data = {
            rollno: col.rollno,
            first_name: col.first_name,
            last_name: col.last_name,
            email: col.email,
            gpa: col.gpa,
            department: col.department,
            roles: col.roles,
            gender: col.gender,
            cv: col.cv,
            image: col.image,
            type: 'student'
          }
          const token = jwt.sign({
            username: data.first_name,
            email: data.email
          }, SECRET_KEY, {});
          res.json({'token': token, 'data': data})
        }
      }
    disconnect(connection);
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
