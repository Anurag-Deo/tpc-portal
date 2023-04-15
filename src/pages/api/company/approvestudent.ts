// TODO: Approve a student's application to a company, and mark the student as placed. Remove the student's application and place the student in students_placed table.
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToSql, disconnect } from "../../../utils/db";
/**
 * Request body:
 * {
 *  "student_id": "2101AI40",
 *  "role_offered": "FSD",
 *  "company_id": "acc01",
 *  }
 * */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  try {
    const connection = connectToSql();
    // insert into db
    var data = {
        company_id: req.body.company_id,
        role: req.body.role,
        student_id: req.body.student_id,
    };
    connection.query(
      "INSERT INTO students_placed SET ?",
      data,
      function (error: Object, _results: any, _fields: any) {
        if (error) {
          res.status(500).json({ error: error });
        }
        res.json({ data });
      }
    );
    // delete from students_applied
    connection.query(
        "DELETE FROM students_applied WHERE student_id = ? AND role_applied = ? AND company_id = ?",
        [req.body.student_id, req.body.role, req.body.company_id],
        function (error: Object, _results: any, _fields: any) {
            if (error) {
                res.status(500).json({ error: error });
            }
        }
    );
    disconnect(connection);
  } catch (error) {
    res.json({ error: error });
  }
}
