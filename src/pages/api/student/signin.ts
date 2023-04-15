// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToSql, disconnect } from '../../../utils/db'

const SECRET_KEY = process.env.SECRET_KEY || 'secret' ;
/**
  * Request body:
  * {
  *  "first_name": "John",
  *  "last_name": "Doe",
  *  "rollno": "123456789",
  *  "email": "johncena@gawd.com",
  *  "gender": "liquid",
  *  "gpa": "4.0",
  *  "department" : "CS",
  *  "roles": "student",
  *  "password": "123456789",
  *  "confirmPassword": "123456789"
  *  "cv": "454f5e4f5ef4ededfds",
  *  "image": "68s68ds4d58dsa7d5wa87d"
  *  }
  * */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  // verify data is correct
  if(req.body.password.localeCompare(req.body.confirmPassword)!==0){
    return res
      .status(500)
      .json({ error: "Confirm password must match the password provided" });
  }
  try {
    const connection = connectToSql();
    // check if record exists already
    connection.query('SELECT * FROM students WHERE rollno = ? or email = ?', [req.body.rollno, req.body.email], async function (error: Object, results: any, _fields: any) {
      if (error) {
        res.status(500).json({ error: error });
      }
      if(results.length > 0){
        res
          .status(500)
          .json({
            error: "Student with same roll number/email already exists",
          });
      } else {
        // insert into db
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        var data = {
          rollno: req.body.rollno,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          gpa: req.body.gpa,
          department: req.body.department,
          roles: req.body.roles,
          password: secPass,
          gender: req.body.gender,
          cv: req.body.cv,
          image: req.body.image
        }
        connection.query('INSERT INTO students SET ?', data, function (error: Object, _results: any, _fields: any) {
          if (error) {
            res.status(500).json({ error: error });
          }
          const authtoken = jwt.sign({
            username: data.first_name,
            email: data.email
          }, SECRET_KEY, {});

          res.json({data: {...data, type: 'student'}, authtoken})
       });
      }
    disconnect(connection);
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
