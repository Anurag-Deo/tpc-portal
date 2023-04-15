// TODO: See total students applied for a particular company
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToSql, disconnect } from "../../../utils/db";

/**
 *
 * @param req student_id
 * @param res
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  try {
    const connection = connectToSql();
    connection.query(
      "select * from students_applied where student_id = ?",
      [req.body.student_id],
      async function (error: Object, results: any, _fields: any) {
        if (error) {
          res.status(500).json({ error: error });
        }
        res.json(results);
      }
    );
    disconnect(connection);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
