// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToSql, disconnect } from "../../utils/db";

const SECRET_KEY = process.env.SECRET_KEY || "secret";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  try {
    const connection = connectToSql();
    if(req.body.type === "student"){
      // check if record does not exists
      connection.query(
        "SELECT * FROM students WHERE rollno = ?",
        [req.body.rollno],
        async function (error: Object, results: any, _fields: any) {
          if (error) {
            res.status(500).json({ error: error });
          }
          if (results.length == 0) {
            res.status(500).json({ error: "Student does not exist" });
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
              image: req.body.image,
              dob: req.body.dob,
              doj: req.body.doj,
              contact_no: req.body.contact_no,
              tenth_marks: req.body.tenth_marks,
              twelvth_marks: req.body.twelvth_marks,
            };
            connection.query(
              "update students SET ? where rollno = ?",
              [data, req.body.rollno],
              function (error: Object, _results: any, _fields: any) {
                if (error) {
                  res.status(500).json({ error: error });
                }
                const authtoken = jwt.sign(
                  {
                    username: data.first_name,
                    email: data.email,
                  },
                  SECRET_KEY,
                  {}
                );

                res.json({ data: { ...data, type: "student" }, authtoken });
              }
            );
          }
          disconnect(connection);
        }
      );
    }else if(req.body.type === "alumni"){
      // check if record does not exists
      connection.query(
        "SELECT * FROM alumni WHERE rollid = ?",
        [req.body.rollid],
        async function (error: Object, results: any, _fields: any) {
          if (error) {
            res.status(500).json({ error: error });
          }
          if (results.length == 0) {
            res.status(500).json({ error: "Alumni does not exist" });
          } else {
            // insert into db
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            var data = {
              rollid: req.body.rollid,
              name: req.body.name,
              email: req.body.email,
              company: req.body.company,
              ctc: req.body.ctc,
              role_applied: req.body.role_applied,
              password: secPass,
              location: req.body.location,
              position: req.body.position,
            };
            connection.query(
              "update alumni SET ? where rollid = ?",
              [data, req.body.rollid],
              function (error: Object, _results: any, _fields: any) {
                if (error) {
                  res.status(500).json({ error: error });
                }
                const authtoken = jwt.sign(
                  {
                    username: data.name,
                    email: data.email,
                  },
                  SECRET_KEY,
                  {}
                );

                res.json({ data: { ...data, type: "alumni" }, authtoken });
              }
            );
          }
          disconnect(connection);
        }
      );
    }else if (req.body.type === "company"){
      // check if record does not exists
      connection.query(
        "SELECT * FROM company WHERE id = ?",
        [req.body.id],
        async function (error: Object, results: any, _fields: any) {
          if (error) {
            res.status(500).json({ error: error });
          }
          if (results.length == 0) {
            res.status(500).json({ error: "Company does not exist" });
          } else {
            // insert into db
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            var data = {
              id: req.body.id,
              name: req.body.name,
              Hr_contacts: req.body.Hr_contacts,
              password: secPass,
            };
            connection.query(
              "update company SET ? where id = ?",
              [data, req.body.id],
              function (error: Object, _results: any, _fields: any) {
                if (error) {
                  res.status(500).json({ error: error });
                }
                const authtoken = jwt.sign(
                  {
                    username: data.name,
                    email: data.Hr_contacts,
                  },
                  SECRET_KEY,
                  {}
                );

                res.json({ data: { ...data, type: "company" }, authtoken });
              }
            );
          }
          disconnect(connection);
        }
      );
    }else{
        res.status(500).json({ error: "Invalid type" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
