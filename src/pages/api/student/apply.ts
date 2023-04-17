// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToSql, disconnect } from "../../../utils/db";

/**
 * Request body:
 * {
 *  "student_id": "2101AI40",
 *  "company_id": "acc01",
 *  "role_applied": "FSD",
 *  "ctc_lakhs": 10
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
    };

    connection.query(
      "select * from offers natural join (select * from students_applied, company where id=company_id) as a where role_applied = role_offered and student_id = ? order by ctc_lakhs desc limit 1",
      [req.body.student_id],
      async function (error: Object, results: any, _fields: any) {
          if (results.length>0 && results[0].ctc_lakhs > req.body.ctc_lakhs) {
          res.status(500).json({ error: "Has higher CTC" });
        } else {
          connection.query(
            "select * from students_applied where student_id = ?",
            [req.body.student_id],
            async function (error: Object, results: any, _fields: any) {
              if (
                results.length>0 &&
                results[0].company_id === req.body.company_id &&
                results[0].role_applied === req.body.role_applied
              ) {
                res.status(500).json({ error: "Already applied" });
              }
            }
          );
          connection.query(
            "insert into students_applied set ?",
            data,
            async function (error: Object, results: any, _fields: any) {
              if (error) {
                res.status(500).json({ error: error });
              }
              res.json({ data });
              disconnect(connection);
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
