// TODO: See total students applied for a particular company
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToSql, disconnect } from "../../../utils/db";

/**
 * 
 * @param req company_id
 * @param res 
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
    try {
        const connection = connectToSql();
        connection.query(
          "select * from students_applied, students where student_id = rollno and company_id = ?",
          [req.body.company_id],
          async function (error: Object, results: any, _fields: any) {
            if (error) {
              res.status(500).json({ error: error });
            }
            res.json(results);
          }
        );
        disconnect(connection);
    } catch (error) {
        res.json({ error: error });
    }
}
