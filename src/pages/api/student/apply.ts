// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToSql, disconnect } from "../../../utils/db";

/**
 * Request body:
 * {
 *  "student_id": "2101AI40",
 *  "company_id": "acc01",
 *  "role_applied": "FSD",
 *  }
 **/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  try {
    const connection = connectToSql();
    const data = {
        student_id: req.body.student_id,
        company_id: req.body.company_id,
        role_applied: req.body.role_applied,
    }
    connection.query("select * from students_applied where student_id = ?", [req.body.student_id], async function (error: Object, results: any, _fields: any) {
        if(results[0].company_id === req.body.company_id && results[0].role_applied === req.body.role_applied){
            res.json({ error: "Already applied" });
        }
    })
    connection.query(
      "insert into students_applied set ?",
      data,
      async function (error: Object, results: any, _fields: any) {
        if (error) {
          res.json({ error: error });
        }
        res.json({ data });
        disconnect(connection);
      }
    );
  } catch (error) {
    res.json({ error: error });
  }
}
