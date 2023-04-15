// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectToSql, disconnect } from "../../../utils/db";

const SECRET_KEY = process.env.SECRET_KEY || "secret";
/**
 * Request body:
 * {
 *  "company_id": "go01",
 *  "role_offered": "FSD",
 *  "ctc_lakhs": "90",
 *  "eligibility": "9.99"
 *  "location": "Kolkata",
 *  "branches_allowed": "MME"
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
            role_offered: req.body.role_offered,
            ctc_lakhs: req.body.ctc_lakhs,
            eligibility: req.body.eligibility,
            location: req.body.location,
            branches_allowed: req.body.branches_allowed,
          };
          connection.query(
            "INSERT INTO offers SET ?",
            data,
            function (error: Object, _results: any, _fields: any) {
              if (error) {
                res.status(500).json({ error: error });
              }
              res.json({ data });
            }
          );
    disconnect(connection);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
