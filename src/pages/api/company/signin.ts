// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToSql, disconnect } from '../../../utils/db'

const SECRET_KEY = process.env.SECRET_KEY || 'secret' ;
/**
  * Request body:
  * {
  * "name": "googol",
  * "Hr_contacts": "John Cena",
  * "password": "123456789",
  * "confirmPassword": "123456789"
  *  }
  * */

// prototype function to generate strong stort length uuids (6 char alphanumeric)
// @dev: This function is not proven to be collision resistant and is not audited
function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  var firstPartstr = ("000" + firstPart.toString(36)).slice(-3);
  var secondPartstr = ("000" + secondPart.toString(36)).slice(-3);
  return firstPartstr + secondPartstr;
}

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
    connection.query('SELECT * FROM company WHERE name = ?', [req.body.name], async function (error: Object, results: any, _fields: any) {
      if (error) {
        res.json({'error': error})
      }
      if(results.length > 0){
        res.json({'error': 'Company already exists'})
      } else {
        // insert into db
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        var data = {
          id: generateUID(),
          name: req.body.name,
          Hr_contacts: req.body.Hr_contacts,
          password: secPass
        };
        connection.query('INSERT INTO company SET ?', data, function (error: Object, _results: any, _fields: any) {
          if (error) {
            res.json({'error': error})
          }
          const authtoken = jwt.sign({
              username: data.name,
              email: data.Hr_contacts,
            },
            SECRET_KEY,
            {}
          );

          res.json({data:{...data, type: 'company'}, authtoken})
       });
      }
    disconnect(connection);
    });
  } catch (error) {
    res.json({'error': error})
  }
}
